(function () {
  function waUrl(text) {
    const num = (window.GLAM_HOUSE && window.GLAM_HOUSE.WHATSAPP) || "";
    const enc = encodeURIComponent(text || "Hi! I want to book an appointment");
    return "https://wa.me/" + num + "?text=" + enc;
  }

  function bindLinks() {
    document.querySelectorAll("[data-wa]").forEach(function (el) {
      const preset = el.getAttribute("data-wa");
      const messages = {
        booking: "Hi! I want to book an appointment at Glam House Salon.",
        consult: "Hi! I'd like a free consultation at Glam House Salon.",
        course: "Hi! I want information about academy courses at Glam House Salon.",
        pricing: "Hi! I'd like to know pricing for your services.",
        enroll: "Hi! I want to enroll in the Glam House Academy.",
        default: "Hi! I want to book an appointment",
      };
      const text = messages[preset] || messages.default;
      if (el.tagName === "A") {
        el.href = waUrl(text);
        el.target = "_blank";
        el.rel = "noopener noreferrer";
      }
    });
  }

  function initFab() {
    const fab = document.querySelector("[data-wa-fab]");
    if (!fab) return;
    const toggle = fab.querySelector("[data-wa-fab-toggle]");
    const panel = fab.querySelector("[data-wa-fab-panel]");
    const mainBtn = fab.querySelector("[data-wa-fab-main]");

    function openPanel() {
      panel.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
    }
    function closePanel() {
      panel.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      if (panel.classList.contains("is-open")) closePanel();
      else openPanel();
    });

    document.addEventListener("click", function () {
      closePanel();
    });
    panel.addEventListener("click", function (e) {
      e.stopPropagation();
    });

    if (mainBtn) {
      mainBtn.href = waUrl("Hi! I want to book an appointment");
      mainBtn.target = "_blank";
      mainBtn.rel = "noopener noreferrer";
    }

    fab.querySelectorAll("[data-wa-preset]").forEach(function (link) {
      const key = link.getAttribute("data-wa-preset");
      const map = {
        booking: "Hi! I want to book an appointment",
        course: "Hi! I want course information and enrollment details.",
        pricing: "Hi! I'd like pricing for salon services.",
      };
      link.href = waUrl(map[key] || map.booking);
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      bindLinks();
      initFab();
    });
  } else {
    bindLinks();
    initFab();
  }

  window.glamWaUrl = waUrl;
})();
