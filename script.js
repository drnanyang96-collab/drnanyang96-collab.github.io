const header = document.querySelector("[data-header]");
const backTop = document.querySelector("[data-back-top]");
const revealItems = document.querySelectorAll("[data-reveal]");

const syncChrome = () => {
  const active = window.scrollY > 24;
  header?.classList.toggle("is-scrolled", active);
  backTop?.classList.toggle("is-visible", window.scrollY > 520);
};

syncChrome();
window.addEventListener("scroll", syncChrome, { passive: true });

if (backTop) {
  backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

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
