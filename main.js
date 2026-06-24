(function () {
  "use strict";
  var WHATSAPP_NUMBER = "5561999810690";
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  var navToggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");

  function closeMenu() {
    if (!nav || !navToggle) return;
    nav.classList.remove("is-open");
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      navToggle.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  var header = document.querySelector(".header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var revealTargets = [
    ".feature", ".service-card", ".step",
    ".about__content", ".about__media",
    ".area__content", ".area__card",
    ".contact__info", ".contact__form-wrap"
  ];
  var els = document.querySelectorAll(revealTargets.join(","));
  els.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add("is-visible"); });
  }

  var phoneInput = document.getElementById("telefone");
  if (phoneInput) {
    phoneInput.addEventListener("input", function () {
      var v = phoneInput.value.replace(/\D/g, "").slice(0, 11);
      var out = v;
      if (v.length > 6) {
        out = "(" + v.slice(0, 2) + ") " + v.slice(2, 7) + "-" + v.slice(7);
      } else if (v.length > 2) {
        out = "(" + v.slice(0, 2) + ") " + v.slice(2);
      } else if (v.length > 0) {
        out = "(" + v;
      }
      phoneInput.value = out;
    });
  }

  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var nome = form.nome;
      var telefone = form.telefone;
      var servico = form.servico.value.trim();
      var mensagem = form.mensagem.value.trim();
      var valid = true;

      [nome, telefone].forEach(function (input) {
        if (!input.value.trim()) {
          input.classList.add("is-invalid");
          valid = false;
        } else {
          input.classList.remove("is-invalid");
        }
      });

      if (!valid) {
        var firstInvalid = form.querySelector(".is-invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var lines = [
        "*Novo orçamento pelo site*",
        "",
        "*Nome:* " + nome.value.trim(),
        "*Telefone:* " + telefone.value.trim()
      ];
      if (servico) lines.push("*Serviço:* " + servico);
      if (mensagem) lines.push("*Mensagem:* " + mensagem);

      var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));
      window.open(url, "_blank", "noopener");
    });

    form.querySelectorAll("input").forEach(function (input) {
      input.addEventListener("input", function () {
        input.classList.remove("is-invalid");
      });
    });
  }
})();
