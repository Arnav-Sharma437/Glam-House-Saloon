(function () {
  const STORAGE_KEY = "glam-house-theme";
  const html = document.documentElement;

  function applyTheme(mode) {
    const isDark = mode === "dark";
    html.classList.toggle("dark", isDark);
    document.body.classList.add("theme-transitioning");
    window.setTimeout(function () {
      document.body.classList.remove("theme-transitioning");
    }, 500);
  }

  function getStoredOrPreferred() {
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      if (s === "light" || s === "dark") return s;
    } catch (e) {}
    return "dark";
  }

  function initToggle() {
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;
    btn.setAttribute("aria-pressed", html.classList.contains("dark") ? "true" : "false");
    btn.addEventListener("click", function () {
      const next = html.classList.contains("dark") ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (e) {}
      btn.setAttribute("aria-pressed", next === "dark" ? "true" : "false");
    });
  }

  applyTheme(getStoredOrPreferred());
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initToggle);
  } else {
    initToggle();
  }
})();
