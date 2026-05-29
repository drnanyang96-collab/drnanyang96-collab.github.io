const header = document.querySelector("[data-header]");
const backTop = document.querySelector("[data-back-top]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const revealItems = document.querySelectorAll("[data-reveal]");

const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

document.documentElement.dataset.theme = initialTheme;

const syncThemeButton = () => {
  if (!themeToggle) return;
  const dark = document.documentElement.dataset.theme === "dark";
  themeToggle.textContent = dark ? "Light" : "Dark";
  themeToggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
};

syncThemeButton();

themeToggle?.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem("theme", nextTheme);
  syncThemeButton();
});

const syncChrome = () => {
  const active = window.scrollY > 24;
  header?.classList.toggle("is-scrolled", active);
  backTop?.classList.toggle("is-visible", window.scrollY > 520);
};

syncChrome();
window.addEventListener("scroll", syncChrome, { passive: true });

backTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
