/* ─── Scroll progress ──────────────────────────────── */
const prog = document.getElementById('prog');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  if (prog) prog.style.width = (pct * 100) + '%';
}, { passive: true });

/* ─── Custom cursor ────────────────────────────────── */
const cur  = document.getElementById('cur');
const curR = document.getElementById('cur-r');
let mx = 0, my = 0, rx = 0, ry = 0;
window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
(function loop() {
  rx += (mx - rx) * .14;
  ry += (my - ry) * .14;
  if (cur)  { cur.style.left  = mx + 'px'; cur.style.top  = my + 'px'; }
  if (curR) { curR.style.left = rx + 'px'; curR.style.top = ry + 'px'; }
  requestAnimationFrame(loop);
})();

/* cursor state classes */
document.querySelectorAll('a, button, [data-tilt], .srv-card, .jcard-v2, .impact-card, .learn-card, .pillar').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('c-big'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('c-big'));
});
document.querySelectorAll('.dk-grid, .co-hero').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('c-inv'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('c-inv'));
});

/* ─── Nav scroll state ─────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('s', window.scrollY > 60);
}, { passive: true });

/* ─── Mobile menu ──────────────────────────────────── */
const burger     = document.getElementById('burger');
const mobOverlay = document.getElementById('mob-overlay');
let mobOpen = false;

function closeMob() {
  mobOpen = false;
  if (burger)     burger.classList.remove('open');
  if (mobOverlay) mobOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

if (burger) {
  burger.addEventListener('click', () => {
    mobOpen = !mobOpen;
    burger.classList.toggle('open', mobOpen);
    if (mobOverlay) mobOverlay.classList.toggle('open', mobOpen);
    document.body.style.overflow = mobOpen ? 'hidden' : '';
  });
}

/* ─── Scroll reveal ────────────────────────────────── */
const revealIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      revealIO.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.rv, .rv-l, .rv-r, .rv-sc').forEach(el => revealIO.observe(el));

/* ─── 3-D card tilt ────────────────────────────────── */
document.querySelectorAll('[data-tilt]').forEach(el => {
  el.addEventListener('mousemove', e => {
    const r  = el.getBoundingClientRect();
    const cx = r.left + r.width  / 2;
    const cy = r.top  + r.height / 2;
    const dx = (e.clientX - cx) / (r.width  / 2);
    const dy = (e.clientY - cy) / (r.height / 2);
    el.style.transform = `perspective(900px) rotateX(${-dy * 7}deg) rotateY(${dx * 7}deg) scale(1.02)`;
    const shine = el.querySelector('.tcard-shine');
    if (shine) {
      const angle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
      shine.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,.1) 0%, transparent 60%)`;
    }
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
    const shine = el.querySelector('.tcard-shine');
    if (shine) shine.style.background = '';
  });
});

/* ─── Magnetic button ──────────────────────────────── */
const magWrap = document.getElementById('mag-wrap');
if (magWrap) {
  const btn = magWrap.querySelector('a, button');
  magWrap.addEventListener('mousemove', e => {
    const r = magWrap.getBoundingClientRect();
    const x = e.clientX - r.left  - r.width  / 2;
    const y = e.clientY - r.top   - r.height / 2;
    if (btn) btn.style.transform = `translate(${x * .38}px, ${y * .38}px)`;
  });
  magWrap.addEventListener('mouseleave', () => {
    if (btn) btn.style.transform = '';
  });
}

/* ─── Hero parallax ────────────────────────────────── */
const heroH1 = document.querySelector('.hero-h1');
const heroRt  = document.querySelector('.hero-rt');
window.addEventListener('scroll', () => {
  const sy = window.scrollY;
  if (heroH1) heroH1.style.transform = `translateY(${sy * .12}px)`;
  if (heroRt)  heroRt.style.transform  = `translateY(${sy * .07}px)`;
}, { passive: true });
