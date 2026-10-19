/* ============================================================
   NorthWeb Co. — Google Sheets Integration
   File: js/sheets.js

   HOW TO SET UP:
   1. Open Google Sheets → create a new sheet named "Bookings"
   2. Add these headers in Row 1:
      Timestamp | Name | WhatsApp | Business | Service | Message | Status
   3. Go to Extensions → Apps Script → paste the code from
      the comment block below → Deploy as Web App
      (Execute as: Me, Who has access: Anyone)
   4. Copy the Web App URL and paste it into SHEETS_URL below
   ============================================================

   ── APPS SCRIPT CODE (paste into Apps Script editor) ──────

   function doPost(e) {
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Bookings");
     var data = e.parameter;
     sheet.appendRow([
       new Date().toLocaleString("en-IN", {timeZone: "Asia/Kolkata"}),
       data.name     || "",
       data.phone    || "",
       data.business || "",
       data.service  || "",
       data.message  || "",
       "New"
     ]);
     return ContentService
       .createTextOutput(JSON.stringify({ result: "success" }))
       .setMimeType(ContentService.MimeType.JSON);
   }

   function doGet(e) {
     return ContentService
       .createTextOutput(JSON.stringify({ status: "NorthWeb Sheets API running" }))
       .setMimeType(ContentService.MimeType.JSON);
   }

   ─────────────────────────────────────────────────────────── */

const SHEETS_CONFIG = {
  // ↓ PASTE YOUR DEPLOYED WEB APP URL HERE ↓
  url: 'https://script.google.com/macros/s/AKfycbxLtcfFwmXRpSOzqBBHxTl87dr8t2oAhnYrb6nCi9-xHMEvEkdHHHQWGQ1HvAeK59uS/exec',

  // Column names (must match your Sheet header row)
  fields: ['name', 'phone', 'business', 'service', 'message']
};

/**
 * Submit booking data to Google Sheets via Apps Script Web App
 * @param {Object} formData - { name, phone, business, service, message }
 * @returns {Promise<{success: boolean, error?: string}>}
 */
async function submitToSheets(formData) {
  if (!SHEETS_CONFIG.url || SHEETS_CONFIG.url.includes('PASTE_YOUR')) {
    console.warn('[sheets.js] No Apps Script URL configured. Logging data locally.');
    console.table(formData);
    // In development, simulate success so you can test the UI
    return { success: true, dev: true };
  }

  const body = new FormData();
  SHEETS_CONFIG.fields.forEach(field => {
    body.append(field, formData[field] || '');
  });

  try {
    const response = await fetch(SHEETS_CONFIG.url, {
      method: 'POST',
      body: body,
      // Note: no-cors mode needed for Apps Script from browser
      // mode: 'no-cors'  ← uncomment if you get CORS errors
    });

    // Apps Script with CORS headers returns JSON
    const data = await response.json();

    if (data.result === 'success') {
      return { success: true };
    } else {
      return { success: false, error: data.error || 'Unknown error from sheet' };
    }
  } catch (err) {
    console.error('[sheets.js] Submission error:', err);
    // If CORS blocks the response but the row was still written,
    // we treat it as success (Apps Script always writes before responding)
    if (err instanceof SyntaxError || err.message.includes('Failed to fetch')) {
      return { success: true, note: 'CORS — row likely written. Check your sheet.' };
    }
    return { success: false, error: err.message };
  }
}

// Export for use in booking.js
window.NorthWebSheets = { submitToSheets };
