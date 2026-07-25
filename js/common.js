/* =============================================================
   HELION SOLAR — COMMON SCRIPT
   -------------------------------------------------------------
   Loaded on every page, before the page-specific script
   (js/script.js on index.html, js/product.js on product.html).
   Handles: preloader, theme toggle, sticky nav, mobile menu,
   scroll reveal, toast, back-to-top.
   ============================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initPreloader();
  initThemeToggle();
  initStickyNav();
  initMobileMenu();
  initScrollReveal();
  initBackToTop();
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/* PRELOADER */
function initPreloader() {
  const pre = document.getElementById("preloader");
  if (!pre) return;
  window.addEventListener("load", () => setTimeout(() => pre.classList.add("is-hidden"), 300));
  setTimeout(() => pre.classList.add("is-hidden"), 1800);
}

/* THEME TOGGLE (light / dark) — the inline <script> in <head> already
   applies the saved theme before paint to avoid a flash of the wrong
   theme; this just wires the button and keeps the icon in sync. */
function initThemeToggle() {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;
  const icon = btn.querySelector("i");

  function reflectIcon() {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    icon.className = isLight ? "fa-solid fa-moon" : "fa-solid fa-sun";
    btn.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
  }
  reflectIcon();

  btn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    const next = current === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("helion-theme", next);
    reflectIcon();
  });
}

/* STICKY NAV + MOBILE MENU */
function initStickyNav() {
  const header = document.getElementById("siteHeader");
  if (!header) return;
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initMobileMenu() {
  const header = document.getElementById("siteHeader");
  const hamburger = document.getElementById("hamburger");
  if (!header || !hamburger) return;

  hamburger.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-menu-open");
    hamburger.classList.toggle("is-active", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".has-dropdown > a").forEach((link) => {
    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 860) {
        e.preventDefault();
        link.parentElement.classList.toggle("is-open");
      }
    });
  });

  document.querySelectorAll(".nav-links a, .nav-actions a").forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("is-menu-open");
      hamburger.classList.remove("is-active");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });
}

/* SCROLL REVEAL — used by any element with class="reveal" */
let revealObserver;
function initScrollReveal() {
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  observeReveals();
}
function observeReveals() {
  document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => {
    if (revealObserver) revealObserver.observe(el);
  });
}

/* TOAST */
let toastTimer;
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3200);
}

/* BACK TO TOP */
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;
  window.addEventListener("scroll", () => {
    btn.classList.toggle("is-visible", window.scrollY > 600);
  }, { passive: true });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}
