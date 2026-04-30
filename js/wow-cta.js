(function () {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll(".promo-wow").forEach(function (promo) {
    var inner = promo.querySelector(".promo-wow__inner");
    var headline = promo.querySelector(".promo-headline");
    var sub = promo.querySelector(".promo-sub");
    var btn = promo.querySelector(".promo-btn");

    var tl = gsap.timeline({
      scrollTrigger: { trigger: promo, start: "top 82%", toggleActions: "play none none none" },
      defaults: { ease: "power3.out" },
    });

    if (inner) tl.from(inner, { scale: 0.94, opacity: 0, duration: 0.75 }, 0);
    if (headline) tl.from(headline, { y: 36, opacity: 0, duration: 0.65 }, 0.12);
    if (sub) tl.from(sub, { y: 20, opacity: 0, duration: 0.5 }, 0.22);
    if (btn) tl.from(btn, { y: 16, opacity: 0, scale: 0.92, duration: 0.55 }, 0.32);
  });
})();
