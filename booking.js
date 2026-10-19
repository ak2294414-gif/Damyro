/* ============================================================
   NorthWeb Co. — Booking Page Logic
   File: js/booking.js
   Depends on: sheets.js (NorthWebSheets.submitToSheets)
   ============================================================ */

/* ── Pre-fill service from URL param ── */
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const service = params.get('service');
  if (service) {
    const sel = document.getElementById('fservice');
    if (sel) {
      const option = sel.querySelector(`option[value="${service}"]`);
      if (option) { option.selected = true; }
    }
  }
});

/* ── Helpers ── */
function setError(fieldId, errId, msg) {
  const field = document.getElementById(fieldId);
  const err = document.getElementById(errId);
  if (field) field.classList.toggle('invalid', !!msg);
  if (err) err.textContent = msg || '';
}

function clearErrors() {
  ['fname', 'fphone', 'fservice'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('invalid');
  });
  ['err-name', 'err-phone', 'err-service', 'err-consent'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
  });
}

function generateRef() {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 5).toUpperCase();
  return `NW-${ts}-${rand}`;
}

function showSuccess(phone) {
  document.getElementById('bookingPage').style.display = 'none';
  const sp = document.getElementById('successPage');
  sp.style.display = 'flex';

  const ref = generateRef();
  const refEl = document.getElementById('bookingRef');
  const phoneEl = document.getElementById('confirmedPhone');
  if (refEl) refEl.textContent = ref;
  if (phoneEl) phoneEl.textContent = '+91 ' + phone;

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── Form submit ── */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('bookingForm');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    clearErrors();

    const name    = document.getElementById('fname').value.trim();
    const phone   = document.getElementById('fphone').value.trim();
    const biz     = document.getElementById('fbiz').value.trim();
    const service = document.getElementById('fservice').value;
    const message = document.getElementById('fmsg').value.trim();
    const consent = document.getElementById('consentCheck').checked;

    const errorEl   = document.getElementById('formError');
    const submitBtn = document.getElementById('submitBtn');

    let hasError = false;

    if (!name) {
      setError('fname', 'err-name', 'Please enter your name.');
      hasError = true;
    }
    if (!phone || phone.length !== 10) {
      setError('fphone', 'err-phone', 'Please enter a valid 10-digit WhatsApp number.');
      hasError = true;
    }
    if (!service) {
      setError('fservice', 'err-service', 'Please select a service.');
      hasError = true;
    }
    if (!consent) {
      const errEl = document.getElementById('err-consent');
      if (errEl) errEl.textContent = 'Please agree to our Privacy Policy to continue.';
      hasError = true;
    }

    if (hasError) return;

    // Disable button
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke-dasharray="40" stroke-dashoffset="40" style="animation:spin 1s linear infinite;transform-origin:center">
        </circle>
      </svg>
      Submitting…`;

    errorEl.style.display = 'none';

    const formData = { name, phone, business: biz, service, message };

    // Submit to Google Sheets via sheets.js
    const result = await NorthWebSheets.submitToSheets(formData);

    if (result.success) {
      showSuccess(phone);
    } else {
      errorEl.style.display = 'block';
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        Book Free Consultation`;
    }
  });
});

/* Spinner keyframe */
const style = document.createElement('style');
style.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
document.head.appendChild(style);
