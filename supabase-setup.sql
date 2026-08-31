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
-- NOTE: This site no longer has a login system. Because of that:
--   - user_id is no longer required (there's no signed-in account
--     to attach a booking to). Two new columns capture the extra
--     questionnaire answers instead.
--   - RLS below is "public insert only": any site visitor can
--     submit a booking through the anon key, but nobody — including
--     other visitors — can read, list, or edit bookings through the
--     website. To review or update bookings (accept/decline, set an
--     appointment time), use the Supabase dashboard's Table Editor
--     directly, since there is no admin page anymore either.
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
  meet_link text,
  submitted_at timestamptz not null default now(),
  accepted_at timestamptz
);

alter table bookings enable row level security;

-- Anyone (including anonymous visitors using the anon key) can submit
-- a booking. This is intentional for a no-login contact/booking form.
drop policy if exists "bookings_insert_public" on bookings;
create policy "bookings_insert_public" on bookings
  for insert with check (true);

-- No select/update policy is created, which means the anon key
-- cannot read or modify any booking row — not even the one it just
-- inserted for anyone other than seeing what .select() returns right
-- after insert. View and manage bookings from the Supabase dashboard.


-- ───────────────────────────────────────────────────────────────
-- 3. AUTO-CREATE A PROFILE ROW WHEN SOMEONE SIGNS UP VIA GOOGLE
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
-- 4. MAKE YOURSELF ADMIN
--    Run this AFTER you have signed into the site once with the
--    Gmail account you want to use as the site owner/admin, so a
--    profiles row for you already exists. Replace the email below
--    with your actual Gmail address, then run just this statement.
-- ───────────────────────────────────────────────────────────────
-- update profiles set is_admin = true where email = 'your-admin-email@gmail.com';
