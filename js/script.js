/* =============================================================
   HELION SOLAR — HOMEPAGE SCRIPT
   -------------------------------------------------------------
   Requires (in this order, see index.html):
     1. js/data.js    -> PRODUCTS, GALLERY, TESTIMONIALS, formatINR
     2. js/common.js   -> preloader, theme, nav, reveal, toast, back-to-top
     3. js/script.js   -> this file

   Table of contents:
   1.  Config (WhatsApp number — edit this)
   2.  Hero carousel
   3.  "Explore Our Systems" showcase widget
   4.  Facts counter
   5.  Product rendering + filtering + card actions
   6.  Gallery rendering
   7.  Testimonials — continuous auto-scrolling marquee
   8.  Enquiry form (WhatsApp handoff, frontend-only)
   ============================================================= */

/* -------------------------------------------------------------
   1. CONFIG
   Replace this with the owner's WhatsApp number (country code,
   no + sign, no spaces or dashes) to receive enquiries directly.
   See the chat notes for full WhatsApp setup instructions.
   ------------------------------------------------------------- */
const OWNER_WHATSAPP_NUMBER = "919000000000"; // <-- EDIT ME: 91 + 10-digit number

document.addEventListener("DOMContentLoaded", () => {
  initHeroCarousel();
  initShowcaseWidget();
  initFactsCounter();
  renderProducts();
  initProductFilters();
  renderGallery();
  renderTestimonials();
  initTestimonialMarquee();
  initEnquiryForm();
  applyPrefillFromURL();
});

/* -------------------------------------------------------------
   2. HERO CAROUSEL
   ------------------------------------------------------------- */
function initHeroCarousel() {
  const slides = document.querySelectorAll(".hero-slide");
  const copies = document.querySelectorAll(".hero-slide-copy");
  const dots = document.querySelectorAll("#carouselDots .dot");
  let index = 0;
  let timer;

  function show(i) {
    slides.forEach((s) => s.classList.remove("is-active"));
    copies.forEach((c) => c.classList.remove("is-active"));
    dots.forEach((d) => d.classList.remove("is-active"));

    slides[i].classList.add("is-active");
    copies[i].classList.add("is-active");
    dots[i].classList.add("is-active");
    index = i;
  }

  function next() { show((index + 1) % slides.length); }
  function restart() { clearInterval(timer); timer = setInterval(next, 6000); }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => { show(Number(dot.dataset.dot)); restart(); });
  });

  restart();
}

/* -------------------------------------------------------------
   3. "EXPLORE OUR SYSTEMS" SHOWCASE WIDGET (signature element)
   Cycles through SHOWCASE (one entry per top-level category):
   large photo + heading crossfades, small thumbnail rail below
   lets visitors jump straight to a category. Auto-advances, and
   the CTA scrolls to Products pre-filtered to that category.
   ------------------------------------------------------------- */
function initShowcaseWidget() {
  const mainImg = document.getElementById("showcaseMainImg");
  const label = document.getElementById("showcaseLabel");
  const heading = document.getElementById("showcaseHeading");
  const blurb = document.getElementById("showcaseBlurb");
  const cta = document.getElementById("showcaseCta");
  const thumbs = document.getElementById("showcaseThumbs");
  if (!mainImg) return;

  let index = 0;
  let timer;

  thumbs.innerHTML = SHOWCASE.map((s, i) => `
    <button type="button" class="showcase-thumb ${i === 0 ? "is-active" : ""}" data-index="${i}">
      <img src="${s.image}" alt="${s.heading}" loading="lazy">
      <span>${s.label}</span>
    </button>
  `).join("");

  function show(i) {
    index = (i + SHOWCASE.length) % SHOWCASE.length;
    const s = SHOWCASE[index];

    mainImg.style.opacity = "0";
    setTimeout(() => {
      mainImg.src = s.image;
      mainImg.alt = s.heading;
      mainImg.style.opacity = "1";
    }, 200);

    label.textContent = s.label;
    heading.textContent = s.heading;
    blurb.textContent = s.blurb;
    cta.dataset.filter = s.category;

    thumbs.querySelectorAll(".showcase-thumb").forEach((btn, btnIndex) => {
      btn.classList.toggle("is-active", btnIndex === index);
    });
  }

  function restart() { clearInterval(timer); timer = setInterval(() => show(index + 1), 5000); }

  thumbs.querySelectorAll(".showcase-thumb").forEach((btn) => {
    btn.addEventListener("click", () => { show(Number(btn.dataset.index)); restart(); });
  });

  document.getElementById("showcasePrev").addEventListener("click", () => { show(index - 1); restart(); });
  document.getElementById("showcaseNext").addEventListener("click", () => { show(index + 1); restart(); });

  cta.addEventListener("click", (e) => {
    e.preventDefault();
    const filter = cta.dataset.filter;
    const chip = document.querySelector(`.filter-chip[data-filter="${filter}"]`);
    if (chip) chip.click();
    document.getElementById("products").scrollIntoView({ behavior: "smooth" });
  });

  show(0);
  restart();
}

