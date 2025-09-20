// ==== Einstellungen ====
// Trage hier deine YouTube-Video-IDs ein:
const videos = [
  { id: "dQw4w9WgXcQ", title: "Beispielvideo 1 – ersetzen!" },
  { id: "9bZkp7q19f0", title: "Beispielvideo 2 – ersetzen!" },
  { id: "3JZ_D3ELwOQ", title: "Beispielvideo 3 – ersetzen!" }
];
// Optional: Upload-Playlist (beginnt mit 'UU...')
// const uploadsPlaylist = "UUxxxxxxxxxxxxxxxxxxxxxx";

const grid = document.getElementById("videoGrid");

function createCard(v){
  const a = document.createElement("a");
  a.href = "https://www.youtube.com/watch?v=" + v.id;
  a.target = "_blank";
  a.rel = "noopener";
  a.className = "card";
  a.setAttribute("aria-label", v.title);

  const img = document.createElement("img");
  img.className = "thumb";
  img.alt = v.title;
  img.loading = "lazy";
  img.src = "https://img.youtube.com/vi/" + v.id + "/hqdefault.jpg";

  const meta = document.createElement("div");
  meta.className = "meta";
  const h3 = document.createElement("h3");
  h3.textContent = v.title;
  const p = document.createElement("p");
  p.textContent = "Klicken zum Abspielen";
  meta.appendChild(h3); meta.appendChild(p);

  a.appendChild(img); a.appendChild(meta);

  a.addEventListener("click", (e)=>{
    e.preventDefault();
    openModal(v.id);
  });

  return a;
}

function render(){
  grid.innerHTML = "";
  if (videos.length === 0){
    const p = document.createElement("p");
    p.className = "copy";
    p.textContent = "Noch keine Videos eingetragen. Öffne assets/js/app.js und füge deine Video-IDs in das 'videos'-Array ein.";
    grid.parentElement.insertBefore(p, grid);
    return;
  }
  videos.forEach(v => grid.appendChild(createCard(v)));
}

// ==== Kategorien (10) für Projekte & Serien ====
const categories = [
  { img: "assets/img/categories/cat-01.jpg", title: "Jaro und Delta Story", desc: "Actionreiche Saga um Delta, Jaro & uralte Kräfte.", tags: [], path: "categories/das-erwachen-von-chi/" },
  { img: "assets/img/categories/red.png", title: "Redstone Labs", desc: "Spannende Tutorials, epische Events & verrückte Maschinen. Klicke rein und entdecke, was in Redstone Labs erschaffen wurde!", tags: [], path: "categories/redstone-labs/" },
  { img: "assets/img/categories/cat-04.jpg", title: "PvP & Fights", desc: "Duelle, Montages und Technik-Tests.", tags: [], path: "categories/pvp-fights/" },
  { img: "assets/img/categories/cat-05.jpg", title: "Animation Tests", desc: "Stil-Experimente & kurze Szenen.", tags: [], path: "categories/animation-tests/" },
  { img: "assets/img/categories/cat-06.jpg", title: "Hörspiel Universe", desc: "Episoden, Sprecher & Effekte.", tags: [], path: "categories/hoerspiel-universe/" },
  { img: "assets/img/categories/cat-07.jpg", title: "Tutorials & Guides", desc: "Bauen, Commands, Tools, Tipps.", tags: [], path: "categories/tutorials-guides/" },
  { img: "assets/img/categories/cat-08.jpg", title: "Events & Streams", desc: "Live, Turniere & Community-Run.", tags: [], path: "categories/events-streams/" },
  { img: "assets/img/categories/cat-09.jpg", title: "Community Projekte", desc: "Kollabs, SMP & Viewer-Ideen.", tags: [], path: "categories/community-projekte/" },
  { img: "assets/img/categories/cat-10.jpg", title: "Behind the Scenes", desc: "Setup, Workflow & Outtakes.", tags: [], path: "categories/behind-the-scenes/" }
];

function renderCategories(){
  const track = document.getElementById("catTrack");
  if(!track) return;
  track.innerHTML = "";
  categories.forEach(c => {
    const art = document.createElement("article");
    art.className = "card";
    art.setAttribute("role","option");
    art.innerHTML = `
      <a href="${c.path}" class="card" aria-label="${c.title} – öffnen">
        <img class="thumb" src="${c.img}" alt="${c.title}" />
        <div class="meta">
          <h3>${c.title}</h3>
          <p>${c.desc}</p>
          <div class="tags">${(c.tags||[]).map(t=>`<span class="tag">${t}</span>`).join("")}</div>
        </div>
      </a>
    `;
    track.appendChild(art);
  });
}

function setupCarousel(){
  const track = document.getElementById("catTrack");
  const leftBtn = document.querySelector(".carousel-btn.left");
  const rightBtn = document.querySelector(".carousel-btn.right");
  if(!track || !leftBtn || !rightBtn) return;

  const updateButtons = () => {
    const maxScroll = track.scrollWidth - track.clientWidth - 1;
    leftBtn.disabled = track.scrollLeft <= 0;
    rightBtn.disabled = track.scrollLeft >= maxScroll;
  };

  const scrollByAmount = (dir) => {
    const track = document.getElementById("catTrack");
    if(!track) return;
    // Find first visible card width (fallback to 300)
    const firstCard = track.querySelector(".card");
    const step = firstCard ? Math.ceil(firstCard.getBoundingClientRect().width + 16) : 300; // 16px gap
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  leftBtn.addEventListener("click", ()=> scrollByAmount(-1));
  rightBtn.addEventListener("click", ()=> scrollByAmount(1));
  track.addEventListener("scroll", updateButtons);
  window.addEventListener("resize", updateButtons);

  // keyboard support on track
  track.addEventListener("keydown", (e)=>{
    if (e.key === "ArrowRight") { e.preventDefault(); scrollByAmount(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); scrollByAmount(-1); }
  });

  // Initialize state
  updateButtons();
}

function openModal(id){
  const m = document.getElementById("videoModal");
  const frame = document.getElementById("playerFrame");
  frame.src = "https://www.youtube.com/embed/" + id + "?autoplay=1&rel=0";
  m.classList.add("open");
}
function closeModal(){
  const m = document.getElementById("videoModal");
  const frame = document.getElementById("playerFrame");
  frame.src = "";
  m.classList.remove("open");
}
document.addEventListener("keydown", (e)=>{ if(e.key === "Escape") closeModal(); });

document.addEventListener("DOMContentLoaded", ()=>{
  document.getElementById("year").textContent = new Date().getFullYear();
  render();
  renderCategories();
  setupCarousel();
});


// External link for the second CTA (change as needed)
const EXTERNAL_SITE_URL = "https://www.youtube.com/@jjb-djp";
document.addEventListener("DOMContentLoaded", ()=>{
  const ext = document.getElementById("extLink");
  if (ext) ext.href = EXTERNAL_SITE_URL;
});
