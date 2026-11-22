/* ==========================================================================
   ECHA Pasikudah — Shared front-end behaviour
   Vanilla JavaScript only. No build step required.
   ========================================================================== */
(function () {
  "use strict";

  /* ----------------------------------------------------------------------
     1. Sticky header state, back-to-top button, footer year
     ---------------------------------------------------------------------- */
  function initChrome() {
    var header = document.querySelector(".site-header");
    var toTop = document.querySelector(".to-top");

    function onScroll() {
      var y = window.pageYOffset || document.documentElement.scrollTop;
      if (header) {
        header.classList.toggle("is-scrolled", y > 8);
      }
      if (toTop) {
        toTop.classList.toggle("is-visible", y > 520);
      }
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    var yearEls = document.querySelectorAll(".js-year");
    for (var i = 0; i < yearEls.length; i++) {
      yearEls[i].textContent = new Date().getFullYear();
    }
  }

  /* ----------------------------------------------------------------------
     2. Active navigation highlighting (matches the current file name)
     ---------------------------------------------------------------------- */
  function initActiveNav() {
    var current = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".navbar .nav-link, .navbar .dropdown-item").forEach(function (link) {
      var match = link.getAttribute("data-match") || link.getAttribute("href") || "";
      if (!match || match.charAt(0) === "#") {
        return;
      }
      var targets = match.split(" ").filter(Boolean);
      if (targets.indexOf(current) !== -1) {
        link.classList.add("active");
        if (link.classList.contains("dropdown-toggle")) {
          link.setAttribute("aria-current", "page");
        }
      }
    });
  }

  /* ----------------------------------------------------------------------
     3. Smooth scrolling for same-page anchors (respects sticky header)
     ---------------------------------------------------------------------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (event) {
        var hash = link.getAttribute("href");
        if (!hash || hash === "#" || link.hasAttribute("data-bs-toggle")) {
          return;
        }
        var target = document.querySelector(hash);
        if (!target) {
          return;
        }
        event.preventDefault();
        var header = document.querySelector(".site-header");
        var offset = header ? header.offsetHeight + 18 : 0;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: "smooth" });

        if (history.replaceState) {
          history.replaceState(null, "", hash);
        }
      });
    });
  }

  /* ----------------------------------------------------------------------
     4. Close the mobile menu after a link is chosen
     ---------------------------------------------------------------------- */
  function initMobileNav() {
    var collapseEl = document.getElementById("mainNav");
    if (!collapseEl || !window.bootstrap) {
      return;
    }
    var instance = window.bootstrap.Collapse.getOrCreateInstance(collapseEl, { toggle: false });

    collapseEl.querySelectorAll("a").forEach(function (link) {
      if (link.classList.contains("dropdown-toggle")) {
        return;
      }
      link.addEventListener("click", function () {
        if (window.innerWidth < 992 && collapseEl.classList.contains("show")) {
          instance.hide();
        }
      });
    });
  }

  /* ----------------------------------------------------------------------
     5. Reveal-on-scroll (subtle, disabled for reduced motion)
     ---------------------------------------------------------------------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) {
      return;
    }

    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ----------------------------------------------------------------------
     6. Gallery lightbox
     ---------------------------------------------------------------------- */
  function initLightbox() {
    var triggers = Array.prototype.slice.call(
      document.querySelectorAll(".gallery-item[data-full]")
    );
    if (!triggers.length) {
      return;
    }

    var visible = [];
    var index = 0;
    var lastFocused = null;

    var box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Photograph viewer");
    box.innerHTML =
      '<button type="button" class="lightbox__btn lightbox__close" aria-label="Close viewer"><i class="bi bi-x-lg" aria-hidden="true"></i></button>' +
      '<button type="button" class="lightbox__btn lightbox__prev" aria-label="Previous photograph"><i class="bi bi-arrow-left" aria-hidden="true"></i></button>' +
      '<button type="button" class="lightbox__btn lightbox__next" aria-label="Next photograph"><i class="bi bi-arrow-right" aria-hidden="true"></i></button>' +
      '<figure class="lightbox__figure"><img class="lightbox__img" src="" alt="" /><figcaption class="lightbox__caption"></figcaption></figure>';
    document.body.appendChild(box);

    var img = box.querySelector(".lightbox__img");
    var caption = box.querySelector(".lightbox__caption");

    function collectVisible() {
      visible = triggers.filter(function (item) {
        return !item.classList.contains("is-hidden");
      });
    }

    function show(position) {
      if (!visible.length) {
        return;
      }
      index = (position + visible.length) % visible.length;
      var item = visible[index];
      img.src = item.getAttribute("data-full");
      img.alt = item.getAttribute("data-alt") || "";
      caption.textContent = item.getAttribute("data-caption") || "";
    }

    function open(item) {
      collectVisible();
      var position = visible.indexOf(item);
      show(position < 0 ? 0 : position);
      lastFocused = document.activeElement;
      box.classList.add("is-open");
      document.body.classList.add("no-scroll");
      box.querySelector(".lightbox__close").focus();
    }

    function close() {
      box.classList.remove("is-open");
      document.body.classList.remove("no-scroll");
      img.src = "";
      if (lastFocused) {
        lastFocused.focus();
      }
    }

    triggers.forEach(function (item) {
      item.addEventListener("click", function (event) {
        event.preventDefault();
        open(item);
      });
    });

    box.querySelector(".lightbox__close").addEventListener("click", close);
    box.querySelector(".lightbox__prev").addEventListener("click", function () {
      show(index - 1);
    });
    box.querySelector(".lightbox__next").addEventListener("click", function () {
      show(index + 1);
    });

    box.addEventListener("click", function (event) {
      if (event.target === box) {
        close();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (!box.classList.contains("is-open")) {
        return;
      }
      if (event.key === "Escape") {
        close();
      } else if (event.key === "ArrowLeft") {
        show(index - 1);
      } else if (event.key === "ArrowRight") {
        show(index + 1);
      }
    });
  }

  /* ----------------------------------------------------------------------
     7. Gallery category filters
     ---------------------------------------------------------------------- */
  function initGalleryFilter() {
    var buttons = document.querySelectorAll(".filter-btn[data-filter]");
    if (!buttons.length) {
      return;
    }

    var items = document.querySelectorAll(".gallery-item[data-category]");
    var countEl = document.querySelector(".js-gallery-count");

    function apply(filter, button) {
      buttons.forEach(function (btn) {
        btn.classList.toggle("is-active", btn === button);
        btn.setAttribute("aria-pressed", btn === button ? "true" : "false");
      });

      var shown = 0;
      items.forEach(function (item) {
        var categories = (item.getAttribute("data-category") || "").split(" ");
        var match = filter === "all" || categories.indexOf(filter) !== -1;
        item.classList.toggle("is-hidden", !match);
        if (match) {
          shown++;
        }
      });

      if (countEl) {
        countEl.textContent = shown + (shown === 1 ? " photograph" : " photographs");
      }
    }

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        apply(button.getAttribute("data-filter"), button);
      });
    });
  }

  /* ----------------------------------------------------------------------
     8. Contact form validation (static site: no message delivery)
     ---------------------------------------------------------------------- */
  function initContactForm() {
    var form = document.getElementById("contactForm");
    if (!form) {
      return;
    }

    var status = document.getElementById("formStatus");

    function fieldError(field) {
      var value = field.value.trim();
      if (!value) {
        return field.required ? "This field is required." : "";
      }
      if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
        return "Please enter a valid email address.";
      }
      if (field.id === "message" && value.length < 20) {
        return "Please provide at least 20 characters.";
      }
      return "";
    }

    function validate(field) {
      var message = fieldError(field);
      var feedback = field.parentElement.querySelector(".invalid-feedback");
      field.classList.toggle("is-invalid", Boolean(message));
      field.setAttribute("aria-invalid", message ? "true" : "false");
      if (feedback) {
        feedback.textContent = message || feedback.textContent;
      }
      return !message;
    }

    var fields = Array.prototype.slice.call(form.querySelectorAll("input, select, textarea"))
      .filter(function (field) {
        return field.type !== "hidden" && field.type !== "submit";
      });

    fields.forEach(function (field) {
      field.addEventListener("blur", function () {
        validate(field);
      });
      field.addEventListener("input", function () {
        if (field.classList.contains("is-invalid")) {
          validate(field);
        }
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var valid = true;
      var firstInvalid = null;

      fields.forEach(function (field) {
        if (!validate(field)) {
          valid = false;
          if (!firstInvalid) {
            firstInvalid = field;
          }
        }
      });

      if (!valid) {
        if (status) {
          status.classList.remove("is-visible");
        }
        if (firstInvalid) {
          firstInvalid.focus();
        }
        return;
      }

      if (status) {
        status.innerHTML =
          "<strong>Thank you — your details passed validation.</strong><br />" +
          "This is a static website, so nothing has been sent. Connect the form to a mail service " +
          "or an email address owned by ECHA Pasikudah before publishing it.";
        status.classList.add("is-visible");
        status.setAttribute("role", "status");
      }
      form.reset();
      fields.forEach(function (field) {
        field.classList.remove("is-invalid");
        field.setAttribute("aria-invalid", "false");
      });
      if (status) {
        status.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  }

  /* ----------------------------------------------------------------------
     Boot
     ---------------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    initChrome();
    initActiveNav();
    initSmoothScroll();
    initMobileNav();
    initReveal();
    initLightbox();
    initGalleryFilter();
    initContactForm();
  });
})();
