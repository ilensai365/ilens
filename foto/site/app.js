const photos = window.PHOTOS || [];
const grid = document.getElementById("grid");
let visible = [];

// Round-robin so one event never fills a whole row: across categories (iGaming first)
// for "All", across events within a single category.
const CAT_ORDER = ["igaming", "realestate", "brand", "private"];
function roundRobin(queues) {
  const out = [];
  while (queues.some((q) => q.length)) queues.forEach((q) => q.length && out.push(q.shift()));
  return out;
}
function byEvent(list) {
  const groups = {};
  list.forEach((p) => (groups[p.title] ||= []).push(p));
  return roundRobin(Object.values(groups));
}
function interleave(list, filter) {
  if (filter !== "all") return byEvent(list);
  return roundRobin(CAT_ORDER.map((c) => byEvent(list.filter((p) => p.cat === c))));
}

const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
}, { rootMargin: "0px 0px -40px 0px" });

const PAGE = 24;
const more = document.getElementById("more");
let shown = 0;

function render(filter) {
  visible = interleave(filter === "all" ? photos : photos.filter((p) => p.cat === filter), filter);
  grid.innerHTML = "";
  shown = 0;
  showMore();
}

function showMore() {
  const next = visible.slice(shown, shown + PAGE);
  next.forEach((p, j) => {
    const i = shown + j;
    const b = document.createElement("button");
    b.className = p.h > p.w ? "tile is-tall" : "tile";
    b.setAttribute("aria-label", `Open photo: ${p.title}`);
    b.innerHTML = `<img src="${p.thumb}" alt="${p.title}" loading="${i < 6 ? "eager" : "lazy"}" decoding="async" width="${p.w}" height="${p.h}"><figcaption>${p.title}</figcaption>`;
    b.addEventListener("click", () => openBox(i));
    grid.appendChild(b);
    io.observe(b);
  });
  shown += next.length;
  more.hidden = shown >= visible.length;
  more.textContent = `Show more (${visible.length - shown})`;
}
more.addEventListener("click", showMore);

document.querySelectorAll(".chip").forEach((chip) =>
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach((c) => { c.classList.remove("is-active"); c.setAttribute("aria-selected", "false"); });
    chip.classList.add("is-active");
    chip.setAttribute("aria-selected", "true");
    render(chip.dataset.filter);
  })
);
render("all");

// Lightbox
const box = document.getElementById("lightbox");
const boxImg = document.getElementById("lb-img");
const boxCap = document.getElementById("lb-cap");
let current = 0;
let lastFocus = null;

function show(i) {
  current = (i + visible.length) % visible.length;
  const p = visible[current];
  boxImg.src = p.src;
  boxImg.alt = p.title;
  boxCap.textContent = `${p.title} · ${current + 1} / ${visible.length}`;
  new Image().src = visible[(current + 1) % visible.length].src; // preload next
}
function openBox(i) {
  lastFocus = document.activeElement;
  box.hidden = false;
  document.body.style.overflow = "hidden";
  show(i);
  box.querySelector(".lb-close").focus();
}
function closeBox() {
  box.hidden = true;
  document.body.style.overflow = "";
  lastFocus && lastFocus.focus();
}
box.querySelector(".lb-close").addEventListener("click", closeBox);
box.querySelector(".lb-prev").addEventListener("click", () => show(current - 1));
box.querySelector(".lb-next").addEventListener("click", () => show(current + 1));
box.addEventListener("click", (e) => { if (e.target === box) closeBox(); });
document.addEventListener("keydown", (e) => {
  if (box.hidden) return;
  if (e.key === "Escape") closeBox();
  if (e.key === "ArrowLeft") show(current - 1);
  if (e.key === "ArrowRight") show(current + 1);
});
let touchX = null;
box.addEventListener("touchstart", (e) => (touchX = e.touches[0].clientX), { passive: true });
box.addEventListener("touchend", (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
  touchX = null;
});

// Solid nav after the hero
const nav = document.querySelector(".nav");
const sticky = document.getElementById("sticky-cta");
const contact = document.getElementById("contact");
const onScroll = () => {
  nav.classList.toggle("is-solid", window.scrollY > window.innerHeight * 0.6);
  // show the phone quote button after the hero, hide it once the form is on screen
  const nearForm = contact.getBoundingClientRect().top < window.innerHeight;
  sticky.classList.toggle("is-on", window.scrollY > window.innerHeight * 0.8 && !nearForm);
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Contact form → email draft
document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const subject = `Photography enquiry: ${f.get("type")}${f.get("date") ? " — " + f.get("date") : ""}`;
  const body = `Name: ${f.get("name")}\nCompany: ${f.get("company") || "-"}\nType: ${f.get("type")}\nDate: ${f.get("date") || "-"}\nLocation: ${f.get("location") || "-"}\nCoverage: ${f.get("hours")}\n\n${f.get("message") || ""}`;
  window.location.href = `mailto:agafierek@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

document.getElementById("year").textContent = new Date().getFullYear();

// Hero slideshow: one image per line of work
const slides = [...document.querySelectorAll(".slide")];
const slideLabel = document.getElementById("slide-label");
const heroWord = document.getElementById("hero-word");
let slideAt = 0;
if (slides.length > 1 && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  setInterval(() => {
    slides[slideAt].classList.remove("is-on");
    slideAt = (slideAt + 1) % slides.length;
    slides[slideAt].classList.add("is-on");
    slideLabel.textContent = slides[slideAt].dataset.label;
    const word = slides[slideAt].dataset.word;
    if (word !== heroWord.textContent) {
      heroWord.classList.add("is-out");
      setTimeout(() => { heroWord.textContent = word; heroWord.classList.remove("is-out"); }, 450);
    }
  }, 5000);
}
