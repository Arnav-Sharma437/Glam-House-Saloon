(function () {
  function boot() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const fast = window.matchMedia("(max-width: 767px)").matches;
    const dur = fast ? 0.45 : 0.75;
    const dy = fast ? 22 : 36;

    gsap.utils.toArray("[data-reveal]").forEach(function (el) {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        y: dy,
        opacity: 0,
        duration: dur,
        ease: "power3.out",
      });
    });

    if (!window.matchMedia("(max-width: 1023px)").matches) {
      gsap.utils.toArray("[data-parallax]").forEach(function (el) {
        const amt = parseFloat(el.getAttribute("data-parallax")) || 0.08;
        gsap.to(el, {
          y: amt * 120,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }

    gsap.utils.toArray("[data-text-reveal]").forEach(function (el, i) {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 85%" },
        y: fast ? 16 : 24,
        opacity: 0,
        duration: fast ? 0.42 : 0.7,
        ease: "power3.out",
        delay: fast ? i * 0.03 : i * 0.05,
      });
    });

    document.querySelectorAll(".btn-glam").forEach(function (btn) {
      btn.addEventListener("mouseenter", function () {
        gsap.to(btn, { scale: 1.03, duration: 0.25, ease: "power2.out" });
      });
      btn.addEventListener("mouseleave", function () {
        gsap.to(btn, { scale: 1, duration: 0.3, ease: "power2.out" });
      });
    });

    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        ScrollTrigger.refresh();
      }, 200);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
