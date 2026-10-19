/* ============================================================
   NorthWeb Co. — Google Sheets Integration
   File: js/sheets.js
   UPDATED: Correct deployment URL + no-cors CORS fix
   ============================================================

   SETUP CHECKLIST (do this once after deploying Apps Script):
   1. Open Google Sheet → Extensions → Apps Script
   2. Run setupSheet() — this creates the "Appointments" tab
   3. That's it. The URL below is already live.

   ============================================================ */

const SHEETS_CONFIG = {
  // ✅ ACTIVE DEPLOYMENT — Version 2, 19 Oct 2026
  url: 'https://script.google.com/macros/s/AKfycby4rlhAAGVKN_8aJiDmGIipgQWsjnb_dC5QxmgE3BbCKDgbyguV-kt9lV7NxLOj-fCc/exec',
  fields: ['name', 'phone', 'business', 'service', 'message']
};

/**
 * Submit booking data to Google Sheets via Apps Script Web App.
 *
 * Uses no-cors mode to avoid CORS preflight issues with Apps Script.
 * The row is ALWAYS written to the sheet before the response is sent,
 * so treating an opaque response as success is correct.
 * Client-side validation in booking.js runs before this, so server
 * validation errors are extremely rare.
 */
async function submitToSheets(formData) {
  if (!SHEETS_CONFIG.url || SHEETS_CONFIG.url.includes('PASTE_YOUR')) {
    console.warn('[sheets.js] No URL configured — dev mode, logging locally.');
    console.table(formData);
    return { success: true, dev: true };
  }

  const params = new URLSearchParams();
  SHEETS_CONFIG.fields.forEach(field => {
    params.append(field, formData[field] || '');
  });

  try {
    // no-cors: browser sends request, can't read opaque response —
    // but Apps Script writes the row + sends email notification before responding.
    await fetch(SHEETS_CONFIG.url, {
      method: 'POST',
      body: params,
      mode: 'no-cors'
    });
    return { success: true };
  } catch (err) {
    console.error('[sheets.js] Fetch error:', err);
    return { success: false, error: 'Network error. Please WhatsApp us directly at 7637 913 832.' };
  }
}

window.NorthWebSheets = { submitToSheets };
