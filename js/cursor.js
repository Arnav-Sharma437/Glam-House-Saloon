(function () {
  function init() {
    if (window.matchMedia("(max-width: 1023px)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const body = document.body;
    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");
    if (!dot || !ring) return;

    body.classList.add("use-custom-cursor");

    let mx = 0,
      my = 0;
    let rx = 0,
      ry = 0;
    let magnetic = null;
    let raf = 0;

    const magneticSelectors = "a, button, [data-magnetic], .ba-slider__handle";

    function loop() {
      const targetX = magnetic ? magnetic.x : mx;
      const targetY = magnetic ? magnetic.y : my;
      rx += (targetX - rx) * 0.18;
      ry += (targetY - ry) * 0.18;
      dot.style.transform = "translate3d(" + mx + "px," + my + "px,0)";
      ring.style.transform = "translate3d(" + rx + "px," + ry + "px,0)";
      raf = requestAnimationFrame(loop);
    }

    document.addEventListener(
      "mousemove",
      function (e) {
        mx = e.clientX;
        my = e.clientY;
        if (!raf) raf = requestAnimationFrame(loop);
      },
      { passive: true }
    );

    document.querySelectorAll(magneticSelectors).forEach(function (el) {
      el.addEventListener(
        "mouseenter",
        function () {
          ring.classList.add("is-hover");
        },
        { passive: true }
      );
      el.addEventListener(
        "mouseleave",
        function () {
          ring.classList.remove("is-hover", "is-magnetic");
          magnetic = null;
        },
        { passive: true }
      );
    });

    document.querySelectorAll("a, button, [data-magnetic]").forEach(function (el) {
      el.addEventListener(
        "mousemove",
        function (e) {
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const pull = 0.12;
          magnetic = {
            x: cx + (e.clientX - cx) * (1 + pull),
            y: cy + (e.clientY - cy) * (1 + pull),
          };
          ring.classList.add("is-magnetic");
        },
        { passive: true }
      );
      el.addEventListener(
        "mouseleave",
        function () {
          magnetic = null;
          ring.classList.remove("is-magnetic");
        },
        { passive: true }
      );
    });

    raf = requestAnimationFrame(loop);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
