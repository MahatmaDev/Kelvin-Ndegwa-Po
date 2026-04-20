(() => {
  "use strict";

  document.documentElement.classList.remove("no-js");

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ── THEME ─────────────────────────────────────────── */
  const root = document.documentElement;
  const themeBtn = $("#themeToggle");
  const iconMoon = $(".icon-moon", themeBtn);
  const iconSun  = $(".icon-sun",  themeBtn);

  const applyTheme = (t) => {
    root.setAttribute("data-theme", t);
    localStorage.setItem("kn_theme", t);
    if (iconMoon) iconMoon.style.display = t === "light" ? "none"  : "";
    if (iconSun)  iconSun.style.display  = t === "light" ? ""      : "none";
    themeBtn?.setAttribute("aria-label", t === "light" ? "Switch to dark mode" : "Switch to light mode");
  };

  const saved = localStorage.getItem("kn_theme") ||
    (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  applyTheme(saved);

  themeBtn?.addEventListener("click", () => {
    applyTheme(root.getAttribute("data-theme") === "light" ? "dark" : "light");
  });

  /* ── NAV TOGGLE ────────────────────────────────────── */
  const navToggle = $("#navToggle");
  const navMenu   = $("#navMenu");

  const setNav = (open) => {
    navToggle?.setAttribute("aria-expanded", String(open));
    navMenu?.classList.toggle("open", open);
    navToggle?.classList.toggle("open", open);
    document.body.classList.toggle("no-scroll", open);
  };

  navToggle?.addEventListener("click", () => {
    setNav(navToggle.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("click", (e) => {
    if (navToggle?.getAttribute("aria-expanded") !== "true") return;
    if (!navMenu?.contains(e.target) && !navToggle?.contains(e.target)) setNav(false);
  });

  $$(".nav__link").forEach(l => l.addEventListener("click", () => setNav(false)));

  /* ── SMOOTH SCROLL ─────────────────────────────────── */
  const headerH = () => parseFloat(getComputedStyle(root).getPropertyValue("--hd")) || 72;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - headerH() - 8, behavior: "smooth" });
  };

  $$('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href")?.slice(1);
      if (!id || !document.getElementById(id)) return;
      e.preventDefault();
      scrollTo(id);
      history.pushState(null, "", `#${id}`);
    });
  });

  window.addEventListener("load", () => {
    const hash = location.hash?.slice(1);
    if (hash) setTimeout(() => scrollTo(hash), 60);
  });

  /* ── SCROLL PROGRESS ───────────────────────────────── */
  const bar = $("#scrollBar");
  const updateBar = () => {
    if (!bar) return;
    const d = document.documentElement;
    const pct = (d.scrollTop / (d.scrollHeight - d.clientHeight)) * 100 || 0;
    bar.style.width = `${Math.min(100, pct)}%`;
  };
  window.addEventListener("scroll", updateBar, { passive: true });
  updateBar();

  /* ── SCROLLSPY ─────────────────────────────────────── */
  const sections = ["about","skills","projects","proof","contact"];
  const linkMap = new Map();
  $$(".nav__link").forEach(l => {
    const id = l.getAttribute("href")?.slice(1);
    if (id) linkMap.set(id, l);
  });

  const spy = new IntersectionObserver((entries) => {
    const vis = entries.filter(e => e.isIntersecting)
      .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!vis) return;
    linkMap.forEach(l => l.classList.remove("active"));
    linkMap.get(vis.target.id)?.classList.add("active");
  }, {
    rootMargin: `-${headerH()}px 0px -55% 0px`,
    threshold: [0.1, 0.25, 0.5],
  });

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) spy.observe(el);
  });

  /* ── PROJECT MODAL ─────────────────────────────────── */
  const modal   = $("#projectModal");
  const modalContent = $("#modalContent");
  const modalClose = $("#modalClose");

  const data = {
    vibewave: {
      eyebrow: "Flagship Android Project",
      title: "VibeWave",
      lead: "A full Android platform for live events — real-time song requests, audience voting, event reviews, and DJ management. Built on MVVM with a Firebase backend.",
      stack: ["Kotlin","MVVM","Firebase Auth","Firestore","Realtime DB","Cloud Functions","M-Pesa (Daraja)"],
      blocks: [
        {
          title: "Problem solved",
          body: "Live events suffer from unstructured audience interaction — no central request system, no feedback loop, no engagement layer. VibeWave fixes that end-to-end."
        },
        {
          title: "My role",
          body: "Product thinking, feature architecture, full Android implementation, Firebase integration, UI flow design, and payment exposure via Daraja API."
        },
        {
          title: "Key engineering highlights",
          list: [
            "Real-time request & voting system using Firestore listeners",
            "MVVM architecture with clean separation of concerns",
            "Firebase Auth with role-based access (DJ vs audience)",
            "M-Pesa Daraja payment flow exploration",
            "Responsive UI with smooth state transitions"
          ]
        },
        {
          title: "What comes next",
          body: "Analytics dashboard for DJs, advanced moderation tools, richer event-history features, and a deeper Daraja payment integration."
        }
      ]
    },
    events: {
      eyebrow: "Service Platform",
      title: "Entertainment Services Website",
      lead: "A conversion-focused website for entertainment and events services — professional visual hierarchy, mobile-first responsive design, and a layout built to scale.",
      stack: ["HTML5","CSS3","JavaScript","Responsive Design","Service UX","Booking Flow"],
      blocks: [
        { title: "Goal", body: "Make a service website that looks professional, loads fast, and turns visitors into clients. Not just a digital brochure — a conversion machine." },
        { title: "My role", body: "Structure, visual hierarchy, layout, full responsive implementation, and scalable frontend foundation for future booking features." },
        {
          title: "Key highlights",
          list: [
            "Clear visual hierarchy — visitors know what to do in 3 seconds",
            "Mobile-first — perfect across all screen sizes",
            "Strong CTA placement drives inquiries",
            "Built to extend into a full booking system"
          ]
        },
        { title: "Next steps", body: "Backend booking system, admin dashboard for content management, and deeper lead-capture analytics." }
      ]
    },
    lawiesounds: {
      eyebrow: "Brand Experience",
      title: "LawieSounds Brand Website",
      lead: "A polished digital presence for a music brand — fast, visually intentional, and easy to navigate for both fans and prospective clients.",
      stack: ["HTML5","CSS3","JavaScript","Mobile-First UI","Brand Design","Gallery"],
      blocks: [
        { title: "Goal", body: "Build a web presence that feels like the brand — clean, confident, and immediately credible. Easy for fans to explore, easy for clients to contact." },
        { title: "My role", body: "Full frontend build: layout decisions, mobile responsiveness, gallery, contact flow, and visual identity alignment." },
        {
          title: "Key highlights",
          list: [
            "Mobile-first design that works on any device",
            "Gallery section with smooth image viewing",
            "Clear navigation — fans and clients find what they need fast",
            "Aligned visual identity with the music brand"
          ]
        },
        { title: "Next steps", body: "Embedded audio/video players, event calendar, inquiry analytics, and deeper conversion paths for bookings." }
      ]
    }
  };

  const esc = (s) => String(s)
    .replace(/&/g,"&amp;").replace(/</g,"&lt;")
    .replace(/>/g,"&gt;").replace(/"/g,"&quot;");

  const renderModal = (key) => {
    const p = data[key];
    if (!p) return "";
    return `
      <span class="modal-project__eyebrow">${esc(p.eyebrow)}</span>
      <h3 class="modal-project__title">${esc(p.title)}</h3>
      <p class="modal-project__lead">${esc(p.lead)}</p>
      <div class="modal-project__chips">
        ${p.stack.map(s => `<span class="tag tag--small">${esc(s)}</span>`).join("")}
      </div>
      <div class="modal-grid">
        ${p.blocks.map(b => `
          <div class="modal-block">
            <h4>${esc(b.title)}</h4>
            ${b.list
              ? `<ul>${b.list.map(i => `<li>${esc(i)}</li>`).join("")}</ul>`
              : `<p>${esc(b.body)}</p>`
            }
          </div>
        `).join("")}
      </div>
    `;
  };

  const openModal = (key) => {
    if (!modal || !modalContent) return;
    modalContent.innerHTML = renderModal(key);
    modal.showModal();
    setTimeout(() => modalClose?.focus(), 0);
  };

  const closeModal = () => modal?.close();

  $$(".project__btn").forEach(btn => {
    btn.addEventListener("click", () => openModal(btn.getAttribute("data-project")));
  });

  modalClose?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (e) => {
    if (!$(".modal__box", modal)?.contains(e.target)) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal?.open) closeModal();
  });

  /* ── CONTACT FORM ──────────────────────────────────── */
  const form = $("#contactForm");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const get = (n) => form.elements.namedItem(n)?.value?.trim() || "";
    const name    = get("name");
    const email   = get("email");
    const subject = get("subject");
    const message = get("message");

    let valid = true;
    ["name","email","message"].forEach(n => {
      const f = form.elements.namedItem(n);
      if (!f?.checkValidity()) { f?.setAttribute("aria-invalid","true"); valid = false; }
      else f?.setAttribute("aria-invalid","false");
    });
    if (!valid) return;

    const sub = encodeURIComponent(`${subject} — from ${name}`);
    const body = encodeURIComponent(`Hello Kelvin,\n\n${message}\n\n---\nFrom: ${name}\nEmail: ${email}\n`);
    window.location.href = `mailto:ndegwak6@gmail.com?subject=${sub}&body=${body}`;
  });

  /* ── FOOTER YEAR ───────────────────────────────────── */
  const yr = $("#footerYear");
  if (yr) yr.textContent = `© ${new Date().getFullYear()} Kelvin Ndegwa`;

})();
