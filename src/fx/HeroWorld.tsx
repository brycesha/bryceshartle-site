import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/** Scroll knob: 0 = golden dusk, 1 = deep night (set by the hero scroll track). */
export const worldCtl = { drive: 0 };

const VERT = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform vec2 uRes; uniform float uTime; uniform float uScroll;
uniform vec2 uMouse; uniform vec3 uClick;

float h1(float n){ return fract(sin(n*127.1)*43758.5453); }
float h2(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }

// one skyline layer: returns rgb + coverage
vec4 layer(vec2 uv, float scale, float seed, float baseY, float hMin, float hMax,
           vec3 body, vec3 winCol, float winAmt, float night, float drift, float detail){
  float x = uv.x*scale + seed + drift;
  float id = floor(x); float f = fract(x);
  float r1 = h1(id+seed), r2 = h1(id*1.7+seed*3.1), r3 = h1(id*2.3+seed*5.7), r4 = h1(id*4.1+seed*7.3);
  float gap = 0.035 + 0.05*r1;
  float inX = step(gap, f) * step(f, 1.0-gap);
  float H = hMin + (hMax-hMin)*pow(r2, 1.4);
  float y = uv.y - baseY;
  float body_m = inX * step(y, H) * step(0.0, y + 1.0);
  // stepped crown
  float crown = 0.0;
  if (r3 > 0.55) {
    float cH = H + 0.03 + 0.07*r4;
    crown = step(0.26, f) * step(f, 0.74) * step(y, cH) * step(H, y);
  }
  // antenna
  float ant = 0.0;
  if (r4 > 0.86) ant = step(abs(f-0.5), 0.004*scale/6.0) * step(y, H+0.16) * step(H, y);
  float cover = clamp(body_m + crown + ant, 0.0, 1.0);

  vec3 col = body;
  // soft vertical shading
  col *= 0.82 + 0.28*smoothstep(-0.3, H, y);
  // window grid
  if (detail > 0.5 && cover > 0.5 && ant < 0.5) {
    float cols = 9.0 + floor(r1*5.0);
    float wx = (f-gap)/(1.0-2.0*gap) * cols;
    float cell = (1.0/scale)/cols;               // square-ish cells
    float wy = y / (cell*1.7);
    vec2 cid = vec2(floor(wx), floor(wy));
    vec2 lc = vec2(fract(wx), fract(wy));
    float win = smoothstep(0.26,0.30,lc.x)*smoothstep(0.74,0.70,lc.x)*smoothstep(0.30,0.34,lc.y)*smoothstep(0.70,0.66,lc.y);
    float rr = h2(cid + vec2(id*13.0, seed));
    float tw = h2(cid + vec2(id*7.0, floor(uTime*0.15)));   // slow, sparse twinkle
    float lit = step(1.0 - winAmt*(0.10+0.30*night), rr) * (0.7 + 0.3*step(0.5, tw));
    // cursor: nearby windows warm up
    vec2 wp = vec2(uv.x, uv.y);
    float d = length(wp - uMouse);
    float near = smoothstep(0.30, 0.0, d);
    lit = max(lit, near * step(0.35, rr) * 0.95);
    // click: ring of light travelling outward
    float ct = uTime - uClick.z;
    float ring = 0.0;
    if (ct > 0.0 && ct < 2.2) {
      float rad = ct*0.75; float dc = length(wp - uClick.xy);
      ring = smoothstep(0.09, 0.0, abs(dc - rad)) * (1.0 - ct/2.2) * step(0.3, rr);
    }
    lit = max(lit, ring);
    lit *= smoothstep(-0.55, 0.05, uv.x);
    vec3 wc = mix(winCol, vec3(1.0,0.9,0.35), clamp(near*1.2 + ring, 0.0, 1.0));
    col = mix(col, wc, win*lit);
    col += wc * win * lit * 0.15;
  }
  return vec4(col, cover);
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5*uRes) / uRes.y;
  float s = clamp(uScroll, 0.0, 1.0);
  float night = smoothstep(0.0, 0.9, s);

  // ---- sky ----
  float hy = -0.20;
  float t = clamp((uv.y - hy)/0.9, 0.0, 1.0);
  vec3 topD = vec3(0.12,0.28,0.62), botD = vec3(0.50,0.64,0.90);
  vec3 topN = vec3(0.00,0.04,0.16), botN = vec3(0.07,0.17,0.40);
  vec3 top = mix(topD, topN, night), bot = mix(botD, botN, night);
  vec3 sky = mix(bot, top, pow(t, 0.7));
  // sun / moon: a clean Michelin-yellow disc that sinks as you scroll
  vec2 sp = vec2(0.46, 0.05 - 0.40*s);
  float sd = length(uv - sp);
  sky += vec3(1.0,0.82,0.12) * 0.22 * exp(-sd*3.2) * (1.0 - 0.4*night);
  sky = mix(sky, vec3(1.0,0.90,0.30), smoothstep(0.125, 0.121, sd) * (1.0 - 0.15*night));
  // horizon glow
  sky += vec3(1.0,0.78,0.25) * 0.10 * exp(-abs(uv.y - hy)*5.0) * (1.0 - night);
  // stars (sparse, only at night)
  vec2 sc = floor((uv + 0.5)*vec2(140.0, 80.0));
  float sr = h2(sc);
  float star = step(0.997, sr) * smoothstep(0.05, 0.4, uv.y) * night * (0.5 + 0.5*sin(uTime*1.3 + sr*60.0));
  sky += vec3(0.85,0.92,1.0) * star;

  vec3 col = sky;
  float fogY = hy;
  vec3 fogC = mix(vec3(0.46,0.60,0.88), vec3(0.06,0.15,0.36), night);

  // ---- skyline layers (far -> near), city sinks as the camera rises ----
  float drift = uTime*0.004;
  vec4 L;
  // far
  L = layer(uv, 7.0, 3.0, -0.30 - s*0.10, 0.10, 0.36, mix(vec3(0.42,0.56,0.84), vec3(0.08,0.19,0.43), night), vec3(0.8,0.9,1.0), 0.0, night, drift*0.5, 0.0);
  col = mix(col, mix(L.rgb, fogC, 0.35), L.a);
  // mid
  L = layer(uv, 5.0, 9.0, -0.36 - s*0.16, 0.08, 0.30, mix(vec3(0.24,0.40,0.72), vec3(0.04,0.11,0.30), night), vec3(0.75,0.88,1.0), 0.5, night, drift*0.8, 1.0);
  col = mix(col, mix(L.rgb, fogC, 0.18), L.a);
  // near
  L = layer(uv, 3.4, 17.0, -0.42 - s*0.24, 0.06, 0.24, mix(vec3(0.10,0.22,0.50), vec3(0.015,0.05,0.17), night), vec3(1.0,0.93,0.65), 0.85, night, drift, 1.0);
  col = mix(col, L.rgb, L.a);
  // foreground slab
  L = layer(uv, 2.1, 31.0, -0.50 - s*0.34, 0.03, 0.12, mix(vec3(0.03,0.09,0.24), vec3(0.0,0.02,0.09), night), vec3(1.0,0.9,0.6), 1.0, night, drift*1.3, 1.0);
  col = mix(col, L.rgb, L.a);

  // soft cursor halo in the air
  float d = length(uv - uMouse);
  col += vec3(1.0,0.88,0.35) * 0.05 * smoothstep(0.45, 0.0, d);

  // legibility: gently darken the text side, vignette, grain
  col *= 1.0 - 0.50*smoothstep(0.2, -0.8, uv.x);
  col *= 1.0 - 0.25*smoothstep(0.6, 1.3, length(uv));
  col += (h2(gl_FragCoord.xy + uTime) - 0.5) * 0.012;
  gl_FragColor = vec4(col, 1.0);
}
`;

export default function HeroWorld() {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = matchMedia('(max-width: 768px)').matches;

    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false }); } catch { el.classList.add('no-gl'); return; }
    const dpr = Math.min(devicePixelRatio, mobile ? 1.25 : 1.5);
    renderer.setPixelRatio(dpr);
    renderer.domElement.className = 'world-gl';
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const uniforms = {
      uRes: { value: new THREE.Vector2(1, 1) }, uTime: { value: 0 }, uScroll: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.3, 0) }, uClick: { value: new THREE.Vector3(0, 0, -10) },
    };
    const mat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms });
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat));

    let W = 1, H = 1;
    const resize = () => {
      W = el.clientWidth || 1; H = el.clientHeight || 1;
      renderer.setSize(W, H, false);
      uniforms.uRes.value.set(W * dpr, H * dpr);
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(el);

    const m = { x: 0.3, y: 0, tx: 0.3, ty: 0, last: -1e9 };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      if (e.clientY < r.top || e.clientY > r.bottom) return;
      m.tx = (e.clientX - r.left - r.width / 2) / r.height;
      m.ty = -(e.clientY - r.top - r.height / 2) / r.height;
      m.last = performance.now();
    };
    const onDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest('a,button')) return;
      const r = el.getBoundingClientRect();
      if (e.clientY < r.top || e.clientY > r.bottom) return;
      uniforms.uClick.value.set((e.clientX - r.left - r.width / 2) / r.height, -(e.clientY - r.top - r.height / 2) / r.height, uniforms.uTime.value);
    };
    addEventListener('pointermove', onMove);
    addEventListener('pointerdown', onDown);

    let raf = 0;
    const t0 = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (scrollY > innerHeight * 3) return;
      // with no pointer for a while, a slow light drifts across the skyline
      if (now - m.last > 3500) { m.tx = Math.sin(now * 0.00022) * 0.6; m.ty = -0.12 + Math.sin(now * 0.00031) * 0.1; }
      m.x += (m.tx - m.x) * 0.06; m.y += (m.ty - m.y) * 0.06;
      uniforms.uTime.value = (now - t0) / 1000;
      uniforms.uScroll.value += (worldCtl.drive - uniforms.uScroll.value) * 0.12;
      uniforms.uMouse.value.set(m.x, m.y);
      renderer.render(scene, cam);
    };
    if (reduce) { uniforms.uScroll.value = 0; renderer.render(scene, cam); }
    else raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf); ro.disconnect();
      removeEventListener('pointermove', onMove); removeEventListener('pointerdown', onDown);
      mat.dispose(); renderer.dispose(); renderer.domElement.remove();
    };
  }, []);

  return <div className="world" ref={wrap} aria-hidden="true" />;
}