/* -------------------------------------------------------------
   4. FACTS COUNTER
   ------------------------------------------------------------- */
function initFactsCounter() {
  const counters = document.querySelectorAll(".fact-number");
  const duration = 1600;

  function animate(el) {
    const target = Number(el.dataset.target);
    const suffix = el.dataset.suffix || "";
    const startTime = performance.now();

    function frame(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.textContent = value.toLocaleString("en-IN") + suffix;
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  counters.forEach((c) => observer.observe(c));
}

/* -------------------------------------------------------------
   5. PRODUCTS — render, filter, actions
   Clicking anywhere on a card (other than the Enquire button)
   opens the full product detail page: product.html?id=...
   ------------------------------------------------------------- */
function renderProducts(filter = "all") {
  const grid = document.getElementById("productGrid");
  const list = filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);

  grid.innerHTML = list.map((p) => `
    <article class="product-card reveal" data-id="${p.id}">
      <a class="product-card__link" href="product.html?id=${p.id}" aria-label="View ${p.name}">
        <div class="product-card__media">
          <span class="product-card__tag">${p.tag}</span>
          <span class="category-icon category-icon--${p.category}" aria-hidden="true"><i class="${CATEGORY_ICONS[p.category]}"></i></span>
          <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
        </div>
        <div class="product-card__body">
          <h3>${p.name}</h3>
          <p class="product-card__desc">${p.desc}</p>
          <div class="product-specs">
            ${p.specs.map((s) => `<span>${s}</span>`).join("")}
          </div>
        </div>
      </a>
      <div class="product-card__footer">
        <span class="product-price">${formatINR(p.price)}<small> / ${p.unit}</small></span>
        <div class="product-card__actions">
          <a class="btn btn-outline" href="product.html?id=${p.id}">View Details</a>
          <button class="btn btn-solid" data-enquire="${p.id}">Enquire</button>
        </div>
      </div>
    </article>
  `).join("");

  observeReveals();

  grid.querySelectorAll("[data-enquire]").forEach((btn) => {
    btn.addEventListener("click", () => prefillEnquiry(btn.dataset.enquire));
  });
}

function initProductFilters() {
  const chips = document.querySelectorAll(".filter-chip");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      renderProducts(chip.dataset.filter);
    });
  });

  document.querySelectorAll("[data-filter-link]").forEach((link) => {
    link.addEventListener("click", () => {
      const filter = link.dataset.filterLink;
      chips.forEach((c) => c.classList.toggle("is-active", c.dataset.filter === filter));
      renderProducts(filter);
    });
  });
}

/* Prefill + scroll to the enquiry form for a given product id.
   Used by the homepage "Enquire" button and by product.html
   (via a ?enquire=<id> redirect handled in applyPrefillFromURL). */
function prefillEnquiry(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;
  document.getElementById("interest").value = product.category;
  document.getElementById("message").value = `Hi, I'm interested in the ${product.name}. Could you share more details?`;
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
}

/* If the page was opened as index.html?enquire=<id>#contact
   (i.e. linked from a product detail page), prefill the form. */
function applyPrefillFromURL() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("enquire");
  if (id) prefillEnquiry(id);
}

