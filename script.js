/* ============ DATOS: PROYECTOS 2026 ============ */
/* Edita este array con tus proyectos reales. */
const PROYECTOS = [
  { mes: "Enero", num: "01", cat: "estudio", titulo: "Investigación para el concurso Huarmis", desc: "Analicé el problema educativo que quiero atacar y definí la propuesta inicial.", estado: "Completado" },
  { mes: "Febrero", num: "02", cat: "producto", titulo: "Prototipo de plataforma educativa", desc: "Primera versión funcional de mi herramienta paracentralizar recursos de estudio.", estado: "Completado" },
  { mes: "Marzo", num: "03", cat: "estudio", titulo: "Aprendizaje de desarrollo web", desc: "Profundicé en HTML, CSS, JavaScript y bases de datos con proyectos propios.", estado: "Completado" },
  { mes: "Abril", num: "04", cat: "comunidad", titulo: "Taller de tecnología para estudiantes", desc: "Organicé una sesión práctica para compartir lo que aprendí con más compañeros.", estado: "Completado" },
  { mes: "Mayo", num: "05", cat: "producto", titulo: "Mejoras de usabilidad del prototipo", desc: "Rediseñé la interfaz basándome en las respuestas de los usuarios piloto.", estado: "Completado" },
  { mes: "Junio", num: "06", cat: "producto", titulo: "Preparación de la propuesta al concurso", desc: "Documenté el proyecto, los objetivos y el impacto esperado para presentar en Huarmis.", estado: "En curso" },
  { mes: "Julio", num: "07", cat: "comunidad", titulo: "Alianzas con colegios locales", desc: "Busqué alianzas con instituciones para probar la herramienta con estudiantes reales.", estado: "Próximo" },
  { mes: "Agosto", num: "08", cat: "estudio", titulo: "Investigación para la Universidad de TERT", desc: "Estudié los programas de la Universidad de TERT para preparar mi postulación.", estado: "Próximo" },
  { mes: "Septiembre", num: "09", cat: "producto", titulo: "Lanzamiento público de la plataforma", desc: "Publicación de la versión estable y campaña de difusión para sumar usuarios.", estado: "Próximo" },
  { mes: "Octubre", num: "10", cat: "comunidad", titulo: "Programa de mentoría", desc: "Acompañé a estudiantes más jóvenes con clases de programación y apoyo académico.", estado: "Planificado" },
  { mes: "Noviembre", num: "11", cat: "estudio", titulo: "Preparación de Admissions (MIT / Harvard)", desc: "Reúno requisitos, referencias y portafolio para las postulaciones de posgrado.", estado: "Planificado" },
  { mes: "Diciembre", num: "12", cat: "producto", titulo: "Evaluación anual y plan 2027", desc: "Reviso resultados, mido el impacto y defino las prioridades del siguiente año.", estado: "Planificado" },
];

const ESTADOS = {
  "Completado": { icon: "✔", color: "var(--accent)" },
  "En curso": { icon: "◔", color: "var(--brand)" },
  "Próximo": { icon: "○", color: "var(--muted)" },
  "Planificado": { icon: "◌", color: "var(--muted)" },
};

const CAT_LABEL = {
  product: "Producto",
  estudio: "Estudio",
  comunidad: "Comunidad",
};

/* ============ RENDER DE MESES ============ */
const monthsWrap = document.getElementById("months");

PROYECTOS.forEach((p) => {
  const art = document.createElement("article");
  art.className = "month";
  art.dataset.cat = p.cat;

  const est = ESTADOS[p.estado] || { icon: "○", color: "var(--muted)" };

  art.innerHTML = `
    <div class="month-top">
      <span class="month-name">${p.mes}</span>
      <span class="month-num">${p.num}</span>
    </div>
    <span class="tag tag-${p.cat}">${CAT_LABEL[p.cat]}</span>
    <h4>${p.titulo}</h4>
    <p>${p.desc}</p>
    <div class="month-status">
      <span style="color:${est.color}">${est.icon}</span>
      <span>${p.estado}</span>
    </div>
  `;

  monthsWrap.appendChild(art);
});

/* ============ FILTROS DE PROYECTOS ============ */
document.getElementById("filterRow").addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;

  document.querySelectorAll("#filterRow .chip").forEach((c) => c.classList.remove("is-active"));
  chip.classList.add("is-active");

  const filter = chip.dataset.filter;
  document.querySelectorAll(".month").forEach((card) => {
    card.classList.toggle("is-hidden", filter !== "all" && card.dataset.cat !== filter);
  });
});

/* ============ TABS ============ */
const tabs = [...document.querySelectorAll(".tab")];
const panels = [...document.querySelectorAll(".panel")];

function activate(name) {
  tabs.forEach((t) => {
    const on = t.dataset.panel === name;
    t.classList.toggle("is-active", on);
    t.setAttribute("aria-selected", String(on));
  });
  panels.forEach((p) => {
    const on = p.id === `panel-${name}`;
    p.classList.toggle("is-active", on);
    p.hidden = !on;
  });
}

tabs.forEach((t) => t.addEventListener("click", () => activate(t.dataset.panel)));

document.querySelectorAll("[data-jump]").forEach((btn) => {
  btn.addEventListener("click", () => {
    activate(btn.dataset.jump);
    document.querySelector(`.tab[data-panel="${btn.dataset.jump}"]`)?.focus();
    document.getElementById(`panel-${btn.dataset.jump}`).scrollIntoView({ block: "start" });
  });
});

/* Navegación con teclado en las tabs */
document.getElementById("tabs").addEventListener("keydown", (e) => {
  const i = tabs.indexOf(document.activeElement);
  if (i === -1) return;
  let next = null;
  if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
  if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
  if (!next) return;
  e.preventDefault();
  next.focus();
  activate(next.dataset.panel);
});

/* ============ MENÚ MÓVIL ============ */
const menuToggle = document.getElementById("menuToggle");
const tabsWrap = document.getElementById("tabs");

menuToggle.addEventListener("click", () => {
  const open = tabsWrap.classList.toggle("is-open");
  menuToggle.classList.toggle("is-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
});

tabs.forEach((t) =>
  t.addEventListener("click", () => {
    tabsWrap.classList.remove("is-open");
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  })
);

/* ============ TEMA CLARO / OSCURO ============ */
const root = document.documentElement;
const themeBtn = document.getElementById("themeToggle");
const saved = localStorage.getItem("tema");

if (saved) {
  root.dataset.theme = saved;
}

themeBtn.addEventListener("click", () => {
  const next = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = next;
  localStorage.setItem("tema", next);
});

/* ============ AÑO EN EL FOOTER ============ */
document.getElementById("year").textContent = new Date().getFullYear();
