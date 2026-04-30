(function () {
  function init() {
    const openBtn = document.getElementById("nav-open");
    const closeBtn = document.getElementById("nav-close");
    const panel = document.getElementById("nav-mobile");
    if (!openBtn || !panel) return;

    function open() {
      panel.classList.remove("hidden");
      panel.setAttribute("aria-hidden", "false");
      openBtn.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }
    function close() {
      panel.classList.add("hidden");
      panel.setAttribute("aria-hidden", "true");
      openBtn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }

    openBtn.addEventListener("click", function () {
      if (panel.classList.contains("hidden")) open();
      else close();
    });
    if (closeBtn) closeBtn.addEventListener("click", close);
    panel.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", close);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