/* -------------------------------------------------------------
   6. GALLERY
   ------------------------------------------------------------- */
function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  grid.innerHTML = GALLERY.map((g) => `
    <div class="gallery-item reveal ${g.big ? "span-2" : ""}">
      <img src="${g.image}" alt="${g.caption}" loading="lazy">
      <div class="gallery-item__caption">${g.caption}</div>
    </div>
  `).join("");
  observeReveals();
}

/* -------------------------------------------------------------
   7. TESTIMONIALS — continuous auto-scrolling marquee
   The track is rendered twice back-to-back and translated
   continuously; when it has scrolled exactly one set's width it
   snaps back to 0, giving a seamless infinite loop. Hovering (or
   focusing) pauses it so people can actually read a quote.
   ------------------------------------------------------------- */
function renderTestimonials() {
  const track = document.getElementById("tcTrack");
  const cardHTML = TESTIMONIALS.map((t) => `
    <div class="tc-card">
      <div class="tc-card__avatar">${t.initials}</div>
      <div>
        <div class="tc-card__stars">★★★★★</div>
        <p class="tc-card__quote">“${t.quote}”</p>
        <p class="tc-card__name">${t.role}</p>
        <p class="tc-card__meta">${t.meta}</p>
      </div>
    </div>
  `).join("");

  track.innerHTML = cardHTML + cardHTML;
}

function initTestimonialMarquee() {
  const wrap = document.getElementById("tcTrackWrap");
  const track = document.getElementById("tcTrack");
  if (!wrap || !track) return;

  const SPEED = 40; // pixels per second — tweak for faster/slower scroll
  let offset = 0;
  let paused = false;
  let lastTime = null;
  let singleSetWidth = 0;

  function measure() { singleSetWidth = track.scrollWidth / 2; }
  measure();
  window.addEventListener("resize", measure);

  function frame(now) {
    if (lastTime === null) lastTime = now;
    const delta = (now - lastTime) / 1000;
    lastTime = now;

    if (!paused && singleSetWidth > 0) {
      offset += SPEED * delta;
      if (offset >= singleSetWidth) offset -= singleSetWidth;
      track.style.transform = `translateX(-${offset}px)`;
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  wrap.addEventListener("mouseenter", () => { paused = true; });
  wrap.addEventListener("mouseleave", () => { paused = false; });
  wrap.addEventListener("focusin", () => { paused = true; });
  wrap.addEventListener("focusout", () => { paused = false; });
}

/* -------------------------------------------------------------
   8. ENQUIRY FORM — sends details to the owner via WhatsApp
   -------------------------------------------------------------
   How this works (no backend required):
   wa.me links open WhatsApp with a pre-filled message to a fixed
   number. We build that message from the form fields and open it
   in a new tab when the form is submitted. The visitor still has
   to hit "send" inside WhatsApp themselves — this is the standard,
   zero-backend way to route a form to WhatsApp.

   For a fully automatic flow (no visitor confirmation step), you
   need a backend calling the WhatsApp Business Cloud API instead —
   ask me when you're ready to set that up.
   ------------------------------------------------------------- */
function initEnquiryForm() {
  const form = document.getElementById("enquiryForm");
  const status = document.getElementById("formStatus");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      status.textContent = "Please fill in all required fields.";
      status.style.color = "#ff8a8a";
      return;
    }

    const data = {
      name: document.getElementById("fullName").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      pincode: document.getElementById("pincode").value.trim(),
      interest: document.getElementById("interest").value,
      message: document.getElementById("message").value.trim()
    };

    const lines = [
      "*New enquiry — Helion Solar*",
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Pincode: ${data.pincode}`,
      `Interested in: ${CATEGORY_LABELS[data.interest] || data.interest}`,
      data.message ? `Message: ${data.message}` : null
    ].filter(Boolean);

    const waLink = `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(waLink, "_blank", "noopener");

    status.textContent = "Opening WhatsApp with your details — hit send there to reach us.";
    status.style.color = "var(--teal)";
    showToast("Redirecting you to WhatsApp...");
    form.reset();
  });
}
