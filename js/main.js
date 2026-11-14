import { PROFILE, FEATURED_GAME, GAMES, SYSTEMS, TECH_STACK, CUBE_HERO, CUBE_CAST, SHELVES, VIDEO_FEATURED, VIDEO_TYPES, VIDEO_TOOLS } from './data.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const fmt = (n) => (n >= 1000 ? (n / 1000).toFixed(n >= 100000 ? 0 : 1).replace(/\.0$/, '') + 'K' : String(n));
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const WORLDS = ['tech', '3d', 'video'];
const BG = { tech: '#0e0d0c', '3d': '#0d0819', video: '#eceef3' };
const html = document.documentElement;
let current = html.dataset.world || 'tech';

/* ================================================================ templates */
const lines = (text) => text.split('|').map((t) => `<span class="split-line"><span>${t}</span></span>`).join('');
const img = (src, alt, w, h, cls = '', sizes = '(max-width: 900px) 90vw, 40vw') =>
  `<img class="${cls}" src="${src}-sm.webp" srcset="${src}-sm.webp 720w, ${src}.webp 1600w" sizes="${sizes}" width="${w}" height="${h}" alt="${esc(alt)}" loading="lazy" decoding="async">`;
const video = (c, { label = c.title, ratio = c.ratio, cls = '' } = {}) => `
  <div class="vf ${cls}" style="aspect-ratio:${ratio}">
    <video muted loop playsinline preload="none" poster="${c.poster}" data-src="${c.src}" aria-label="${esc(label)}"></video>
    <button class="snd" type="button" aria-pressed="false">Sound off</button>
    <span class="prog" aria-hidden="true"><i></i></span>
  </div>`;

const SNOW = `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7M9 4l3 2 3-2M9 20l3-2 3 2M4 10.5l1 3.5-3 1.5M20 13.5l-1-3.5 3-1.5M4 13.5l1-3.5M20 10.5l-1 3.5"/></svg>`;

function techWorld() {
  const total = GAMES.reduce((a, g) => a + (g.visits || 0), 0);
  const f = FEATURED_GAME;
  return `
  <section class="wsec world-intro" aria-labelledby="t-h">
    <div class="wrap">
      <h2 class="d h2 reveal-lines" id="t-h">${lines('Games people|actually play.')}</h2>
      <div class="intro-row">
        <p class="lede">I design, script and ship Roblox games, and I build the automations that keep client businesses running.</p>
        <div class="stat"><b data-count="${total}">0</b><span>visits across my Roblox games, and counting</span></div>
      </div>
    </div>
  </section>

  <section class="wsec feat" aria-labelledby="f-h">
    <div class="feat-stage">
      <div class="feat-frame vf-host inkframe">
        <span class="seal" aria-hidden="true">MONPAO<br>STUDIO</span>
        ${video({ src: f.video, poster: f.poster, title: f.name + ' trailer', ratio: '16/9' })}
        <a class="feat-badge" href="${f.url}" target="_blank" rel="noopener">
          <img src="${f.icon}" alt="" width="52" height="52">
          <span><b>${esc(f.name)}</b><span>${esc(f.studio)} · Play on Roblox</span></span>
        </a>
      </div>
    </div>
    <div class="feat-copy">
      <div>
        <h3 class="d h3" id="f-h">Featured: ${esc(f.name)}</h3>
        <p class="lede">${esc(f.blurb)}</p>
        <a class="btn" href="${f.url}" target="_blank" rel="noopener">Play it on Roblox</a>
      </div>
      <ul class="stagger">${f.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
    </div>
  </section>

  <section class="wsec games pinrow" aria-labelledby="g-h">
    <div class="wrap games-head" style="padding-inline:var(--pad)">
      <h2 class="d h2 reveal-lines" id="g-h">${lines('More games|I shipped')}</h2>
      <p class="lede" style="margin:0">Obbies, simulators and party games, from a 180K-visit speed escape to brand-new launches.</p>
    </div>
    <div class="games-track-wrap"><div class="games-track">
      ${GAMES.map((g) => `
        <a class="game" href="${g.url}" target="_blank" rel="noopener">
          <span class="game-icon inkframe ${g.icon ? '' : 'noicon'}">${g.icon ? `<img src="${g.icon}" alt="" width="512" height="512" loading="lazy">` : SNOW}</span>
          <span class="game-name">${esc(g.name)}</span>
          <span class="game-meta">${g.visits ? `<span class="v">${fmt(g.visits)} visits</span>` : ''}${g.favs ? `<span>${fmt(g.favs)} favorites</span>` : ''}<span>${esc(g.tag)}</span></span>
        </a>`).join('')}
    </div></div>
  </section>

  <section class="wsec" aria-labelledby="s-h">
    <div class="wrap">
      <h2 class="d h2 reveal-lines" id="s-h">${lines('Systems that|run themselves')}</h2>
      <p class="lede">CRM automations, dashboards and internal tools for real clients.</p>
      <ul class="sys-list">
        ${SYSTEMS.map((s) => `
          <li class="sys">
            <h3>${esc(s.name)}</h3>
            <div><p>${esc(s.what)}</p><small>${esc(s.tools)}</small></div>
            <div class="sys-links"><a href="${s.link}" target="_blank" rel="noopener">${esc(s.kind)}</a>${s.extra ? `<a href="${s.extra.url}" target="_blank" rel="noopener">${esc(s.extra.label)}</a>` : ''}</div>
          </li>`).join('')}
      </ul>
      <ul class="chips stagger" aria-label="Tools">${TECH_STACK.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
    </div>
  </section>`;
}

