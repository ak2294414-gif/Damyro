// ═══════════════════════════════════════════════════════════════
// Damyro — Supabase Configuration
// ═══════════════════════════════════════════════════════════════
// Public pages (questionnaire.html, packages.html, booking.html)
// don't require an account — booking.html submits a new row to
// "bookings" using only the key below. admin.html DOES require a
// real Supabase login (email + password), gated on the is_admin
// flag in the "profiles" table — see admin.html and
// supabase-setup.sql for that logic.
//
// This file only ever contains the "anon" / "publishable" key.
// That key is SAFE to ship in frontend code — Supabase is designed
// for this. Access control is enforced by the RLS policies in
// supabase-setup.sql (public can insert into bookings; only a
// signed-in admin can read/update bookings; everyone else, signed
// in or not, cannot read any booking row through the website).
//
// The secret/service_role key must NEVER be placed in this file,
// or in any file served to a browser, or committed to this repo
// anywhere. It is only ever used inside Supabase itself (Vault +
// the notify-appointment Edge Function) — see supabase-setup.sql
// section 4 for where that's configured.
// ═══════════════════════════════════════════════════════════════

const SUPABASE_URL = "https://xjuvlvyoggzfjhudatok.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_gDB2jvusn3K9QjObBGnxjQ_RSVeZlKg";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
