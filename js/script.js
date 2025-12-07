/* ============================================================
  FIXED script.js – All bugs removed, design unchanged
============================================================ */

/* SEARCH FILTER */
function filterList(searchInputId, listContainerId, itemClass) {
  const input = document.getElementById(searchInputId);
  if (!input) return;
  const filter = input.value.toUpperCase();
  const container = document.getElementById(listContainerId);
  if (!container) return;
  const items = container.getElementsByClassName(itemClass);
  for (let i = 0; i < items.length; i++) {
    const a = items[i].getElementsByTagName("a")[0];
    if (!a) continue;
    const text = a.textContent.toUpperCase();
    if (text.indexOf(filter) > -1) {
      items[i].classList.remove("fade-out");
      items[i].classList.add("fade-in");
      items[i].style.display = "";
    } else {
      items[i].classList.remove("fade-in");
      items[i].classList.add("fade-out");
      (function (el) {
        setTimeout(() => {
          if (el.classList.contains("fade-out")) el.style.display = "none";
        }, 250);
      })(items[i]);
    }
  }
}

/* DARK MODE (persist) */
(function () {
  function applyTheme(mode) {
    if (mode === "dark") document.body.classList.add("dark-mode");
    else document.body.classList.remove("dark-mode");
  }

  document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("themeSwitch");
    const saved = localStorage.getItem("theme");
    applyTheme(saved === "dark" ? "dark" : "light");
    if (toggle) {
      toggle.checked = saved === "dark";
      toggle.addEventListener("change", () => {
        if (toggle.checked) {
          applyTheme("dark");
          localStorage.setItem("theme", "dark");
        } else {
          applyTheme("light");
          localStorage.setItem("theme", "light");
        }
      });
    }
  });
})();

/* SIDEBAR / MOBILE / COLLAPSIBLES */
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("sidebarToggle");
    const overlay = document.getElementById("overlay");
    const collapseButtons = document.querySelectorAll(".sidebar-section .section-toggle");
    const sidebar = document.getElementById("sidebar");

    /* → ALWAYS CLOSE SIDEBAR ON PAGE LOAD */
    document.body.classList.add("sidebar-hidden");
    localStorage.setItem("sidebarHidden", "true");

    /* Hamburger – Desktop + Mobile */
    if (hamburger) {
      hamburger.addEventListener("click", (e) => {
        e.preventDefault();

        hamburger.classList.toggle("active");

        if (window.innerWidth >= 768) {
          /* Desktop collapse */
          document.body.classList.toggle("sidebar-hidden");
          localStorage.setItem(
            "sidebarHidden",
            document.body.classList.contains("sidebar-hidden") ? "true" : "false"
          );
        } else {
          /* Mobile slide-in */
          document.body.classList.toggle("sidebar-open-mobile");
        }
      });
    }

    /* Overlay click closes mobile sidebar */
    if (overlay) {
      overlay.addEventListener("click", () => {
        document.body.classList.remove("sidebar-open-mobile");
        if (hamburger) hamburger.classList.remove("active");
      });
    }

    /* Collapsible sections */
    collapseButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const section = btn.closest(".sidebar-section");
        section.classList.toggle("open");
      });
    });

    /* Close sidebar on mobile when clicking a link */
    if (sidebar) {
      sidebar.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          if (window.innerWidth < 768) {
            document.body.classList.remove("sidebar-open-mobile");
            if (hamburger) hamburger.classList.remove("active");
          }
        });
      });
    }

    /* Resize fix */
    window.addEventListener("resize", () => {
      if (window.innerWidth < 768) {
        document.body.classList.remove("sidebar-hidden");
      }
    });
  });
})();

/* PAGE TRANSITIONS */
(function () {
  function isExternal(link) {
    try {
      return link.hostname !== window.location.hostname;
    } catch (e) {
      return false;
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("page-ready");

    document.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      if (a.target === "_blank") return;
      try {
        if (isExternal(a)) return;
      } catch (err) {}
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      if (/\.(pdf|zip|png|jpg|jpeg|svg|mp4|mp3)$/i.test(href)) return;

      e.preventDefault();
      document.documentElement.classList.add("page-exit");
      setTimeout(() => {
        window.location.href = a.href;
      }, 300);
    });
  });
})();