function threeDWorld() {
  const all = [];
  const castHtml = CUBE_CAST.map((c) => {
    const i = all.push({ src: c.src, title: c.title }) - 1;
    return `<button class="tile" type="button" data-lb="${i}">${img(c.src, c.title, c.w, c.h, '', '(max-width: 520px) 50vw, (max-width: 900px) 50vw, 33vw')}<span class="cap">${esc(c.title)}</span></button>`;
  }).join('');
  const shelvesHtml = SHELVES.map((s) => {
    const first = all.length;
    s.items.forEach((it, k) => all.push({ src: it.src, title: `${s.title} ${s.items.length > 1 ? `(${k + 1}/${s.items.length})` : ''}` }));
    const c = s.items[0];
    return `
      <article class="shelf">
        <button class="shelf-cover" type="button" data-lb="${first}" aria-label="Open ${esc(s.title)}">${img(c.src, s.title, c.w, c.h, '', '(max-width: 900px) 80vw, 34vw')}${s.items.length > 1 ? `<span class="shelf-count">${s.items.length} renders</span>` : ''}</button>
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.note)}</p>
        ${s.items.length > 1 ? `<div class="shelf-thumbs">${s.items.slice(1, 9).map((it, k) => `<button type="button" data-lb="${first + k + 1}" aria-label="Open render ${k + 2}"><img src="${it.src}-sm.webp" alt="" loading="lazy" width="46" height="46"></button>`).join('')}</div>` : ''}
      </article>`;
  }).join('');
  LB.items = all;
  return `
  <section class="wsec cube-hero" aria-labelledby="c-h">
    <div class="cube-stage">
      <div class="cube-img">${img(CUBE_HERO.src, CUBE_HERO.alt, CUBE_HERO.w, CUBE_HERO.h, '', '100vw').replace('loading="lazy"', 'loading="eager" fetchpriority="high"')}</div>
      <div class="cube-glow" aria-hidden="true"></div>
      <div class="cube-title">
        <h2 class="d reveal-lines" id="c-h">${lines('Arise,|cubed.')}</h2>
        <p>Sung Jinwoo and his shadow soldiers, rebuilt as stylized cube characters. Modeled in Blender, textured in Substance Painter, game-ready.</p>
      </div>
    </div>
  </section>

  <section class="wsec" aria-labelledby="cc-h">
    <div class="wrap">
      <h2 class="d h2 reveal-lines" id="cc-h">${lines('The cube cast')}</h2>
      <p class="lede">Anime heroes, villains and pets in one consistent cube style, built to drop straight into Roblox.</p>
      <div class="cast">${castHtml}</div>
    </div>
  </section>

  <section class="wsec pinrow" aria-labelledby="sh-h">
    <div class="wrap games-head" style="padding-inline:var(--pad)">
      <h2 class="d h2 reveal-lines" id="sh-h">${lines('Bosses, blades|and the rest')}</h2>
      <p class="lede" style="margin:0">Weapons, raid bosses, vehicles, environments and the collectibles inside my games. Click any render to open it.</p>
    </div>
    <div class="shelves-track-wrap"><div class="shelves-track">${shelvesHtml}</div></div>
  </section>
  <section class="wsec" style="padding-top:0">
    <div class="wrap"><ul class="chips stagger" aria-label="3D tools"><li>Blender</li><li>Substance Painter</li><li>Low and mid-poly</li><li>Stylized texturing</li><li>Roblox-ready export</li></ul></div>
  </section>`;
}

