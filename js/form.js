(function () {
  function init() {
    const form = document.getElementById("contact-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const fd = new FormData(form);
      const name = (fd.get("name") || "").toString().trim();
      const phone = (fd.get("phone") || "").toString().trim();
      const service = (fd.get("service") || "").toString().trim();
      const text =
        "Hi Glam House!\n\nName: " + name + "\nPhone: " + phone + "\nService / interest: " + service;
      const num = (window.GLAM_HOUSE && window.GLAM_HOUSE.WHATSAPP) || "";
      window.open("https://wa.me/" + num + "?text=" + encodeURIComponent(text), "_blank", "noopener,noreferrer");
      form.reset();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
