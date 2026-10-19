/* ============================================================
   NorthWeb Co. — Solutions Data + Page Renderer
   File: js/solutions.js
   Each solution HTML file sets window.SOLUTION_KEY, then this
   script renders the full page inside <main id="solution-main">.
   ============================================================ */

const SOLUTIONS = {

  showcase: {
    title: 'Collection Showcase Website',
    tagline: 'Display your products beautifully — drive enquiries on WhatsApp',
    icon: '🛍️', accent: '#0052CC',
    seoDesc: 'Get a fast, mobile-first collection showcase website for your store. NorthWeb Co. builds product display websites for businesses across Assam and Northeast India.',
    forBusinesses: ['Clothing stores & boutiques','Jewellery shops','Handicraft sellers','Electronics dealers','Home decor & furniture','Gift shops','Book stores','Art galleries','Any business with products to display'],
    features: ['Product gallery with categories & filters','Mobile-optimised product cards','WhatsApp "Ask About This" button per product','Business info & contact section','Google Maps embed','Photo gallery / lookbook section','SEO-ready page structure','Fast loading — no heavy frameworks','Up to 40 products, 3 categories'],
    setup: '₹8,000 – ₹15,000', monthly: '₹1,500/month (optional)',
    includes: ['Up to 40 products', '3 product categories', 'WhatsApp integration', 'Contact & location section', 'Mobile responsive', '2 free revision rounds', 'Delivery in 7–10 days'],
    serviceKey: 'showcase',
    demo: 'https://domeweb.shop/', demoLabel: 'View Live Demo',
    related: ['ecommerce','restaurant','business']
  },

  ecommerce: {
    title: 'D2C E-commerce Store',
    tagline: 'Sell directly to customers online — no middleman, full control',
    icon: '🛒', accent: '#E8820C',
    seoDesc: 'Get a full D2C e-commerce website with cart, checkout and UPI payment. NorthWeb Co. builds online stores for brands across Assam and Northeast India.',
    forBusinesses: ['Clothing & fashion brands','Food & beverage brands','Handicraft & artisan sellers','Cosmetics & beauty brands','Electronics & gadget sellers','Home & lifestyle brands','Any brand selling products directly online'],
    features: ['Full product catalogue with variants (size, colour, etc.)','Shopping cart & checkout flow','UPI / Razorpay payment integration','Order confirmation & tracking page','Customer inquiry & support section','Discount code / coupon system','Admin-friendly product management','Mobile-first design throughout','Inventory & stock status display'],
    setup: '₹30,000 – ₹55,000', monthly: '₹3,000/month (optional)',
    includes: ['Up to 200 products', 'Payment gateway integration', 'Cart & checkout', 'Order confirmation flow', 'Admin update guide', '2 free revision rounds', 'Delivery in 14–20 days'],
    serviceKey: 'ecommerce',
    demo: null,
    related: ['showcase','business','restaurant']
  },

  restaurant: {
    title: 'Restaurant / Cafe Website',
    tagline: 'Beautiful online presence for your food business',
    icon: '🍽️', accent: '#16A34A',
    seoDesc: 'Get a professional restaurant or cafe website with digital menu, gallery and table booking. NorthWeb Co. serves food businesses across Assam and Northeast India.',
    forBusinesses: ['Restaurants & dhabas','Cafes & coffee shops','Bakeries & patisseries','Cloud kitchens','Food trucks','Sweet shops & mithai stores','Tiffin & catering services'],
    features: ['Digital menu with photos & prices','Online table reservation form','WhatsApp order / inquiry button','Food photo gallery','Business hours & location section','Special offers & promotions banner','Google Maps integration','Event & private dining section','Mobile-optimised design'],
    setup: '₹10,000 – ₹20,000', monthly: '₹2,000/month (optional)',
    includes: ['Full menu setup (up to 5 categories)', 'Reservation form', 'Photo gallery', 'Google Maps embed', 'WhatsApp integration', '2 free revision rounds', 'Delivery in 7–12 days'],
    serviceKey: 'restaurant',
    demo: null,
    related: ['showcase','business','event']
  },

  business: {
    title: 'Business / Corporate Website',
    tagline: 'Professional online presence that builds credibility for your company',
    icon: '🏢', accent: '#7C3AED',
    seoDesc: 'Get a professional business or corporate website. NorthWeb Co. builds credibility-first websites for agencies, firms, and service businesses across Northeast India.',
    forBusinesses: ['Agencies & consultancies','IT & tech companies','Law firms & CA offices','Trading & import-export companies','Contractors & builders','Service-based businesses','Startups & small businesses'],
    features: ['Company overview & mission section','Services / products listing','Team / about us section','Client portfolio or case studies','Testimonials & trust signals','Contact & enquiry form','WhatsApp & email integration','Professional branded design','SEO-optimised structure'],
    setup: '₹12,000 – ₹22,000', monthly: '₹2,000/month (optional)',
    includes: ['Up to 8 pages', 'Contact & inquiry form', 'Team profiles', 'Testimonials section', 'WhatsApp integration', '2 free revision rounds', 'Delivery in 10–14 days'],
    serviceKey: 'business',
    demo: null,
    related: ['portfolio','ecommerce','showcase']
  },

  portfolio: {
    title: 'Portfolio Website',
    tagline: 'Showcase your best work — attract better clients',
    icon: '🎨', accent: '#DB2777',
    seoDesc: 'Get a clean, fast portfolio website to showcase your work and attract clients. NorthWeb Co. builds portfolio sites for creatives across Assam and Northeast India.',
    forBusinesses: ['Photographers & videographers','Graphic & UI designers','Architects & interior designers','Makeup artists & stylists','Writers & content creators','Freelancers & consultants','Artists & illustrators'],
    features: ['Work / project gallery (grid or masonry)','About & skills / expertise section','Client testimonials','Contact & inquiry form','Social media links','Downloadable CV option','Clean, minimal design','Fast loading — great first impression','Mobile responsive'],
    setup: '₹6,000 – ₹12,000', monthly: '₹1,000/month (optional)',
    includes: ['Up to 30 portfolio items', 'About & skills section', 'Contact form', 'Social links', 'Mobile responsive', '2 free revision rounds', 'Delivery in 5–8 days'],
    serviceKey: 'portfolio',
    demo: null,
    related: ['business','showcase','salon']
  },

  realestate: {
    title: 'Real Estate / Property Website',
    tagline: 'Showcase properties and generate serious buyer enquiries online',
    icon: '🏠', accent: '#0891B2',
    seoDesc: 'Get a professional real estate website with property listings and inquiry forms. NorthWeb Co. builds property websites for agents and builders across Northeast India.',
    forBusinesses: ['Real estate agents & brokers','Property builders & developers','PG & hostel owners','Commercial property owners','Land dealers','Flat / house sellers','Housing societies'],
    features: ['Property listings with photo galleries','Search & filter by type / budget','Individual property detail pages','Enquiry form per property','WhatsApp contact button per listing','Agent / company profile section','Google Maps for each property','RERA / compliance information section','Mobile-optimised browsing'],
    setup: '₹18,000 – ₹35,000', monthly: '₹2,500/month (optional)',
    includes: ['Up to 50 property listings', 'Search & filter', 'Enquiry forms', 'Agent profile', 'WhatsApp integration', '2 free revision rounds', 'Delivery in 12–18 days'],
    serviceKey: 'realestate',
    demo: null,
    related: ['business','hotel','showcase']
  },

  education: {
    title: 'Educational / Coaching Website',
    tagline: 'Attract more students and grow your institute online',
    icon: '📚', accent: '#D97706',
    seoDesc: 'Get a professional website for your coaching centre, school or educational institute. NorthWeb Co. builds education websites across Assam and Northeast India.',
    forBusinesses: ['Coaching centres & tuition classes','Schools & colleges','Online course creators','Skill development institutes','Language & music academies','Professional training centres','Tutors & home teachers'],
    features: ['Course / subject listings with fees','Batch schedule & timetable','Online enrollment / inquiry form','Faculty & teacher profiles','Student results & achievements section','Notice board / announcements','Photo gallery (campus, events)','WhatsApp admission inquiry button','Mobile-optimised design'],
    setup: '₹15,000 – ₹28,000', monthly: '₹2,000/month (optional)',
    includes: ['Up to 20 courses', 'Enrollment form', 'Faculty profiles', 'Results section', 'Notice board', '2 free revision rounds', 'Delivery in 10–15 days'],
    serviceKey: 'education',
    demo: null,
    related: ['business','portfolio','gym']
  },

  gym: {
    title: 'Gym / Fitness Studio Website',
    tagline: 'Attract new members and showcase your facilities online',
    icon: '💪', accent: '#DC2626',
    seoDesc: 'Get a high-energy website for your gym or fitness studio. NorthWeb Co. builds fitness websites for gyms, yoga studios, and sports academies across Northeast India.',
    forBusinesses: ['Gyms & fitness centres','Yoga studios','CrossFit & functional training','Martial arts academies','Dance studios & academies','Sports training centres','Personal trainers'],
    features: ['Membership plans & pricing table','Class schedule / timetable','Trainer profiles & bios','Facilities photo gallery','Online trial / inquiry booking form','Transformation stories / testimonials','Free trial CTA section','WhatsApp membership inquiry button','Mobile-optimised design'],
    setup: '₹10,000 – ₹18,000', monthly: '₹1,500/month (optional)',
    includes: ['Membership plans display', 'Class schedule', 'Trainer profiles', 'Gallery', 'Inquiry form', '2 free revision rounds', 'Delivery in 7–12 days'],
    serviceKey: 'gym',
    demo: null,
    related: ['salon','business','education']
  },

  salon: {
    title: 'Salon / Beauty Parlor Website',
    tagline: 'Beautiful website to grow your beauty business',
    icon: '💅', accent: '#EC4899',
    seoDesc: 'Get a stunning website for your salon, spa or beauty parlor. NorthWeb Co. builds beauty business websites across Assam and Northeast India.',
    forBusinesses: ['Hair salons & beauty parlors','Spas & wellness centres','Nail studios','Makeup artists','Tattoo studios','Barbershops & grooming studios','Bridal makeup & styling services'],
    features: ['Services menu with prices','Photo gallery (work & ambience)','Online appointment booking form','Staff / stylist profiles','Customer reviews section','Before & after gallery','Offers & packages section','WhatsApp booking button','Mobile-optimised design'],
    setup: '₹8,000 – ₹16,000', monthly: '₹1,500/month (optional)',
    includes: ['Full services menu', 'Gallery', 'Appointment form', 'Staff profiles', 'WhatsApp integration', '2 free revision rounds', 'Delivery in 7–10 days'],
    serviceKey: 'salon',
    demo: null,
    related: ['gym','portfolio','business']
  },

  medical: {
    title: 'Clinic / Medical Website',
    tagline: 'Build trust and help patients find you online',
    icon: '🏥', accent: '#0D9488',
    seoDesc: 'Get a professional website for your clinic, hospital or medical centre. NorthWeb Co. builds medical websites for healthcare providers across Northeast India.',
    forBusinesses: ['Clinics & hospitals','Diagnostic centres','Dentists & dental clinics','Pharmacies','Veterinary clinics','Physiotherapy & rehab centres','Eye clinics & specialists'],
    features: ['Doctor & specialist profiles','Services & treatments listing','Online appointment booking form','Timings & location section','Emergency contact section','Health tips / blog section','Insurance information','WhatsApp appointment button','Mobile-optimised design'],
    setup: '₹12,000 – ₹22,000', monthly: '₹2,000/month (optional)',
    includes: ['Doctor profiles', 'Appointment form', 'Services listing', 'Location & hours', 'Emergency contacts', '2 free revision rounds', 'Delivery in 8–12 days'],
    serviceKey: 'medical',
    demo: null,
    related: ['business','education','gym']
  },

  event: {
    title: 'Event / Wedding Website',
    tagline: 'Make every event unforgettable — online and offline',
    icon: '🎉', accent: '#6D28D9',
    seoDesc: 'Get a professional website for your event management company or wedding venue. NorthWeb Co. builds event websites across Assam and Northeast India.',
    forBusinesses: ['Wedding planners & decorators','Event management companies','Wedding & banquet venues','Corporate event organisers','Birthday & party planners','Conference & seminar organisers','Live show & entertainment companies'],
    features: ['Event details & full schedule','RSVP / attendance form','Photo & video gallery','Venue / location with Google Maps','Countdown timer to event','Package & pricing section','Vendor showcase section','WhatsApp contact button','Mobile-optimised design'],
    setup: '₹10,000 – ₹18,000', monthly: '₹1,500/month (optional)',
    includes: ['Event details page', 'RSVP form', 'Gallery', 'Countdown timer', 'Location map', '2 free revision rounds', 'Delivery in 7–12 days'],
    serviceKey: 'event',
    demo: null,
    related: ['restaurant','business','hotel']
  },

  hotel: {
    title: 'Hotel / Homestay / PG Website',
    tagline: 'Attract more guests and get direct bookings',
    icon: '🏨', accent: '#1D4ED8',
    seoDesc: 'Get a professional website for your hotel, homestay, or PG. NorthWeb Co. builds hospitality websites for properties across Assam and Northeast India.',
    forBusinesses: ['Hotels & resorts','Homestays & guesthouses','PGs & paying guest houses','Lodges & service apartments','Eco-resorts & nature camps','Dormitories & backpacker stays','Vacation rentals'],
    features: ['Room types with photos & amenities','Pricing & availability info','Online booking inquiry form','Photo gallery of property','Facilities & services section','Location & nearby attractions','Guest reviews section','WhatsApp booking button','Mobile-optimised design'],
    setup: '₹18,000 – ₹32,000', monthly: '₹2,500/month (optional)',
    includes: ['Up to 10 room types', 'Inquiry form', 'Photo gallery', 'Facilities section', 'Location map', '2 free revision rounds', 'Delivery in 10–14 days'],
    serviceKey: 'hotel',
    demo: null,
    related: ['restaurant','event','business']
  },

  seo: {
    title: 'Local SEO Add-On',
    tagline: 'Get found on Google by customers in your city',
    icon: '🔍', accent: '#0052CC',
    seoDesc: 'Boost your local Google rankings with NorthWeb Co. SEO services for businesses across Assam and Northeast India.',
    forBusinesses: ['Any business with a website','Restaurants & food businesses','Retail stores & boutiques','Service businesses','Healthcare providers','Educational institutes','Hotels & hospitality'],
    features: ['Google My Business setup & optimisation','Local keyword research & targeting','On-page SEO (title tags, descriptions, headers)','Google Maps ranking improvement','Monthly ranking & traffic report','Review & reputation management guidance','Schema markup for local search','Competitor analysis','Mobile & speed optimisation review'],
    setup: null, monthly: '₹4,000 – ₹8,000/month',
    includes: ['Google My Business optimisation', 'Monthly keyword report', 'On-page SEO updates', 'Google Maps optimisation', 'Monthly performance report', 'WhatsApp support'],
    serviceKey: 'seo',
    demo: null,
    related: ['showcase','restaurant','business']
  }
};