function videoWorld() {
  const [a, b, c] = VIDEO_FEATURED;
  const reel = (v) => `<div class="reel"><figure>${video(v)}<figcaption><b>${esc(v.title)}</b><span>${esc(v.type)}</span></figcaption></figure></div>`;
  return `
  <section class="wsec world-intro" aria-labelledby="v-h">
    <div class="wrap">
      <p class="rec">Now playing</p>
      <h2 class="d h2 reveal-lines" id="v-h" style="margin-top:.3em">${lines('Any kind of|AI video.')}</h2>
      <div class="intro-row">
        <p class="lede">Explainers, story shorts, UGC ads and product spots, from script and voice to the final cut in CapCut. Everything below plays on its own; tap a video for sound.</p>
      </div>
    </div>
  </section>

  <section class="wsec" aria-labelledby="nv-h" style="padding-top:0">
    <div class="wrap">
      <h2 class="d h3" id="nv-h">Newest work</h2>
      <div class="reel-row">${reel(a)}${reel(b)}${reel(c)}</div>
    </div>
  </section>

  <section class="wsec" aria-labelledby="ty-h">
    <div class="wrap">
      <h2 class="d h2 reveal-lines" id="ty-h">${lines('Every format|I can make')}</h2>
      <div class="types">
        ${VIDEO_TYPES.map((t) => `
          <article class="type">
            <div class="type-head"><h3>${esc(t.type)}</h3><p>${esc(t.note)}</p></div>
            <div class="type-clips ${t.clips.every((c) => c.ratio === '16/9') ? 'landscape' : ''}">
              ${t.clips.map((c) => `<figure class="clip" style="margin:0">${video(c)}<figcaption>${esc(c.title)}</figcaption></figure>`).join('')}
            </div>
          </article>`).join('')}
      </div>

      <div class="capcut">
        <div>
          <h2 class="d">If it's an AI video, I can make it.</h2>
          <p style="margin:18px 0 0;opacity:.75">Every piece here was cut, captioned and finished in CapCut. Send raw footage or just an idea.</p>
          <div class="timeline" aria-hidden="true">
            ${[[0, 18, '#ff2d55'], [19, 14, '#9aa3b5'], [34, 22, '#ff2d55'], [57, 9, '#c9ced8'], [67, 20, '#9aa3b5'], [88, 12, '#ff2d55']].map(([l, w, c]) => `<i style="left:${l}%;width:${w}%;background:${c}"></i>`).join('')}
            <span class="ph"></span>
          </div>
        </div>
        <ul>${VIDEO_TOOLS.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
      </div>
    </div>
  </section>`;
}

const RENDER = { tech: techWorld, '3d': threeDWorld, video: videoWorld };

/* ================================================================ videos */
let vio;
function setupVideos(root) {
  vio?.disconnect();
  vio = new IntersectionObserver((entries) => {
    for (const en of entries) {
      const v = en.target;
      if (en.isIntersecting) {
        if (!v.src) v.src = v.dataset.src;
        v.play().catch(() => {});
      } else if (!v.paused) v.pause();
    }
  }, { threshold: 0.35 });
  $$('video', root).forEach((v) => {
    vio.observe(v);
    const box = v.closest('.vf');
    const bar = $('.prog i', box);
    v.addEventListener('timeupdate', () => { if (v.duration) bar.style.width = (v.currentTime / v.duration) * 100 + '%'; });
    v.addEventListener('error', () => {
      if (box.classList.contains('missing')) return;
      box.classList.add('missing');
      box.insertAdjacentHTML('afterbegin', `<img class="fallback-img" src="${v.poster}" alt="">`);
      $('.snd', box)?.remove();
    });
    const snd = $('.snd', box);
    const toggle = () => {
      const on = v.muted;
      $$('video').forEach((o) => { o.muted = true; const b = $('.snd', o.closest('.vf')); if (b) { b.textContent = 'Sound off'; b.setAttribute('aria-pressed', 'false'); } });
      if (on) { v.muted = false; v.play().catch(() => {}); snd.textContent = 'Sound on'; snd.setAttribute('aria-pressed', 'true'); }
    };
    snd.addEventListener('click', (e) => { e.stopPropagation(); toggle(); });
    v.addEventListener('click', toggle);
  });
}

