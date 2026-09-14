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

  /* ---------- Correct initial scroll position when the URL has a hash ---------- */
  /* Browsers jump to a URL fragment before web fonts/images finish loading and
     the page reaches its final height, so a shared link like /#contact can land
     in the wrong place once layout settles. Re-correct once everything is loaded. */
  if (window.location.hash && window.location.hash.length > 1) {
    var correctHashScroll = function () {
      var target = document.querySelector(window.location.hash);
      if (!target) return;
      // html has scroll-behavior: smooth globally, which scrollIntoView's
      // behavior:"auto" would otherwise defer to (animating this correction
      // over a potentially long distance). Force a genuinely instant jump.
      var previousScrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      // Relies on the section[id]{ scroll-margin-top } rule in style.css
      // to clear the fixed header, instead of duplicating that offset here.
      target.scrollIntoView({ behavior: "auto", block: "start" });
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
    };
    // A short delay lets the browser's own (often mistimed) fragment scroll
    // and any late layout shifts (web fonts, images) finish first, so this
    // correction is the one that actually sticks.
    var runCorrection = function () {
      window.setTimeout(correctHashScroll, 60);
    };
    // By the time this script runs, document.readyState may already be
    // "complete" (the load event already fired), so addEventListener("load")
    // alone would never run. Cover both cases.
    if (document.readyState === "complete") {
      runCorrection();
    } else {
      window.addEventListener("load", runCorrection);
    }
  }

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

  /* ---------- Contact form ---------- */
  var contactForm = document.getElementById("contactForm");
  if (contactForm) {
    /*
     * No custom backend exists for this static site, and this form must never
     * report success it can't verify. It submits to a hosted form endpoint
     * (Formspree-compatible: POST + Accept: application/json, JSON error body).
     *
     * To activate: create a form at https://formspree.io (or any compatible
     * provider), then replace YOUR_FORM_ID below with the real endpoint id.
     * Until that's done, submissions are correctly blocked with a message
     * pointing people to the direct email address instead of a fake success.
     */
    var CONTACT_FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

    var submitBtn = document.getElementById("contactSubmit");
    var statusEl = document.getElementById("contactStatus");

    var validators = {
      name: function (value) {
        return value.trim().length > 0 ? "" : "Please enter your name.";
      },
      email: function (value) {
        var trimmed = value.trim();
        if (!trimmed) return "Please enter your email.";
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(trimmed) ? "" : "Please enter a valid email address.";
      },
      message: function (value) {
        var trimmed = value.trim();
        if (!trimmed) return "Please enter a message.";
        return trimmed.length >= 10 ? "" : "Message should be at least 10 characters.";
      },
    };

    function fieldWrapper(field) {
      return field.closest(".form-field");
    }

    function showFieldError(field, message) {
      var wrapper = fieldWrapper(field);
      if (!wrapper) return;
      var errorEl = wrapper.querySelector(".form-error");
      if (errorEl) errorEl.textContent = message;
      wrapper.classList.toggle("has-error", !!message);
    }

    function validateField(field) {
      var validator = validators[field.name];
      if (!validator) return true;
      var message = validator(field.value);
      showFieldError(field, message);
      return !message;
    }

    ["name", "email", "message"].forEach(function (name) {
      var field = contactForm.elements[name];
      if (!field) return;
      field.addEventListener("blur", function () {
        validateField(field);
      });
      field.addEventListener("input", function () {
        var wrapper = fieldWrapper(field);
        if (wrapper && wrapper.classList.contains("has-error")) {
          validateField(field);
        }
      });
    });

    function setStatus(message, state) {
      statusEl.textContent = message;
      statusEl.className = "form-status" + (state ? " is-" + state : "");
    }

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Honeypot: bots fill every field, real visitors never see this one.
      var honeypot = contactForm.elements["_gotcha"];
      if (honeypot && honeypot.value) return;

      var isValid = ["name", "email", "message"].reduce(function (allValid, name) {
        var field = contactForm.elements[name];
        var fieldValid = validateField(field);
        return allValid && fieldValid;
      }, true);

      if (!isValid) {
        setStatus("Please fix the highlighted fields.", "error");
        return;
      }

      if (CONTACT_FORM_ENDPOINT.indexOf("YOUR_FORM_ID") !== -1) {
        setStatus(
          "This form isn't connected to an email service yet — please email hello@ilens.co directly for now.",
          "error"
        );
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";
      setStatus("", "");

      fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" },
      })
        .then(function (response) {
          if (response.ok) {
            contactForm.reset();
            setStatus("Thank you — your message has been sent. We'll be in touch soon.", "success");
            return;
          }
          return response.json().then(function (data) {
            var message =
              data && data.errors && data.errors.length
                ? data.errors.map(function (err) { return err.message; }).join(" ")
                : "Something went wrong sending your message.";
            throw new Error(message);
          });
        })
        .catch(function (err) {
          var message = err && err.message ? err.message : "Something went wrong sending your message.";
          setStatus(message + " Please email hello@ilens.co directly.", "error");
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = "Send Message";
        });
    });
  }

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
