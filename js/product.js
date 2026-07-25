/* =============================================================
   HELION SOLAR — PRODUCT DETAIL PAGE SCRIPT
   -------------------------------------------------------------
   Requires js/data.js and js/common.js loaded first (see
   product.html). Reads the product id from the URL
   (product.html?id=res-solstice-6) and renders everything from
   the matching entry in the PRODUCTS array.
   ============================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

  renderProduct(product);
  renderRelated(product);
  initEnquireButton(product);
});

function renderProduct(product) {
  document.title = `${product.name} — K-Tech Solar`;
  document.getElementById("breadcrumbCurrent").textContent = product.name;
  document.getElementById("pdTag").textContent = product.tag;
  document.getElementById("pdName").textContent = product.name;
  document.getElementById("pdPrice").innerHTML = `${formatINR(product.price)}<small> / ${product.unit}</small>`;
  document.getElementById("pdLongDesc").textContent = product.longDesc || product.desc;

  document.getElementById("pdSpecs").innerHTML = product.specs.map((s) => `<span>${s}</span>`).join("");

  document.getElementById("pdHighlights").innerHTML = (product.highlights || []).map((h) => `
    <li><i class="fa-solid fa-circle-check"></i> ${h}</li>
  `).join("");

  // gallery
  const mainImg = document.getElementById("pdMainImage");
  mainImg.src = product.images[0];
  mainImg.alt = product.name;

  const thumbs = document.getElementById("pdThumbs");
  thumbs.innerHTML = product.images.map((img, i) => `
    <button type="button" class="${i === 0 ? "is-active" : ""}" data-img="${img}" aria-label="View image ${i + 1}">
      <img src="${img}" alt="${product.name} view ${i + 1}" loading="lazy">
    </button>
  `).join("");

  thumbs.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      mainImg.src = btn.dataset.img;
      thumbs.querySelectorAll("button").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
    });
  });
}

function renderRelated(product) {
  const related = PRODUCTS
    .filter((p) => p.id !== product.id && p.category === product.category)
    .concat(PRODUCTS.filter((p) => p.id !== product.id && p.category !== product.category))
    .slice(0, 3);

  const grid = document.getElementById("pdRelatedGrid");
  grid.innerHTML = related.map((p) => `
    <article class="product-card reveal">
      <a class="product-card__link" href="product.html?id=${p.id}" aria-label="View ${p.name}">
        <div class="product-card__media">
          <span class="product-card__tag">${p.tag}</span>
          <span class="category-icon category-icon--${p.category}" aria-hidden="true"><i class="${CATEGORY_ICONS[p.category]}"></i></span>
          <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
        </div>
        <div class="product-card__body">
          <h3>${p.name}</h3>
          <p class="product-card__desc">${p.desc}</p>
          <div class="product-specs">${p.specs.map((s) => `<span>${s}</span>`).join("")}</div>
        </div>
      </a>
      <div class="product-card__footer">
        <span class="product-price">${formatINR(p.price)}<small> / ${p.unit}</small></span>
        <div class="product-card__actions">
          <a class="btn btn-solid" href="product.html?id=${p.id}">View Details</a>
        </div>
      </div>
    </article>
  `).join("");

  observeReveals();
}

/* "Enquire About This Product" sends the visitor back to the
   homepage enquiry form with this product pre-selected, via
   index.html?enquire=<id>#contact (handled in js/script.js). */
function initEnquireButton(product) {
  document.getElementById("pdEnquireBtn").addEventListener("click", () => {
    window.location.href = `index.html?enquire=${product.id}#contact`;
  });
}