/* ================================================================ lightbox */
const LB = { items: [], i: 0 };
const lb = $('#lightbox');
let lastFocus;
function openLB(i) {
  LB.i = i; lastFocus = document.activeElement;
  lb.hidden = false; showLB(); lenis?.stop(); $('.lb-close', lb).focus();
}
function showLB() {
  const it = LB.items[LB.i];
  const im = $('img', lb);
  im.src = it.src + '.webp'; im.alt = it.title;
  $('figcaption', lb).textContent = it.title;
}
function closeLB() { lb.hidden = true; lenis?.start(); lastFocus?.focus(); }
$('.lb-close', lb).addEventListener('click', closeLB);
$('.lb-prev', lb).addEventListener('click', () => { LB.i = (LB.i - 1 + LB.items.length) % LB.items.length; showLB(); });
$('.lb-next', lb).addEventListener('click', () => { LB.i = (LB.i + 1) % LB.items.length; showLB(); });
lb.addEventListener('click', (e) => { if (e.target === lb) closeLB(); });
addEventListener('keydown', (e) => {
  if (lb.hidden) return;
  if (e.key === 'Escape') closeLB();
  if (e.key === 'ArrowRight') $('.lb-next', lb).click();
  if (e.key === 'ArrowLeft') $('.lb-prev', lb).click();
});
document.addEventListener('click', (e) => { const t = e.target.closest('[data-lb]'); if (t) openLB(+t.dataset.lb); });

/* ================================================================ scroll + animation */
let lenis, ctx, hero3d;
const worldEl = $('#world');

