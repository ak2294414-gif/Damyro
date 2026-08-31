-- ═══════════════════════════════════════════════════════════════
-- Damyro — Supabase Database Setup
-- ═══════════════════════════════════════════════════════════════
-- HOW TO RUN THIS:
--   1. Open your Supabase project dashboard
--   2. Go to "SQL Editor" in the left sidebar
--   3. Paste this entire file and click "Run"
--   4. Run it ONCE. Re-running is safe (uses IF NOT EXISTS / OR REPLACE)
--      except the INSERT at the bottom for your admin account.
-- ═══════════════════════════════════════════════════════════════

-- ───────────────────────────────────────────────────────────────
-- 1. PROFILES TABLE
--    One row per signed-in user. id = matches auth.users.id.
--    is_admin controls whether someone can see admin.html data.
-- ───────────────────────────────────────────────────────────────
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  account_name text,
  age int,
  mobile text,
  business_name text,
  business_type text,
  focus_area text,
  target_customer text,
  features text[],
  budget text,
  existing_website text,
  notes text,
  selected_package text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table profiles enable row level security;

-- Users can read only their own profile
drop policy if exists "profiles_select_own" on profiles;
create policy "profiles_select_own" on profiles
  for select using (auth.uid() = id);

-- Users can insert only their own profile
drop policy if exists "profiles_insert_own" on profiles;
create policy "profiles_insert_own" on profiles
  for insert with check (auth.uid() = id);

-- Users can update only their own profile
drop policy if exists "profiles_update_own" on profiles;
create policy "profiles_update_own" on profiles
  for update using (auth.uid() = id);

-- Admins can read every profile (needed for admin.html)
drop policy if exists "profiles_select_admin" on profiles;
create policy "profiles_select_admin" on profiles
  for select using (
    exists (select 1 from profiles p where p.id = auth.uid() and p.is_admin = true)
  );


-- ───────────────────────────────────────────────────────────────
-- 2. BOOKINGS TABLE
--    One row per appointment request.
-- ───────────────────────────────────────────────────────────────
-- ═══════════════════════════════════════════════════════════════
-- NOTE: Customers do NOT log in to submit a booking — anyone can
-- insert a row via the anon key, no account needed. user_id is not
-- required for that reason.
--
-- Admins DO log in (real email + Supabase password, via admin.html)
-- to review, accept/decline, and schedule/reschedule bookings. RLS
-- below is "public insert only, admin-only read/update": a signed-in
-- user with is_admin = true on their profiles row can select and
-- update every booking; everyone else (including anonymous visitors)
-- can insert but never read or modify any row, including the one
-- they just submitted.
-- ═══════════════════════════════════════════════════════════════
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'pending' check (status in ('pending','accepted','declined')),
  package text,
  full_name text,
  business_name text,
  email text,
  mobile text,
  location text,
  payment_method text,
  requirements text,
  language text,
  website_type text,
  template_style text,
  budget text,
  notif_browser boolean default true,
  notif_email boolean default true,
  assigned_time text,
  appointment_date date,
  appointment_time text,
  reschedule_count int not null default 0,
  meet_link text,
  submitted_at timestamptz not null default now(),
  accepted_at timestamptz,
  notified_at timestamptz
);

alter table bookings enable row level security;

-- Anyone (including anonymous visitors using the anon key) can submit
-- a booking. This is intentional for a no-login contact/booking form.
drop policy if exists "bookings_insert_public" on bookings;
create policy "bookings_insert_public" on bookings
  for insert with check (true);

-- ═══════════════════════════════════════════════════════════════
-- ADMIN ACCESS TO BOOKINGS
--   admin.html now exists and needs to read every booking and
--   update status/appointment fields (accept, decline, schedule,
--   reschedule). These two policies grant that ONLY to a signed-in
--   user whose profiles row has is_admin = true — the same flag
--   used for admin.html's own login gate. A regular site visitor,
--   including one using the anon key with no session, still cannot
--   read or modify any booking row.
-- ═══════════════════════════════════════════════════════════════
drop policy if exists "bookings_select_admin" on bookings;
create policy "bookings_select_admin" on bookings
  for select using (
    exists (select 1 from profiles p where p.id = auth.uid() and p.is_admin = true)
  );

