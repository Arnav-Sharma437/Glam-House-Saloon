(function () {
  function openLightbox(src, alt) {
    let lb = document.getElementById("lightbox-root");
    if (!lb) {
      lb = document.createElement("div");
      lb.id = "lightbox-root";
      lb.className = "lightbox";
      lb.innerHTML =
        '<button type="button" class="lightbox__close" aria-label="Close">&times;</button><img class="lightbox__img" alt="">';
      document.body.appendChild(lb);
      lb.querySelector(".lightbox__close").addEventListener("click", closeLightbox);
      lb.addEventListener("click", function (e) {
        if (e.target === lb) closeLightbox();
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeLightbox();
      });
    }
    const img = lb.querySelector(".lightbox__img");
    img.src = src;
    img.alt = alt || "";
    lb.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    const lb = document.getElementById("lightbox-root");
    if (lb) {
      lb.classList.remove("is-open");
      document.body.style.overflow = "";
    }
  }

  function init() {
    document.querySelectorAll("[data-lightbox]").forEach(function (el) {
      el.addEventListener("click", function (e) {
        const t = e.currentTarget;
        const src = t.getAttribute("data-src") || t.getAttribute("src");
        const img = t.querySelector("img");
        const alt = (img && img.getAttribute("alt")) || t.getAttribute("aria-label") || "";
        if (src) openLightbox(src, alt);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