function initWorldMotion() {
  const { gsap, ScrollTrigger } = window;
  if (!gsap) return;
  ctx = gsap.context(() => {
    // headline lines rise as they enter
    const ink = html.dataset.world === 'tech';
    $$('.reveal-lines', worldEl).forEach((h) => {
      const spans = $$('.split-line > span', h);
      if (ink) gsap.fromTo(spans, { clipPath: 'inset(-10% 100% -10% 0%)', filter: 'blur(10px)', opacity: 0.2 }, { clipPath: 'inset(-10% -2% -10% 0%)', filter: 'blur(0px)', opacity: 1, duration: 1.2, ease: 'power3.inOut', stagger: 0.16, scrollTrigger: { trigger: h, start: 'top 85%' } });
      else gsap.from(spans, { yPercent: 110, rotate: 3, duration: 1.1, ease: 'expo.out', stagger: 0.09, scrollTrigger: { trigger: h, start: 'top 85%' } });
    });
    $$('.lede, .stat, .capcut, .type-head', worldEl).forEach((el) => gsap.from(el, { y: 30, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } }));
    $$('.stagger', worldEl).forEach((ul) => gsap.from(ul.children, { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.06, scrollTrigger: { trigger: ul, start: 'top 88%' } }));
    $$('[data-count]', worldEl).forEach((el) => {
      const n = +el.dataset.count, o = { v: 0 };
      gsap.to(o, { v: n, duration: 2.2, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%' }, onUpdate: () => (el.textContent = Math.round(o.v).toLocaleString('en-US') + '+') });
    });

    const mm = gsap.matchMedia();
    mm.add({ desk: '(min-width: 901px)', mob: '(max-width: 900px)' }, ({ conditions: { desk } }) => {
      /* --- tech: trailer tilts up into view, then the games roll sideways --- */
      const frame = $('.feat-frame', worldEl);
      if (frame) {
        if (desk) {
          gsap.timeline({ scrollTrigger: { trigger: '.feat-stage', start: 'top top', end: '+=110%', scrub: 0.6, pin: true } })
            .fromTo(frame, { scale: 0.62, rotateX: 22, y: 60, transformPerspective: 1400 }, { scale: 1, rotateX: 0, y: 0, ease: 'power2.out' })
            .fromTo('.feat-badge', { opacity: 0, x: -20 }, { opacity: 1, x: 0 }, 0.5)
            .to(frame, { scale: 1.04, ease: 'none' });
        } else gsap.from(frame, { scale: 0.88, opacity: 0, duration: 1, scrollTrigger: { trigger: frame, start: 'top 85%' } });
      }
      const sideScroll = (wrapSel, trackSel, itemSel) => {
        const wrap = $(wrapSel, worldEl), track = $(trackSel, worldEl);
        if (!wrap) return;
        const items = $$(itemSel, track);
        if (desk) {
          const dist = () => Math.max(0, track.scrollWidth - innerWidth);
          const sec = wrap.closest('section');
          const tw = gsap.to(track, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: sec, start: () => (sec.offsetHeight < innerHeight ? 'center center' : 'top top'), end: () => '+=' + dist(), pin: sec, scrub: 0.7, invalidateOnRefresh: true, anticipatePin: 1 } });
          items.forEach((it) => gsap.from(it, { y: 80, rotate: 4, opacity: 0, duration: 0.9, ease: 'back.out(1.4)', scrollTrigger: { trigger: it, containerAnimation: tw, start: 'left 95%' } }));
        } else gsap.from(items.slice(0, 3), { y: 40, opacity: 0, stagger: 0.1, duration: 0.8, scrollTrigger: { trigger: wrap, start: 'top 85%' } });
      };
      sideScroll('.games-track-wrap', '.games-track', '.game');
      sideScroll('.shelves-track-wrap', '.shelves-track', '.shelf');

      $$('.sys', worldEl).forEach((row) => gsap.from(row, { opacity: 0, y: 24, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: row, start: 'top 90%' } }));

      /* --- 3D: the cube window opens onto the full shadow army --- */
      const cube = $('.cube-img', worldEl);
      if (cube) {
        gsap.timeline({ scrollTrigger: { trigger: '.cube-stage', start: 'top top', end: desk ? '+=130%' : '+=90%', scrub: 0.6, pin: true } })
          .fromTo(cube, { clipPath: desk ? 'inset(28% 37% 28% 37% round 6px)' : 'inset(30% 22% 30% 22% round 6px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'power2.inOut' })
          .fromTo($('img', cube), { scale: 1.35, rotate: -2 }, { scale: 1, rotate: 0, ease: 'power2.inOut' }, 0)
          .from('.cube-title p', { opacity: 0, y: 30 }, 0.55);
        $$('.tile', worldEl).forEach((t, i) => gsap.from(t, { clipPath: 'inset(100% 0 0 0)', y: 40, duration: 1.1, ease: 'expo.out', delay: (i % 3) * 0.08, scrollTrigger: { trigger: t, start: 'top 92%' } }));
      }

      /* --- video: reels rise like cards dealt onto a table --- */
      const reels = $$('.reel', worldEl);
      if (reels.length) gsap.from(reels, { y: 120, rotate: (i) => [-4, 3, -2][i], opacity: 0, duration: 1.2, ease: 'expo.out', stagger: 0.12, scrollTrigger: { trigger: '.reel-row', start: 'top 85%' } });
      $$('.clip', worldEl).forEach((c) => gsap.from(c, { y: 60, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: c, start: 'top 92%' } }));
      const ph = $('.timeline .ph', worldEl);
      if (ph) gsap.to(ph, { left: '100%', ease: 'none', scrollTrigger: { trigger: '.capcut', start: 'top 80%', end: 'bottom 30%', scrub: true } });
    });
  }, worldEl);
}

function renderWorld(w) {
  worldEl.innerHTML = RENDER[w]();
  setupVideos(worldEl);
  if (!reduced) initWorldMotion();
  window.ScrollTrigger?.refresh();
}

function syncSwitches(w) {
  $$('[data-go]').forEach((b) => {
    const on = b.dataset.go === w;
    b.setAttribute(b.classList.contains('sw') ? 'aria-selected' : 'aria-current', String(on));
  });
  const btn = $(`.mini-switch [data-go="${w}"]`), pill = $('.mini-pill');
  if (btn && pill) { pill.style.left = btn.offsetLeft + 'px'; pill.style.width = btn.offsetWidth + 'px'; }
  $('meta[name="theme-color"]').setAttribute('content', BG[w]);
}