drop policy if exists "bookings_update_admin" on bookings;
create policy "bookings_update_admin" on bookings
  for update using (
    exists (select 1 from profiles p where p.id = auth.uid() and p.is_admin = true)
  );


-- ───────────────────────────────────────────────────────────────
-- 3. AUTO-CREATE A PROFILE ROW WHENEVER A NEW auth.users ROW APPEARS
--    Fires for any signup method — including an admin account
--    created directly from the Supabase dashboard (step 4 below).
-- ───────────────────────────────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- ───────────────────────────────────────────────────────────────
-- 4. NOTIFY CUSTOMER BY EMAIL ON FIRST SCHEDULING (NOT reschedules)
--    Fires the "notify-appointment" Edge Function exactly once per
--    booking: the moment appointment_date or appointment_time first
--    goes from empty to set. notified_at is the guard — once it's
--    non-null, later reschedules update the row but never re-fire
--    this trigger, matching "email only on first scheduling."
--
--    Requires, in this order:
--      a. The pg_net extension (enabled below).
--      b. The "notify-appointment" Edge Function deployed — see
--         notify-appointment/index.ts and the deployment steps.
--      c. Two secrets stored in Supabase Vault (Dashboard → Project
--         Settings → Vault — NOT pasted into this SQL file, since
--         this file may end up in git):
--           - service_role_key  → your project's service_role key
--             (Dashboard → Project Settings → API)
--           - project_url       → https://YOUR_PROJECT_REF.supabase.co
--         Click "New secret" for each, using those exact names.
--    Until both secrets exist in Vault, this trigger will raise an
--    error on the first scheduling attempt rather than fail silently
--    — see the exception handler below.
-- ───────────────────────────────────────────────────────────────
create extension if not exists pg_net with schema extensions;

create or replace function public.notify_first_scheduling()
returns trigger as $$
declare
  had_appt boolean := (old.appointment_date is not null or old.appointment_time is not null);
  has_appt boolean := (new.appointment_date is not null or new.appointment_time is not null);
  v_service_key text;
  v_project_url text;
begin
  -- Only fire on the transition from "no appointment" to "has an
  -- appointment," and only if we haven't already notified this row.
  if (not had_appt) and has_appt and new.notified_at is null then

    select decrypted_secret into v_service_key
      from vault.decrypted_secrets where name = 'service_role_key';
    select decrypted_secret into v_project_url
      from vault.decrypted_secrets where name = 'project_url';

    if v_service_key is null or v_project_url is null then
      raise exception 'notify_first_scheduling: missing Vault secret(s) service_role_key / project_url — see supabase-setup.sql section 4';
    end if;

    perform net.http_post(
      url := v_project_url || '/functions/v1/notify-appointment',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || v_service_key
      ),
      body := jsonb_build_object('booking_id', new.id)
    );
    -- Set immediately (not inside the Edge Function) so a slow or
    -- failed HTTP call can't leave the door open for a duplicate
    -- trigger fire on a near-simultaneous update to the same row.
    new.notified_at := now();
  end if;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_booking_first_scheduled on bookings;
create trigger on_booking_first_scheduled
  before update on bookings
  for each row execute procedure public.notify_first_scheduling();


-- ───────────────────────────────────────────────────────────────
-- 5. CREATE YOUR ADMIN ACCOUNT
--    admin.html is login-only (no public signup form), so create
--    the one admin account yourself:
--      a. Supabase dashboard → Authentication → Users → Add user
--         → enter your email + a password → CHECK "Auto Confirm
--         User" (skips email verification) → Create user.
--         The trigger above fires and creates your profiles row
--         automatically.
--      b. Come back here and run the UPDATE below with that same
--         email, to flip is_admin to true.
--      c. Log in at admin.html with that email + password.
-- ───────────────────────────────────────────────────────────────
-- update profiles set is_admin = true where email = 'your-admin-email@example.com';
