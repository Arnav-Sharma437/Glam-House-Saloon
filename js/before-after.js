(function () {
  function initSlider(root) {
    const afterLayer = root.querySelector(".ba-slider__layer--after");
    const handle = root.querySelector(".ba-slider__handle");
    const knob = root.querySelector(".ba-slider__knob");
    if (!afterLayer || !handle) return;

    let pct = 50;
    let dragging = false;

    function setPosition(p) {
      pct = Math.max(4, Math.min(96, p));
      afterLayer.style.clipPath = "inset(0 0 0 " + pct + "%)";
      handle.style.left = pct + "%";
    }

    function fromClientX(clientX) {
      const rect = root.getBoundingClientRect();
      return ((clientX - rect.left) / rect.width) * 100;
    }

    function onDown(e) {
      dragging = true;
      root.setPointerCapture(e.pointerId);
      setPosition(fromClientX(e.clientX));
    }

    function onMove(e) {
      if (!dragging) return;
      setPosition(fromClientX(e.clientX));
    }

    function onUp(e) {
      if (!dragging) return;
      dragging = false;
      try {
        root.releasePointerCapture(e.pointerId);
      } catch (err) {}
    }

    root.addEventListener("pointerdown", onDown);
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerup", onUp);
    root.addEventListener("pointercancel", onUp);

    if (knob) {
      knob.style.pointerEvents = "none";
    }

    setPosition(pct);
  }

  function initAll() {
    document.querySelectorAll(".ba-slider").forEach(initSlider);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();
