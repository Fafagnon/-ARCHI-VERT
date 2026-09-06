/* ARCHI-VERT — scripts du site (vanilla JS, sans dépendance) */

document.addEventListener("DOMContentLoaded", function () {
  /* ---------- Navigation mobile ---------- */
  var toggle = document.querySelector(".nav__toggle");
  var panel = document.querySelector(".nav__panel");
  var scrim = document.querySelector(".nav__scrim");

  function closeNav() {
    if (!toggle || !panel) return;
    toggle.setAttribute("aria-expanded", "false");
    panel.classList.remove("is-open");
    if (scrim) scrim.classList.remove("is-open");
    document.body.classList.remove("nav-open");
  }

  function openNav() {
    toggle.setAttribute("aria-expanded", "true");
    panel.classList.add("is-open");
    if (scrim) scrim.classList.add("is-open");
    document.body.classList.add("nav-open");
  }

  if (toggle && panel) {
    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      isOpen ? closeNav() : openNav();
    });
    if (scrim) scrim.addEventListener("click", closeNav);
    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 860) closeNav();
    });
  }

  /* ---------- Carrousel de témoignages ---------- */
  var track = document.querySelector(".testimonial-slides");
  if (track) {
    var slides = Array.prototype.slice.call(track.children);
    var dotsWrap = document.querySelector(".testimonial-dots");
    var prevBtn = document.querySelector('[data-testimonial="prev"]');
    var nextBtn = document.querySelector('[data-testimonial="next"]');
    var index = 0;
    var autoplayTimer = null;
    var AUTOPLAY_MS = 6000;

    slides.forEach(function (_, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", "Afficher le témoignage " + (i + 1));
      dot.setAttribute("aria-current", i === 0 ? "true" : "false");
      dot.addEventListener("click", function () {
        goTo(i, true);
      });
      if (dotsWrap) dotsWrap.appendChild(dot);
    });

    function update() {
      track.style.transform = "translateX(-" + index * 100 + "%)";
      if (dotsWrap) {
        Array.prototype.slice.call(dotsWrap.children).forEach(function (dot, i) {
          dot.setAttribute("aria-current", i === index ? "true" : "false");
        });
      }
    }

    function goTo(i, userInitiated) {
      index = (i + slides.length) % slides.length;
      update();
      if (userInitiated) restartAutoplay();
    }

    function restartAutoplay() {
      clearInterval(autoplayTimer);
      autoplayTimer = setInterval(function () { goTo(index + 1); }, AUTOPLAY_MS);
    }

    if (prevBtn) prevBtn.addEventListener("click", function () { goTo(index - 1, true); });
    if (nextBtn) nextBtn.addEventListener("click", function () { goTo(index + 1, true); });

    var testimonialsSection = document.getElementById("temoignages");
    if (testimonialsSection) {
      testimonialsSection.addEventListener("mouseenter", function () { clearInterval(autoplayTimer); });
      testimonialsSection.addEventListener("mouseleave", restartAutoplay);
    }

    restartAutoplay();
  }

  /* ---------- Animations d'apparition au scroll ---------- */
  var revealItems = document.querySelectorAll("[data-reveal]");
  if (revealItems.length) {
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
      revealItems.forEach(function (el) { io.observe(el); });
    } else {
      revealItems.forEach(function (el) { el.classList.add("is-visible"); });
    }
  }

  /* ---------- Formulaire de contact (mailto) ---------- */
  var form = document.querySelector("#contact-form");
  if (form) {
    var status = form.querySelector(".form-status");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.querySelector("#name").value.trim();
      var email = form.querySelector("#email").value.trim();
      var phone = form.querySelector("#phone").value.trim();
      var message = form.querySelector("#message").value.trim();

      if (!name || !email || !message) {
        if (status) {
          status.textContent = "Merci de renseigner votre nom, votre email et votre message.";
          status.dataset.state = "error";
        }
        return;
      }

      var subject = "Demande de contact — " + name;
      var bodyLines = [
        "Nom : " + name,
        "Email : " + email,
        "Téléphone : " + (phone || "non renseigné"),
        "",
        message
      ];
      var mailto =
        "mailto:contact@archi-vert.tg" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(bodyLines.join("\n"));

      window.location.href = mailto;

      if (status) {
        status.textContent = "Votre messagerie va s'ouvrir avec votre message pré-rempli.";
        status.dataset.state = "ok";
      }
    });
  }

  /* ---------- Filtre du portfolio ---------- */
  var filterBar = document.querySelector(".filter-bar");
  if (filterBar) {
    var filterButtons = Array.prototype.slice.call(filterBar.querySelectorAll(".filter-btn"));
    var items = Array.prototype.slice.call(document.querySelectorAll(".portfolio-item"));

    function applyFilter(category) {
      items.forEach(function (item) {
        var match = category === "tous" || item.dataset.category === category;
        item.classList.toggle("is-visible", match);
      });
    }

    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterButtons.forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
        btn.setAttribute("aria-pressed", "true");
        applyFilter(btn.dataset.filter);
      });
    });

    applyFilter("tous");
  }
});