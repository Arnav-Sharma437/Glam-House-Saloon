(function () {
  if (typeof gsap === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var block = document.querySelector(".hero-title-block");
  if (!block) return;

  gsap.from(block.children, {
    y: 28,
    opacity: 0,
    duration: 0.85,
    stagger: 0.1,
    ease: "power3.out",
    delay: 0.15,
  });
})();
