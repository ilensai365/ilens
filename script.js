/* =========================================================
   iLens — Interactions
   ========================================================= */

(function () {
  "use strict";

  var header = document.getElementById("siteHeader");
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");
  var navLinks = document.querySelectorAll(".nav-link");
  var yearEl = document.getElementById("year");

  /* ---------- Footer year ---------- */
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Sticky header shadow/border on scroll ---------- */
  function onScroll() {
    if (window.scrollY > 12) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  function closeNav() {
    mainNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
    document.body.style.overflow = "";
  }

  function openNav() {
    mainNav.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close menu");
    document.body.style.overflow = "hidden";
  }

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.contains("is-open");
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });
  }

  /* Close mobile nav when a link is clicked, and set active state */
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      closeNav();
    });
  });

  /* Close mobile nav with Escape key */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && mainNav.classList.contains("is-open")) {
      closeNav();
      navToggle.focus();
    }
  });

  /* ---------- Smooth scroll for in-page links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var targetId = link.getAttribute("href");
      if (targetId.length < 2) return;
      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      var headerHeight = header ? header.offsetHeight : 0;
      var targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - headerHeight + 1;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      history.pushState(null, "", targetId);
    });
  });

  /* ---------- Active nav link highlighting on scroll ---------- */
  var sections = Array.prototype.slice
    .call(navLinks)
    .map(function (link) {
      var id = link.getAttribute("href");
      if (!id || id.charAt(0) !== "#" || id.length < 2) return null;
      var section = document.querySelector(id);
      return section ? { link: link, section: section } : null;
    })
    .filter(Boolean);

  function updateActiveLink() {
    var scrollPos = window.scrollY + (header ? header.offsetHeight : 0) + 40;
    var current = null;

    sections.forEach(function (item) {
      if (item.section.offsetTop <= scrollPos) {
        current = item;
      }
    });

    navLinks.forEach(function (l) {
      l.classList.remove("active");
    });
    if (current) {
      current.link.classList.add("active");
    }
  }
  updateActiveLink();
  window.addEventListener("scroll", updateActiveLink, { passive: true });

  /* ---------- Scroll reveal animation ---------- */
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    revealEls.forEach(function (el, i) {
      el.style.transitionDelay = (i % 3) * 80 + "ms";
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
