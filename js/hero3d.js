// Ambient cube field behind the page. One InstancedMesh; each world is a formation
// the cubes fly into: voxel island (tech), shadow vortex (3D), film ribbon (AI video).
import * as THREE from '../vendor/three.module.min.js';

const PALETTES = {
  tech: ['#1b1917', '#24211d', '#2e2a25', '#1b1917', '#ece6d8', '#24211d', '#2e2a25', '#1b1917', '#24211d', '#2e2a25', '#1b1917', '#d4382b'],
  '3d': ['#6d4cff', '#2a1b5c', '#9b7dff', '#5ce1ff', '#1c1238', '#3b2a7a'],
  video: ['#ffffff', '#cfd4de', '#ff2d55', '#f6f7fa', '#b9bfcb', '#e2e5ec'],
};
const BG = { tech: '#0e0d0c', '3d': '#0d0819', video: '#eceef3' };

export function createHero3D(canvas, { reduced = false } = {}) {
  const mobile = matchMedia('(max-width: 900px)').matches;
  const N = mobile ? 72 : 150;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !mobile, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.5 : 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
  camera.position.set(0, 0, 18);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x223366, 1.4));
  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(5, 8, 10);
  scene.add(key);
  const rim = new THREE.PointLight(0x9b7dff, 0, 40);
  rim.position.set(-4, -2, 6);
  scene.add(rim);

  const geo = new THREE.BoxGeometry(1, 1, 1);
  const mat = new THREE.MeshStandardMaterial({ roughness: 0.42, metalness: 0.08, emissive: 0x000000 });
  const mesh = new THREE.InstancedMesh(geo, mat, N);
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  // Ink look for the tech world: flat cel shading plus a bone-white inked outline (inverted hull).
  const ramp = new THREE.DataTexture(new Uint8Array([70, 70, 70, 255, 150, 150, 150, 255, 255, 255, 255, 255]), 3, 1);
  ramp.minFilter = ramp.magFilter = THREE.NearestFilter; ramp.needsUpdate = true;
  const toon = new THREE.MeshToonMaterial({ gradientMap: ramp });
  const lineMat = new THREE.MeshBasicMaterial({ color: '#ece6d8', side: THREE.BackSide, transparent: true, opacity: 0 });
  const lines = new THREE.InstancedMesh(geo, lineMat, N);
  lines.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  const root = new THREE.Group();
  root.add(lines, mesh);
  scene.add(root);

  // per-instance state
  const cur = Array.from({ length: N }, () => ({ p: new THREE.Vector3((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20, -10), r: new THREE.Euler(), s: new THREE.Vector3(0.01, 0.01, 0.01), c: new THREE.Color('#ffffff') }));
  let tgt = [];
  let world = 'tech';
  const seed = Array.from({ length: N }, (_, i) => ({ a: Math.random() * Math.PI * 2, b: Math.random(), k: (i * 0.6180339) % 1 }));

  function formation(w) {
    const pal = PALETTES[w].map((c) => new THREE.Color(c));
    const out = [];
    for (let i = 0; i < N; i++) {
      const s = seed[i];
      let p, r, sc;
      if (w === 'tech') {
        // stepped voxel island, like a Roblox baseplate floating in the sky
        const side = Math.ceil(Math.sqrt(N * 0.8));
        const gx = i % side, gz = Math.floor(i / side) % side;
        const cx = gx - side / 2, cz = gz - side / 2;
        const h = Math.max(0, Math.round(3.2 - Math.hypot(cx, cz) * 0.55 + Math.sin(gx * 1.3) * 0.6));
        if (i < N * 0.8) p = new THREE.Vector3(cx * 1.04, h * 1.04 - 2.5, cz * 1.04);
        else p = new THREE.Vector3((s.b - 0.5) * 16, 3 + s.k * 5, (s.a - 3) * 1.2); // a few floating blocks
        r = new THREE.Euler(0, 0, 0);
        const u = i < N * 0.8 ? 1 : 0.55 + s.b * 0.5;
        sc = new THREE.Vector3(u, u, u);
      } else if (w === '3d') {
        // spiralling shadow vortex
        const t = i / N;
        const ang = t * Math.PI * 9 + s.a * 0.15;
        const rad = 1.4 + t * 7.5;
        p = new THREE.Vector3(Math.cos(ang) * rad, (t - 0.5) * 4 + Math.sin(ang * 2) * 0.6, Math.sin(ang) * rad * 0.55 - 2);
        r = new THREE.Euler(s.a, s.b * 3, s.k * 2);
        const u = 0.25 + (1 - t) * 0.9 * (0.6 + s.b * 0.6);
        sc = new THREE.Vector3(u, u, u);
      } else {
        // film ribbon: flat frames along a sine wave
        const t = i / N;
        const x = (t - 0.5) * 34;
        p = new THREE.Vector3(x, Math.sin(t * Math.PI * 3) * 2.4 + 0.5, Math.cos(t * Math.PI * 3) * 2 - 3);
        r = new THREE.Euler(0, Math.sin(t * Math.PI * 3) * 0.5, Math.cos(t * Math.PI * 3) * 0.2);
        sc = new THREE.Vector3(0.36, 0.62, 0.05);
      }
      const ci = w === 'video' ? (i % 13 === 0 ? 2 : [0, 1, 3, 4, 5][i % 5]) : Math.floor(s.k * pal.length);
      out.push({ p, r, s: sc, c: pal[ci] });
    }
    return out;
  }

  function setWorld(w) {
    world = w;
    tgt = formation(w);
    rim.intensity = w === '3d' ? 60 : 0;
    mat.emissive.set(w === '3d' ? '#2a1466' : '#000000');
    mat.emissiveIntensity = w === '3d' ? 0.6 : 0;
    mat.roughness = w === 'video' ? 0.25 : 0.42;
    mesh.material = w === 'tech' ? toon : mat;
    lineTarget = w === 'tech' ? 1 : 0;
    bgTarget.set(BG[w]);
    if (reduced) snap();
  }
  let lineTarget = 0;
  const bg = new THREE.Color(BG.tech), bgTarget = new THREE.Color(BG.tech);
  const big = new THREE.Vector3();
  scene.background = bg;

  function snap() { cur.forEach((c, i) => { c.p.copy(tgt[i].p); c.r.copy(tgt[i].r); c.s.copy(tgt[i].s); c.c.copy(tgt[i].c); }); }

  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), pv = new THREE.Vector3();
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  addEventListener('pointermove', (ev) => { mouse.tx = ev.clientX / innerWidth - 0.5; mouse.ty = ev.clientY / innerHeight - 0.5; }, { passive: true });

  let w = 0, h = 0;
  function resize() {
    w = innerWidth; h = innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  addEventListener('resize', resize);
  resize();

  let running = true, last = performance.now(), dim = false, frame = 0;
  const clock = { t: 0 };
  function tick(now) {
    if (!running) return;
    requestAnimationFrame(tick);
    frame++;
    if (dim && frame % 2) return; // half rate when it's only ambient
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (!reduced) clock.t += dt;
    const t = clock.t;
    const k = 1 - Math.pow(0.0025, dt); // smooth follow

    mouse.x += (mouse.tx - mouse.x) * 0.05; mouse.y += (mouse.ty - mouse.y) * 0.05;
    const wide = w > 900;
    root.position.x += ((wide ? (world === 'video' ? 0 : world === 'tech' ? 5.2 : 4.2) : 0) - root.position.x) * k;
    root.position.y += ((wide ? (world === 'tech' ? -0.4 : 0) : (world === 'video' ? 3 : 3.2)) - root.position.y) * k;
    const baseRY = world === 'tech' ? -0.6 + t * 0.06 : world === '3d' ? t * 0.12 : 0;
    const baseRX = world === 'tech' ? 0.42 : world === '3d' ? 0.25 : 0;
    root.rotation.y += (baseRY + mouse.x * 0.5 - root.rotation.y) * k;
    root.rotation.x += (baseRX + mouse.y * 0.3 - root.rotation.x) * k;
    const sc = (wide ? 1 : 0.6) * (world === 'tech' ? 0.66 : 1);
    root.scale.setScalar(root.scale.x + (sc - root.scale.x) * k);

    for (let i = 0; i < N; i++) {
      const c = cur[i], g = tgt[i], s = seed[i];
      const kk = Math.min(1, k * (0.7 + s.b * 0.6));
      c.p.lerp(g.p, kk); c.s.lerp(g.s, kk); c.c.lerp(g.c, kk);
      c.r.x += (g.r.x - c.r.x) * kk; c.r.y += (g.r.y - c.r.y) * kk; c.r.z += (g.r.z - c.r.z) * kk;
      pv.copy(c.p);
      e.copy(c.r);
      if (world === 'tech') { pv.y += Math.sin(t * 1.2 + s.a) * (i >= N * 0.8 ? 0.35 : 0.04); if (i >= N * 0.8) e.y += t * 0.6 * (s.b - 0.5); }
      else if (world === '3d') { e.x += t * 0.4 * (s.b + 0.2); e.y += t * 0.3; pv.y += Math.sin(t + s.a) * 0.25; }
      else { pv.x = ((c.p.x + t * 1.6 + 17) % 34 + 34) % 34 - 17; pv.y += Math.sin(t * 0.8 + pv.x * 0.2) * 0.4; }
      q.setFromEuler(e);
      m4.compose(pv, q, c.s);
      mesh.setMatrixAt(i, m4);
      mesh.setColorAt(i, c.c);
      big.set(c.s.x + 0.09, c.s.y + 0.09, c.s.z + 0.09);
      m4.compose(pv, q, big);
      lines.setMatrixAt(i, m4);
    }
    lineMat.opacity += (lineTarget - lineMat.opacity) * k;
    lines.visible = lineMat.opacity > 0.01;
    lines.instanceMatrix.needsUpdate = true;
    mesh.instanceMatrix.needsUpdate = true;
    mesh.instanceColor.needsUpdate = true;
    bg.lerp(bgTarget, k);
    renderer.render(scene, camera);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) running = false;
    else if (!running) { running = true; last = performance.now(); requestAnimationFrame(tick); }
  });

  setWorld(document.documentElement.dataset.world || 'tech');
  requestAnimationFrame(tick);
  return { setWorld, setDim: (v) => (dim = v) };
}
