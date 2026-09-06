/* =========================================================================
   ARCHI-VERT — site-enhancements.js
   Script ADDITIF : à charger APRES js/main.js.
   Contient : le carrousel de témoignages (autoplay) et les animations
   d'apparition au scroll. Ne touche à rien d'autre de votre site.
   ========================================================================= */

(function () {
  "use strict";

  function initTestimonialCarousel() {
    var track = document.querySelector(".testimonial-slides");
    if (!track) return;

    var slides = Array.prototype.slice.call(track.children);
    if (!slides.length) return;

    var dotsWrap = document.querySelector(".testimonial-dots");
    var prevOriginal = document.querySelector('[data-testimonial="prev"]');
    var nextOriginal = document.querySelector('[data-testimonial="next"]');
    if (!prevOriginal || !nextOriginal) return;

    /* Si un ancien script gérait déjà les clics sur ces flèches, on les
       remplace par un clone identique (mêmes attributs, même contenu) pour
       repartir sans gestionnaire concurrent, avant d'y attacher les nôtres. */
    var prevBtn = prevOriginal.cloneNode(true);
    var nextBtn = nextOriginal.cloneNode(true);
    prevOriginal.parentNode.replaceChild(prevBtn, prevOriginal);
    nextOriginal.parentNode.replaceChild(nextBtn, nextOriginal);

    var index = 0;
    var timer = null;
    var AUTOPLAY_MS = 6000;
    var dots = [];

    if (dotsWrap) {
      dotsWrap.innerHTML = "";
      slides.forEach(function (_, i) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("role", "tab");
        dot.setAttribute("aria-label", "Aller au t\u00e9moignage " + (i + 1));
        dot.addEventListener("click", function () {
          goTo(i, true);
        });
        dotsWrap.appendChild(dot);
      });
      dots = Array.prototype.slice.call(dotsWrap.children);
    }

    function render() {
      track.style.transform = "translateX(-" + index * 100 + "%)";
      dots.forEach(function (d, i) {
        d.classList.toggle("is-active", i === index);
      });
    }

    function goTo(i, userInitiated) {
      index = (i + slides.length) % slides.length;
      render();
      if (userInitiated) restart();
    }

    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    function restart() {
      clearInterval(timer);
      timer = setInterval(next, AUTOPLAY_MS);
    }

    prevBtn.addEventListener("click", function () { goTo(index - 1, true); });
    nextBtn.addEventListener("click", function () { goTo(index + 1, true); });

    var section = document.getElementById("temoignages");
    if (section) {
      section.addEventListener("mouseenter", function () { clearInterval(timer); });
      section.addEventListener("mouseleave", restart);
    }

    render();
    restart();
  }

  function initScrollReveal() {
    var items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    items.forEach(function (el) { io.observe(el); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTestimonialCarousel();
    initScrollReveal();
  });
})();
