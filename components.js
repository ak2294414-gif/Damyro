/* ============================================================
   NorthWeb Co. — Shared UI Components
   File: js/components.js
   UPDATED: Multi-level routing + simplified nav
   ============================================================ */

const NAV_LINKS = [
  { label: 'Solutions',  href: 'index.html#solutions' },
  { label: 'Process',    href: 'index.html#process' },
  { label: 'Demos',      href: 'index.html#demos' },
  { label: 'Book Now',   href: 'pages/booking.html', highlight: true },
];

const WA_NUMBER  = '917637913832';
const WA_DISPLAY = '7637 913 832';
const EMAIL      = 'ak2294414x@gmail.com';

/* ---------- RELATIVE HREF (handles 3 depth levels) ---------- */
function getRelHref(path) {
  const p = window.location.pathname;
  const inSolutions = p.includes('/solutions/');
  const inPages     = p.includes('/pages/') && !inSolutions;

  if (inSolutions) {
    // Depth: /pages/solutions/X.html
    if (path === 'index.html' || path.startsWith('index.html#')) return '../../' + path;
    if (path.startsWith('pages/')) return '../' + path.slice('pages/'.length);
    return '../../' + path;
  }
  if (inPages) {
    // Depth: /pages/X.html
    if (path === 'index.html' || path.startsWith('index.html#')) return '../' + path;
    if (path.startsWith('pages/')) return path.slice('pages/'.length);
    return '../' + path;
  }
  // Root level
  return path;
}

/* ---------- NAV ---------- */
function renderNav(activePage) {
  const linksHTML = NAV_LINKS.map(l => {
    const href  = getRelHref(l.href);
    const isAct = activePage && l.href.includes(activePage);
    const cls   = [l.highlight ? 'btn-nav' : '', isAct ? 'active' : ''].filter(Boolean).join(' ');
    return `<li role="none"><a href="${href}" class="${cls}" role="menuitem">${l.label}</a></li>`;
  }).join('');

  const html = `
<a class="skip-link" href="#main-content">Skip to main content</a>
<nav role="navigation" aria-label="Main navigation">
  <a href="${getRelHref('index.html')}" class="logo" aria-label="NorthWeb Co. home">NorthWeb <span>Co.</span></a>
  <ul class="nav-links" id="navLinks" role="menubar">${linksHTML}</ul>
  <div class="nav-actions">
    <a href="https://wa.me/${WA_NUMBER}" class="nav-wa" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      ${WA_DISPLAY}
    </a>
  </div>
  <button class="hamburger" id="hamburger" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="navLinks">
    <span></span><span></span><span></span>
  </button>
</nav>`;

  const t = document.getElementById('nav-root');
  if (t) t.innerHTML = html;

  const ham  = document.getElementById('hamburger');
  const navL = document.getElementById('navLinks');
  if (ham && navL) {
    ham.addEventListener('click', () => {
      const open = navL.classList.toggle('open');
      ham.setAttribute('aria-expanded', String(open));
    });
    navL.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navL.classList.remove('open');
        ham.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* ---------- FOOTER ---------- */
function renderFooter() {
  const html = `
<footer role="contentinfo">
  <div class="footer-top">
    <div class="footer-brand">
      <a href="${getRelHref('index.html')}" class="logo footer-logo" aria-label="NorthWeb Co. home">NorthWeb <span>Co.</span></a>
      <p>Professional websites for local businesses across Northeast India. Built by Ankur.</p>
    </div>
    <div class="footer-col">
      <h4>Solutions</h4>
      <ul>
        <li><a href="${getRelHref('pages/solutions/showcase.html')}">Collection Showcase</a></li>
        <li><a href="${getRelHref('pages/solutions/ecommerce.html')}">D2C E-commerce</a></li>
        <li><a href="${getRelHref('pages/solutions/restaurant.html')}">Restaurant / Cafe</a></li>
        <li><a href="${getRelHref('pages/solutions/business.html')}">Business / Corporate</a></li>
        <li><a href="${getRelHref('index.html')}#solutions">All 12 Solutions →</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Company</h4>
      <ul>
        <li><a href="${getRelHref('index.html')}#demos">Live Demos</a></li>
        <li><a href="${getRelHref('index.html')}#process">Our Process</a></li>
        <li><a href="${getRelHref('pages/booking.html')}">Book a Consultation</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Legal</h4>
      <ul>
        <li><a href="${getRelHref('pages/policies.html')}#privacy">Privacy Policy</a></li>
        <li><a href="${getRelHref('pages/policies.html')}#terms">Terms of Service</a></li>
        <li><a href="${getRelHref('pages/policies.html')}#refund">Refund Policy</a></li>
        <li><a href="${getRelHref('pages/policies.html')}#cookie">Cookie Policy</a></li>
        <li><a href="https://wa.me/${WA_NUMBER}?text=I+want+to+request+deletion+of+my+data" target="_blank" rel="noopener noreferrer">Data Deletion Request</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© ${new Date().getFullYear()} NorthWeb Co. · Ankur · Northeast India · <a href="mailto:${EMAIL}">${EMAIL}</a></span>
    <span>
      <a href="https://wa.me/${WA_NUMBER}" target="_blank" rel="noopener noreferrer">WhatsApp: ${WA_DISPLAY}</a>
      &nbsp;·&nbsp;<a href="${getRelHref('pages/policies.html')}">Privacy</a>
      &nbsp;·&nbsp;<a href="${getRelHref('pages/policies.html')}#terms">Terms</a>
    </span>
  </div>
</footer>
<a href="https://wa.me/${WA_NUMBER}" class="wa-float" target="_blank" rel="noopener noreferrer" aria-label="Chat with NorthWeb Co. on WhatsApp">
  <svg width="23" height="23" viewBox="0 0 24 24" fill="white" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
</a>`;

  const t = document.getElementById('footer-root');
  if (t) t.innerHTML = html;
}

/* ---------- COOKIE BANNER ---------- */
function renderCookieBanner() {
  const html = `
<div id="cookieBanner" role="dialog" aria-label="Cookie consent">
  <span>We use cookies to improve your experience. See our <a href="${getRelHref('pages/policies.html')}#cookie">Cookie Policy</a>.</span>
  <div class="cookie-actions">
    <button class="cookie-btn decline" onclick="dismissCookie('decline')">Decline</button>
    <button class="cookie-btn accept"  onclick="dismissCookie('accept')">Accept</button>
  </div>
</div>`;

  const t = document.getElementById('cookie-root');
  if (t) {
    t.innerHTML = html;
    try {
      if (localStorage.getItem('cookieConsent')) {
        document.getElementById('cookieBanner').style.display = 'none';
      }
    } catch(e) {}
  }
}

window.dismissCookie = function(choice) {
  try { localStorage.setItem('cookieConsent', choice); } catch(e) {}
  const b = document.getElementById('cookieBanner');
  if (b) b.style.display = 'none';
};

/* ---------- AUTO-INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  let activePage = '';
  if (path.includes('booking'))  activePage = 'booking';
  if (path.includes('policies')) activePage = 'policies';

  renderNav(activePage);
  renderFooter();
  renderCookieBanner();
});