let busy = false;
async function go(w, origin) {
  if (busy) return;
  const toWorld = () => (lenis ? lenis.scrollTo(worldEl, { duration: 1.5, easing: (t) => 1 - Math.pow(1 - t, 4) }) : worldEl.scrollIntoView({ behavior: 'smooth' }));
  if (w === current) { toWorld(); return; }
  busy = true;
  const r = origin?.getBoundingClientRect();
  const x = r ? r.left + r.width / 2 : innerWidth / 2, y = r ? r.top + r.height / 2 : innerHeight / 2;
  const wipe = $('#wipe');
  const inHero = scrollY < innerHeight * 0.6;
  const { gsap } = window;
  wipe.style.setProperty('--wipe', BG[w]);
  if (gsap && !reduced) await gsap.fromTo(wipe, { clipPath: `circle(0px at ${x}px ${y}px)` }, { clipPath: `circle(${Math.hypot(innerWidth, innerHeight)}px at ${x}px ${y}px)`, duration: 0.75, ease: 'power3.inOut' });

  ctx?.revert();
  current = w;
  html.dataset.world = w;
  history.replaceState(null, '', '#' + (w === 'video' ? 'ai-video' : w));
  renderWorld(w);
  syncSwitches(w);
  hero3d?.setWorld(w);
  if (!inHero) { lenis ? lenis.scrollTo(worldEl, { immediate: true, force: true }) : worldEl.scrollIntoView(); window.ScrollTrigger?.refresh(); }

  if (gsap && !reduced) await gsap.fromTo(wipe, { clipPath: 'inset(0% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.8, ease: 'power3.inOut' });
  wipe.style.clipPath = 'circle(0px at 50% 50%)';
  busy = false;
  if (inHero) setTimeout(toWorld, 120);
  worldEl.focus({ preventScroll: true });
}

$$('[data-go]').forEach((b) => b.addEventListener('click', () => go(b.dataset.go, b)));

/* ================================================================ boot */
function boot() {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  scrollTo(0, 0);
  const { gsap, ScrollTrigger, Lenis } = window;
  $('#mail').textContent = PROFILE.email;
  $('#mail').href = 'mailto:' + PROFILE.email;
  $('#avail').textContent = `${PROFILE.about} Available ${PROFILE.availability}.`;
  $('#yr').textContent = new Date().getFullYear();

  if (gsap) {
    gsap.registerPlugin(ScrollTrigger);
    if (!reduced && Lenis) {
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
      $$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => { const t = $(a.getAttribute('href')); if (t) { e.preventDefault(); lenis.scrollTo(t, { duration: 1.4 }); } }));
    }
    ScrollTrigger.create({ trigger: '.hero', start: 'bottom 70%', onEnter: () => { document.body.classList.add('past-hero'); hero3d?.setDim(true); }, onLeaveBack: () => { document.body.classList.remove('past-hero'); hero3d?.setDim(false); } });
  }

  renderWorld(current);
  syncSwitches(current);
  addEventListener('resize', () => syncSwitches(current));

  // one orchestrated entrance for the hero
  if (gsap && !reduced) {
    gsap.timeline({ defaults: { ease: 'expo.out' } })
      .from('.hero-name .word', { yPercent: 115, duration: 1.4, stagger: 0.12 }, 0.15)
      .from('.hero-hello', { opacity: 0, y: 16, duration: 1 }, 0.35)
      .from('.hero-sub', { opacity: 0, y: 24, duration: 1.1 }, 0.55)
      .from('.sw', { opacity: 0, y: 40, duration: 1.1, stagger: 0.09 }, 0.7)
      .from('.bar', { opacity: 0, y: -20, duration: 1 }, 0.8);
    // the name drifts apart as you scroll away
    gsap.to('.hero-name .line:nth-child(1)', { xPercent: -8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.hero-name .line:nth-child(2)', { xPercent: 8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  }

  // 3D layer loads after first paint so it never blocks the page
  const load3d = () => import('./hero3d.js').then(({ createHero3D }) => {
    try { hero3d = createHero3D($('#bg3d'), { reduced }); if (document.body.classList.contains('past-hero')) hero3d.setDim(true); }
    catch (e) { $('#bg3d').remove(); }
  }).catch(() => $('#bg3d')?.remove());
  'requestIdleCallback' in window ? requestIdleCallback(load3d, { timeout: 1200 }) : setTimeout(load3d, 400);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
