/* ============================================================
   NorthWeb Co. — Homepage JavaScript
   File: js/home.js
   ============================================================ */

/* Pricing tabs */
function showTab(type, btn) {
  document.getElementById('tab-clothing').style.display = type === 'clothing' ? 'grid' : 'none';
  document.getElementById('tab-resto').style.display = type === 'resto' ? 'grid' : 'none';
  document.querySelectorAll('.tab-btn').forEach(b => {
    b.classList.remove('on');
    b.setAttribute('aria-pressed', 'false');
  });
  if (btn) { btn.classList.add('on'); btn.setAttribute('aria-pressed', 'true'); }
}

/* FAQ accordion */
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => {
    i.classList.remove('open');
    i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
  });
  if (!isOpen) {
    item.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  }
}
