// ═══════════════════════════════════════════════════════════════
// Damyro — Supabase Configuration
// ═══════════════════════════════════════════════════════════════
// This file only ever contains the "anon" / "publishable" key.
// That key is SAFE to ship in frontend code — Supabase is designed
// for this. All real access control happens server-side via Row
// Level Security (RLS) policies, defined in supabase-setup.sql.
//
// The secret/service_role key must NEVER be placed in this file,
// or in any file that is served to a browser. If you ever need it
// for a server-side script, keep it off this website entirely.
// ═══════════════════════════════════════════════════════════════

const SUPABASE_URL = "https://hsrpfrhzkrlugvpngjsl.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_dmuwtMmXNzFlalnJbOBftQ_7hXKHlXd";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Admin email constant — used only for a friendly client-side
// message before attempting sign-in. The actual authorization
// decision is made by Supabase Auth + the is_admin flag in the
// profiles table (see supabase-setup.sql), not by this constant.
const ADMIN_EMAIL = "ak2294414@gmail.com";

// ── Shared helpers used across pages ──────────────────────────

async function getCurrentUser() {
  const { data: { user } } = await supabaseClient.auth.getUser();
  return user;
}

async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    window.location.href = "login.html";
    return null;
  }
  return user;
}

async function signOutAndRedirect() {
  await supabaseClient.auth.signOut();
  window.location.href = "login.html";
}

async function getMyProfile(userId) {
  const { data, error } = await supabaseClient
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();
  if (error) { console.error("getMyProfile error:", error); return null; }
  return data;
}

async function upsertMyProfile(userId, fields) {
  const { data, error } = await supabaseClient
    .from("profiles")
    .upsert({ id: userId, ...fields, updated_at: new Date().toISOString() })
    .select()
    .maybeSingle();
  if (error) { console.error("upsertMyProfile error:", error); return null; }
  return data;
}

function isAdminEmail(email) {
  return email && email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
}
