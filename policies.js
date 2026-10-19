/* ============================================================
   NorthWeb Co. — Policies Page Logic
   File: js/policies.js
   ============================================================ */

const POLICY_IDS = ['privacy', 'terms', 'refund', 'cookie'];

function showPolicy(id) {
  // Scroll to the doc section
  const el = document.getElementById(id);
  if (el) {
    setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }
  // Update active nav link
  document.querySelectorAll('.p-nav-link').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + id);
  });
  // Update URL hash without reloading
  history.replaceState(null, '', '#' + id);
}

// On load: highlight nav link based on hash
document.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.replace('#', '');
  if (POLICY_IDS.includes(hash)) {
    showPolicy(hash);
  } else {
    // Default: highlight Privacy
    document.querySelectorAll('.p-nav-link').forEach((a, i) => {
      if (i === 0) a.classList.add('active');
    });
  }

  // Update active link on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.p-nav-link').forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  POLICY_IDS.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
});