/* ============================================================
   PAGE RENDERER
   ============================================================ */
function renderSolutionPage(key) {
  const s = SOLUTIONS[key];
  if (!s) {
    document.getElementById('solution-main').innerHTML = '<p style="padding:4rem 6%;color:#DC2626">Solution not found.</p>';
    return;
  }

  // Set meta
  document.title = s.title + ' — NorthWeb Co.';
  const descMeta = document.querySelector('meta[name="description"]');
  if (descMeta) descMeta.content = s.seoDesc;
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.href = 'https://northweb.co/pages/solutions/' + key + '.html';

  // Breadcrumb
  const bc = document.getElementById('breadcrumb-root');
  if (bc) bc.innerHTML = `
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <span><a href="../../index.html">Home</a></span>
      <span><a href="../../index.html#solutions">Solutions</a></span>
      <span>${s.title}</span>
    </nav>`;

  const bookingBase = '../../pages/booking.html';
  const demoBtn = s.demo
    ? `<a href="${s.demo}" target="_blank" rel="noopener noreferrer" class="btn-secondary sol-demo-btn">View Live Demo ↗</a>`
    : `<span class="sol-demo-soon">Demo coming soon</span>`;

  const priceLabel = s.setup
    ? `<span>From ${s.setup.split('–')[0].trim()}</span>`
    : `<span>${s.monthly}</span>`;

  const relatedHTML = s.related.map(r => {
    const rel = SOLUTIONS[r];
    if (!rel) return '';
    return `<a href="${r}.html" class="sol-related-card">
      <span class="src-icon">${rel.icon}</span>
      <span class="src-title">${rel.title}</span>
      <span class="src-price">From ${rel.setup ? rel.setup.split('–')[0].trim() : rel.monthly}</span>
    </a>`;
  }).join('');

  const html = `
<!-- HERO -->
<section class="sol-hero" style="--sol-accent:${s.accent}">
  <div class="sol-hero-inner">
    <div class="sol-hero-icon">${s.icon}</div>
    <div class="section-eyebrow">Website Solution</div>
    <h1>${s.title}</h1>
    <p class="sol-tagline">${s.tagline}</p>
    <div class="sol-hero-btns">
      <a href="${bookingBase}?service=${s.serviceKey}&locked=1" class="btn-primary">
        Book Free Consultation — ${s.setup ? s.setup.split('–')[0].trim() + ' onwards' : s.monthly}
      </a>
      ${demoBtn}
    </div>
  </div>
</section>

<!-- FOR WHOM -->
<section class="sol-section sol-for-section">
  <div class="sol-section-inner">
    <div class="section-eyebrow">Who Is This For?</div>
    <h2>Perfect for these businesses</h2>
    <div class="sol-for-grid">
      ${s.forBusinesses.map(b => `<div class="sol-for-item"><span class="sol-for-icon">✓</span>${b}</div>`).join('')}
    </div>
  </div>
</section>

<!-- FEATURES -->
<section class="sol-section sol-features-section">
  <div class="sol-section-inner">
    <div class="section-eyebrow">What You Get</div>
    <h2>Everything included in this website</h2>
    <div class="sol-features-grid">
      ${s.features.map(f => `<div class="sol-feature-item"><span class="sf-check">✓</span><span>${f}</span></div>`).join('')}
    </div>
  </div>
</section>

<!-- PRICING -->
<section class="sol-section sol-pricing-section">
  <div class="sol-section-inner">
    <div class="section-eyebrow">Transparent Pricing</div>
    <h2>No hidden costs</h2>
    <div class="sol-price-card">
      <div class="spc-left">
        ${s.setup ? `<div class="spc-price-row"><span class="spc-label">One-time setup</span><span class="spc-amount">${s.setup}</span></div>` : ''}
        <div class="spc-price-row"><span class="spc-label">${s.setup ? 'Optional monthly' : 'Monthly'}</span><span class="spc-amount spc-monthly">${s.monthly}</span></div>
        <p class="spc-note">Final price depends on exact requirements. Book a free call — we'll give you a fixed quote within 24 hours.</p>
      </div>
      <div class="spc-right">
        <h3>What's included</h3>
        <ul class="spc-list">
          ${s.includes.map(i => `<li><span>✓</span>${i}</li>`).join('')}
        </ul>
        <a href="${bookingBase}?service=${s.serviceKey}&locked=1" class="btn-primary spc-cta">
          Book Free Consultation
        </a>
        <p class="spc-sub">No payment now · Ankur replies within 24 hrs on WhatsApp</p>
      </div>
    </div>
  </div>
</section>

<!-- PROCESS -->
<section class="sol-section sol-process-section">
  <div class="sol-section-inner">
    <div class="section-eyebrow">How It Works</div>
    <h2>From chat to live website in 5 steps</h2>
    <p class="sol-process-sub">You share your contact details. We handle everything else end-to-end.</p>
    <div class="sol-steps">
      <div class="sol-step"><div class="sol-step-num">1</div><h3>Free Consultation</h3><p>Book via form. Ankur calls within 24 hrs on WhatsApp.</p></div>
      <div class="sol-step"><div class="sol-step-num">2</div><h3>Share Requirements</h3><p>Tell us your business, goals, and what you need.</p></div>
      <div class="sol-step"><div class="sol-step-num">3</div><h3>Design & Build</h3><p>We design and build your website. You review progress.</p></div>
      <div class="sol-step"><div class="sol-step-num">4</div><h3>Review & Revise</h3><p>2 free revision rounds until you're 100% happy.</p></div>
      <div class="sol-step"><div class="sol-step-num">5</div><h3>Go Live!</h3><p>Your website goes live. We hand over everything.</p></div>
    </div>
  </div>
</section>

<!-- RELATED SOLUTIONS -->
<section class="sol-section sol-related-section">
  <div class="sol-section-inner">
    <div class="section-eyebrow">Also Available</div>
    <h2>Other website solutions</h2>
    <div class="sol-related-grid">${relatedHTML}</div>
    <div style="text-align:center;margin-top:2rem">
      <a href="../../index.html#solutions" class="btn-secondary">See All 12 Solutions →</a>
    </div>
  </div>
</section>`;

  document.getElementById('solution-main').innerHTML = html;
}

/* ---------- AUTO-INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const key = window.SOLUTION_KEY;
  if (key) renderSolutionPage(key);
});
