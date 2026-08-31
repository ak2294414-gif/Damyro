// ═══════════════════════════════════════════════════════════════
// Damyro — notify-appointment Edge Function
// ═══════════════════════════════════════════════════════════════
// Called by the "on_booking_first_scheduled" database trigger
// (see supabase-setup.sql) the moment an admin sets an appointment
// date/time on a booking for the FIRST time. Sends one email to the
// customer via Resend. Reschedules do NOT call this function again
// — that's enforced by the trigger's notified_at guard, not by this
// file, so this function doesn't need its own duplicate-send logic.
//
// SECRETS THIS FUNCTION NEEDS (set via `supabase secrets set`,
// never hardcoded here — see deployment steps below):
//   RESEND_API_KEY        - from your Resend account dashboard
//   SUPABASE_URL           - auto-provided by Supabase at runtime
//   SUPABASE_SERVICE_ROLE_KEY - auto-provided by Supabase at runtime
//
// The trigger authenticates its call to this function with the
// service_role key (Bearer token), so this function can safely read
// any booking row with a service-role Supabase client — RLS does
// not block service-role access.
// ═══════════════════════════════════════════════════════════════

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

// Sender address must be on a domain you've verified in Resend.
// Using an unverified domain will cause every send to fail — see
// the deployment notes for how to verify a domain (or use Resend's
// shared testing address while you're setting this up).
const FROM_ADDRESS = "Damyro <appointments@yourdomain.com>";

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  if (!RESEND_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("notify-appointment: missing required secret(s).");
    return new Response(JSON.stringify({ error: "Server misconfigured — missing secret(s)" }), { status: 500 });
  }

  let bookingId: string;
  try {
    const body = await req.json();
    bookingId = body.booking_id;
    if (!bookingId) throw new Error("booking_id missing from request body");
  } catch (e) {
    return new Response(JSON.stringify({ error: "Invalid request body: " + (e as Error).message }), { status: 400 });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  const { data: booking, error: fetchErr } = await supabase
    .from("bookings")
    .select("id, full_name, email, package, appointment_date, appointment_time, meet_link")
    .eq("id", bookingId)
    .single();

  if (fetchErr || !booking) {
    console.error("notify-appointment: could not fetch booking", bookingId, fetchErr);
    return new Response(JSON.stringify({ error: "Booking not found" }), { status: 404 });
  }

  if (!booking.email) {
    // Nothing we can do — log and return 200 so the trigger's
    // fire-and-forget call doesn't get treated as a hard failure
    // for a data problem, not a delivery problem.
    console.warn("notify-appointment: booking has no email, skipping", bookingId);
    return new Response(JSON.stringify({ skipped: true, reason: "no email on booking" }), { status: 200 });
  }

  const dateLabel = booking.appointment_date || "";
  const timeLabel = booking.appointment_time || "";
  const whenLabel = [dateLabel, timeLabel].filter(Boolean).join(" at ") || "a time to be confirmed";

  const subject = `Your Damyro appointment is scheduled`;
  const htmlBody = `
    <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;color:#1a2e20;">
      <h2 style="color:#2d5e3a;">Your appointment is confirmed</h2>
      <p>Hi ${escapeHtml(booking.full_name || "there")},</p>
      <p>Your ${escapeHtml(booking.package || "")} appointment with Damyro has been scheduled for:</p>
      <p style="font-size:1.15em;font-weight:600;background:#eef5f0;padding:0.8em 1.2em;border-radius:8px;">
        ${escapeHtml(whenLabel)}
      </p>
      ${booking.meet_link ? `<p>Join here: <a href="${escapeAttr(booking.meet_link)}">${escapeHtml(booking.meet_link)}</a></p>` : ""}
      <p>If this time doesn't work, just reply to this email and we'll help you find another slot.</p>
      <p style="color:#7aab8a;font-size:0.85em;margin-top:2em;">— The Damyro Team</p>
    </div>
  `;

  const resendResp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: [booking.email],
      subject,
      html: htmlBody,
    }),
  });

  if (!resendResp.ok) {
    const errText = await resendResp.text();
    console.error("notify-appointment: Resend send failed", resendResp.status, errText);
    return new Response(JSON.stringify({ error: "Email send failed", detail: errText }), { status: 502 });
  }

  return new Response(JSON.stringify({ sent: true, booking_id: bookingId }), { status: 200 });
});

function escapeHtml(s: string): string {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));
}
function escapeAttr(s: string): string {
  return escapeHtml(s);
}
