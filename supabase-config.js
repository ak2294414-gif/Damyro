// ═══════════════════════════════════════════════════════════════
// Damyro — Supabase Configuration
// ═══════════════════════════════════════════════════════════════
// This site has no login system — questionnaire.html, packages.html,
// and booking.html don't require an account. Only booking.html
// actually talks to Supabase (submitting a new row to "bookings").
//
// This file only ever contains the "anon" / "publishable" key.
// That key is SAFE to ship in frontend code — Supabase is designed
// for this. Access control is enforced by the RLS policy in
// supabase-setup.sql (public can insert, nobody can read back
// through the website).
//
// The secret/service_role key must NEVER be placed in this file,
// or in any file served to a browser.
// ═══════════════════════════════════════════════════════════════

const SUPABASE_URL = "https://hsrpfrhzkrlugvpngjsl.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_dmuwtMmXNzFlalnJbOBftQ_7hXKHlXd";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
