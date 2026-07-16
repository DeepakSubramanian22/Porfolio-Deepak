const PROJECTS = [
  {
    id: "monkey-shooter",
    tag: "Tower Defense",
    title: "Monkey Shooter",
    meta: "Unity 6 · C# · 2D",
    thumb: "assets/projects_img/project1/WhatsApp Image 2026-07-01 at 1.32.50 PM.jpeg",
    video: "assets/projects_img/project1/Monkey Shooter.mp4",
    excerpt:
      "A 2D tower-defense where monkeys with unique ranges, projectiles and fire rates defend a path against escalating waves of balloons, including Metal Balloons only the Sniper Monkey can pop.",
    techs: [
      "Service Locator",
      "Dependency Injection",
      "Scriptable Objects",
      "Object Pooling",
      "Tilemap",
      "Coroutines",
    ],
    github: "https://github.com/DeepakSubramanian22/AGD_ServiceLocator",
  },
  {
    id: "superwomen-2d",
    tag: "Platformer",
    title: "SuperWomen 2D",
    meta: "Unity 6 · C# · 2D",
    thumb: "assets/projects_img/project2/WhatsApp Image 2026-07-01 at 1.32.43 PM.jpeg",
    video: "assets/projects_img/project2/SuperWoman 2D.mp4",
    excerpt:
      "A side-scrolling platformer starring SuperWomen: run, jump, crouch, collect coins, and dodge patrolling baby crocodiles across a set of hand-built levels.",
    techs: [
      "Animator Controller",
      "Physics 2D",
      "Patrol AI",
      "Scene Management",
      "OOP",
    ],
    github: "https://github.com/DeepakSubramanian22/2D-Platformer-Game",
  },
  {
    id: "ball-bash",
    tag: "Physics Arena",
    title: "Ball Bash",
    meta: "Unity 6 · C# · 3D",
    thumb: "assets/projects_img/project3/WhatsApp Image 2026-07-01 at 1.32.45 PM.jpeg",
    video: "assets/projects_img/project3/Ball Bash.mp4",
    excerpt:
      "Defend the tower, bash the foot: a 3D wave-survival arena where Rigidbody knockback decides who stays on the platform as enemy counts climb each wave.",
    techs: [
      "Rigidbody Physics",
      "Wave System",
      "Power-Ups (Coroutines)",
      "Dynamic Camera",
      "Audio Management",
    ],
    github: "https://github.com/DeepakSubramanian22/Ball-Bash",
  },
  {
    id: "soccer-arena",
    tag: "Arcade Prototype",
    title: "Soccer Arena",
    meta: "Unity 6 · C# · Physics",
    thumb: "assets/projects_img/project4/soccer_arena_thumbnail_v2.png",
    video: "assets/projects_img/project4/20260716-0501-43.3468973.mp4",
    excerpt:
      "A physics-driven arcade prototype where you control a football directly, not a character kicking one. Momentum and mass do the work: sprint, dash, and slam three enemy footballs into their goal before they push you into yours.",
    techs: [
      "Physics-Based Movement",
      "Coroutine Power-Ups",
      "Multi-Enemy AI",
      "Wave Match State",
      "Knockback Combat",
    ],
    github: "https://github.com/DeepakSubramanian22/Soccer-Arena",
    browser: "https://deeedev22.itch.io/soccer-arena-game",
  },
];

const cartlist = document.getElementById("cartlist");

function renderCarts() {
  cartlist.innerHTML = PROJECTS.map(
    (p, i) => `
    <article class="cart" data-reveal>
      <button class="cart__thumb" data-open="${p.id}" aria-label="Watch ${p.title} gameplay">
        <span class="cart__tag">${p.tag}</span>
        <img src="${p.thumb}" alt="${p.title} screenshot" loading="lazy" />
        <span class="cart__play"><span class="cart__playicon">▶</span></span>
      </button>
      <div class="cart__body">
        <p class="cart__meta">${p.meta}</p>
        <h3 class="cart__title">${p.title}</h3>
        <p class="cart__excerpt">${p.excerpt}</p>
        <ul class="cart__techs">
          ${p.techs.map((t) => `<li>${t}</li>`).join("")}
        </ul>
        <div class="cart__actions">
          <button class="btn btn--cart" data-open="${p.id}">▶ Watch Gameplay</button>
          ${p.browser ? `<a class="btn btn--outline" href="${p.browser}" target="_blank" rel="noopener">Play on Browser</a>` : ""}
          <a class="btn btn--outline" href="${p.github}" target="_blank" rel="noopener">View Code</a>
        </div>
      </div>
    </article>
  `
  ).join("");

  document.querySelectorAll("[data-open]").forEach((el) => {
    el.addEventListener("click", () => openModal(el.getAttribute("data-open")));
  });
  observeReveal();
}

const modal = document.getElementById("modal");
const modalVideo = document.getElementById("modalVideo");
const modalTitle = document.getElementById("modalTitle");
const noFileMsg = document.getElementById("noFileMsg");
const missingFileLabel = document.getElementById("missingFile");

function openModal(id) {
  const project = PROJECTS.find((p) => p.id === id);
  if (!project) return;

  modalTitle.textContent = `NOW PLAYING // ${project.title.toUpperCase()}`;
  missingFileLabel.textContent = project.video.split("/").pop();

  noFileMsg.hidden = true;
  modalVideo.hidden = false;
  modalVideo.pause();
  modalVideo.removeAttribute("src");
  modalVideo.load();

  modalVideo.poster = project.thumb;
  modalVideo.src = project.video;

  modalVideo.onerror = () => {
    modalVideo.hidden = true;
    noFileMsg.hidden = false;
  };

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  modalVideo.pause();
}

modal.querySelectorAll("[data-close]").forEach((el) =>
  el.addEventListener("click", closeModal)
);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
});

const navToggle = document.getElementById("navToggle");
const navlinks = document.getElementById("navlinks");
navToggle.addEventListener("click", () => {
  const open = navlinks.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(open));
});
navlinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => navlinks.classList.remove("is-open"))
);

const lines = [
  "Place Monkeys. Pop Bloons. Defend the path.",
  "Run. Jump. Crouch. Collect coins.",
  "Defend the tower. Bash the foot.",
  "Loading portfolio.exe ...",
];
const typewriterEl = document.getElementById("typewriter");
let lineIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    typewriterEl.textContent = lines[0];
    return;
  }

  const current = lines[lineIndex];

  if (!deleting) {
    charIndex++;
    typewriterEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1600);
      return;
    }
  } else {
    charIndex--;
    typewriterEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      lineIndex = (lineIndex + 1) % lines.length;
    }
  }

  setTimeout(typeLoop, deleting ? 30 : 55);
}

function observeReveal() {
  const targets = document.querySelectorAll("[data-reveal]:not(.is-visible)");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  targets.forEach((t) => io.observe(t));
}

document.getElementById("year").textContent = new Date().getFullYear();
renderCarts();
observeReveal();
typeLoop();
