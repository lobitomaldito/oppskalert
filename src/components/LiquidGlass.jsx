import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const MAX_DROPLETS = 40;
const FIXED_DT_MS = 8;
const MAX_FRAME_DT_MS = 100;
const MAX_CATCHUP = 6;

const vertSrc = `void main(){ gl_Position = vec4(position, 1.0); }`;

const fragSrc = `
precision highp float;
#define MAX_N 80

uniform vec2      uRes;
uniform sampler2D uData;
uniform sampler2D uBg;
uniform int       uCount;
uniform float     uTime;

void main(){
  vec2  uv  = gl_FragCoord.xy / uRes;
  float asp = uRes.x / uRes.y;
  vec2  p   = (uv - 0.5) * vec2(asp, 1.0);

  float field = 0.0;
  vec2  grad  = vec2(0.0);
  vec2  lens  = vec2(0.0);
  float lensW = 0.0;

  for(int i = 0; i < MAX_N; i++){
    if(i >= uCount) break;
    vec4  d = texture2D(uData, vec2((float(i)+0.5)/float(MAX_N), 0.5));
    vec2  c = d.xy;
    float r = d.z;
    if(r < 0.001) continue;
    vec2  delta = p - c;
    float dSq   = dot(delta, delta) + 1e-5;
    float contrib = r * r / dSq;
    field += contrib;
    grad  += -2.0 * contrib / dSq * delta;

    float w = r * r / (dSq + r * r);
    lens += (c - p) * w;
    lensW += w;
  }

  lens /= (lensW + 0.001);
  float lensLen = length(lens);

  float thr  = 1.0;
  float edge = smoothstep(thr - 0.08, thr + 0.03, field);

  float refractStrength = 0.035;
  float mappedLens = atan(lensLen * 6.0) * refractStrength;
  vec2  refractDir = (lensLen > 1e-5) ? lens / lensLen : vec2(0.0);
  float refractMask = smoothstep(thr - 0.2, thr + 1.5, field);
  vec2  refractedUV = clamp(uv + refractDir * mappedLens * refractMask, 0.001, 0.999);

  vec3  bgClean = texture2D(uBg, uv).rgb;

  float gradLen = length(grad);
  float nScale = atan(gradLen * 0.5) * 0.3;
  vec2  nGrad  = (gradLen > 1e-4) ? (grad / gradLen) * nScale : vec2(0.0);
  vec3  N = normalize(vec3(-nGrad, 1.0));
  vec3  L = normalize(vec3(0.3, 0.6, 1.0));
  vec3  V = vec3(0.0, 0.0, 1.0);
  vec3  H = normalize(L + V);
  float diff = max(dot(N, L), 0.0);
  float spec = pow(max(dot(N, H), 0.0), 180.0);

  float cosTheta = max(dot(N, V), 0.0);
  float fresnel  = 0.04 + 0.96 * pow(1.0 - cosTheta, 4.0);

  float rim = smoothstep(thr + 0.6, thr, field) * edge;

  float caStr = 0.0018 * edge;
  vec3 bgCA;
  bgCA.r = texture2D(uBg, refractedUV + vec2(caStr, caStr * 0.5)).r;
  bgCA.g = texture2D(uBg, refractedUV).g;
  bgCA.b = texture2D(uBg, refractedUV - vec2(caStr, caStr * 0.5)).b;

  float depth = smoothstep(thr, thr + 3.0, field);
  vec3  tint  = mix(vec3(1.0), vec3(0.93, 0.96, 1.0), depth * 0.45);

  vec3 glassColor = bgCA * tint * (0.92 + 0.08 * diff)
                  + vec3(1.0) * spec * 0.85
                  + vec3(0.9, 0.95, 1.0) * rim * 0.22
                  + vec3(1.0) * fresnel * 0.10;

  float shadowField = smoothstep(thr - 0.35, thr - 0.05, field);
  vec3 bg = bgClean * (1.0 - shadowField * 0.06);

  float borderOuter = smoothstep(thr - 0.10, thr - 0.01, field);
  float borderInner = smoothstep(thr + 0.0, thr + 0.06, field);
  float border = borderOuter * (1.0 - borderInner) * 0.28;

  vec3  col = mix(bg, glassColor, edge);
  col += vec3(1.0) * border;

  gl_FragColor = vec4(col, 1.0);
}
`;

const LiquidGlass = ({ className }) => {
  const containerRef = useRef();
  const canvasRef = useRef();
  const requestRef = useRef();
  
  // Physics state
  const dropsRef = useRef([]);
  const mouseRef = useRef({ x: 999, y: 999, active: false, down: false });
  const lastTimeRef = useRef(performance.now());
  const accRef = useRef(0);
  const uidRef = useRef(0);
  const aspectRef = useRef(1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Background Canvas
    const bgCanvas = document.createElement("canvas");
    const bgCtx = bgCanvas.getContext("2d");
    const bgTexture = new THREE.CanvasTexture(bgCanvas);
    bgTexture.minFilter = THREE.LinearFilter;
    bgTexture.magFilter = THREE.LinearFilter;

    const drawBackground = () => {
      const w = renderer.domElement.width;
      const h = renderer.domElement.height;
      bgCanvas.width = w;
      bgCanvas.height = h;

      // Match Midnight Violet Palette
      // Background: #201335
      // Dusty Grape: #4f4789
      const grd = bgCtx.createLinearGradient(0, 0, w * 0.6, h);
      grd.addColorStop(0, "#201335");
      grd.addColorStop(0.35, "#201335");
      grd.addColorStop(0.6, "#4f4789");
      grd.addColorStop(1, "#201335");
      bgCtx.fillStyle = grd;
      bgCtx.fillRect(0, 0, w, h);

      // Decorative colour waves
      bgCtx.save();
      bgCtx.globalAlpha = 0.2;
      for (let i = 0; i < 5; i++) {
        const cx = w * (0.2 + i * 0.18);
        const cy = h * (0.3 + Math.sin(i * 1.3) * 0.25);
        const rg = bgCtx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.35);
        // Sandy Brown: #ffb17a, Banana Cream: #fce762
        const colors = ["#ffb17a", "#4f4789", "#fce762", "#ffb17a", "#4f4789"];
        rg.addColorStop(0, colors[i % colors.length]);
        rg.addColorStop(1, "rgba(32, 19, 53, 0)");
        bgCtx.fillStyle = rg;
        bgCtx.fillRect(0, 0, w, h);
      }
      bgCtx.restore();

      bgTexture.needsUpdate = true;
    };

    drawBackground();

    const MAX_ENTRIES = MAX_DROPLETS * 2;
    const dropletBuf = new Float32Array(MAX_ENTRIES * 4);
    const dropletTex = new THREE.DataTexture(
      dropletBuf,
      MAX_ENTRIES,
      1,
      THREE.RGBAFormat,
      THREE.FloatType,
    );
    dropletTex.minFilter = THREE.NearestFilter;
    dropletTex.magFilter = THREE.NearestFilter;
    dropletTex.needsUpdate = true;

    const mat = new THREE.ShaderMaterial({
      vertexShader: vertSrc,
      fragmentShader: fragSrc,
      uniforms: {
        uRes: { value: new THREE.Vector2(renderer.domElement.width, renderer.domElement.height) },
        uData: { value: dropletTex },
        uBg: { value: bgTexture },
        uCount: { value: 0 },
        uTime: { value: 0 },
      },
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
    scene.add(mesh);

    aspectRef.current = container.clientWidth / container.clientHeight;

    const spawn = (x, y, r, vx = 0, vy = 0) => {
      if (dropsRef.current.length >= MAX_DROPLETS) return null;
      const area = Math.PI * r * r;
      const angle = Math.random() * Math.PI * 2;
      const spd = 0.0003 + Math.random() * 0.0008;
      const d = {
        id: uidRef.current++,
        x, y, r, area,
        vx: vx || Math.cos(angle) * spd,
        vy: vy || Math.sin(angle) * spd,
        alive: true,
        wanderAngle: Math.random() * Math.PI * 2,
        wanderSpeed: 0.3 + Math.random() * 0.5,
        softPrevX: x, softPrevY: y,
        softOffX: 0, softOffY: 0,
        softVelX: 0, softVelY: 0,
      };
      dropsRef.current.push(d);
      return d;
    };

    // Physics parameters
    const DAMP = 0.993;
    const MOUSE_R = 0.18;
    const MOUSE_F = 0.004;
    const TENSION_RANGE = 0.12;
    const TENSION_F = 0.0004;
    const MERGE_RATIO = 0.62;
    const SPLIT_SPEED = 0.013;
    const SPLIT_MIN_R = 0.04;
    const MAX_SPEED = 0.015;
    const BOUNCE = 0.4;
    const WANDER_F = 0.00004;
    const CENTER_PULL = 0.000008;

    const fixedUpdate = () => {
      const drops = dropsRef.current;
      const mouse = mouseRef.current;
      const aspect = aspectRef.current;

      // Forces
      for (const d of drops) {
        d.wanderAngle += (Math.random() - 0.5) * d.wanderSpeed;
        d.vx += Math.cos(d.wanderAngle) * WANDER_F;
        d.vy += Math.sin(d.wanderAngle) * WANDER_F;
        d.vx -= d.x * CENTER_PULL;
        d.vy -= d.y * CENTER_PULL;

        if (mouse.active) {
          const dx = d.x - mouse.x;
          const dy = d.y - mouse.y;
          const dSq = dx * dx + dy * dy;
          const rr = MOUSE_R + d.r;
          if (dSq < rr * rr && dSq > 1e-5) {
            const dist = Math.sqrt(dSq);
            const s = 1 - dist / rr;
            const f = s * s * MOUSE_F;
            d.vx += (dx / dist) * f;
            d.vy += (dy / dist) * f;
          }
        }
      }

      // Tension
      for (let i = 0; i < drops.length; i++) {
        const a = drops[i];
        for (let j = i + 1; j < drops.length; j++) {
          const b = drops[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dSq = dx * dx + dy * dy;
          const rng = TENSION_RANGE + a.r + b.r;
          if (dSq < rng * rng && dSq > 1e-5) {
            const dist = Math.sqrt(dSq);
            const s = 1 - dist / rng;
            const f = s * TENSION_F;
            a.vx += (dx / dist) * f;
            a.vy += (dy / dist) * f;
            b.vx -= (dx / dist) * f;
            b.vy -= (dy / dist) * f;
          }
        }
      }

      // Integration
      for (const d of drops) {
        const sp = Math.sqrt(d.vx * d.vx + d.vy * d.vy);
        if (sp > MAX_SPEED) {
          const s = MAX_SPEED / sp;
          d.vx *= s; d.vy *= s;
        }
        d.x += d.vx; d.y += d.vy;
        d.vx *= DAMP; d.vy *= DAMP;

        const wx = aspect * 0.5;
        const wy = 0.5;
        if (d.x - d.r < -wx) { d.x = -wx + d.r; d.vx = Math.abs(d.vx) * BOUNCE; }
        if (d.x + d.r > wx) { d.x = wx - d.r; d.vx = -Math.abs(d.vx) * BOUNCE; }
        if (d.y - d.r < -wy) { d.y = -wy + d.r; d.vy = Math.abs(d.vy) * BOUNCE; }
        if (d.y + d.r > wy) { d.y = wy - d.r; d.vy = -Math.abs(d.vy) * BOUNCE; }
      }

      // Merge
      for (let i = 0; i < drops.length; i++) {
        const a = drops[i];
        if (!a.alive) continue;
        for (let j = i + 1; j < drops.length; j++) {
          const b = drops[j];
          if (!b.alive) continue;
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < (a.r + b.r) * MERGE_RATIO) {
            const na = a.area + b.area;
            a.x = (a.x * a.area + b.x * b.area) / na;
            a.y = (a.y * a.area + b.y * b.area) / na;
            a.vx = (a.vx * a.area + b.vx * b.area) / na;
            a.vy = (a.vy * a.area + b.vy * b.area) / na;
            a.r = Math.sqrt(na / Math.PI);
            a.area = na;
            b.alive = false;
          }
        }
      }
      dropsRef.current = dropsRef.current.filter(d => d.alive);

      // Split
      const add = [];
      for (const d of dropsRef.current) {
        if (d.r < SPLIT_MIN_R) continue;
        const sp = Math.sqrt(d.vx * d.vx + d.vy * d.vy);
        if (sp < SPLIT_SPEED) continue;
        const ha = d.area * 0.5;
        const nr = Math.sqrt(ha / Math.PI);
        const nx = -d.vy / sp;
        const ny = d.vx / sp;
        const off = nr * 0.7;
        d.r = nr; d.area = ha;
        d.x -= nx * off; d.y -= ny * off;
        add.push({
          id: uidRef.current++,
          x: d.x + nx * off * 2, y: d.y + ny * off * 2,
          r: nr, area: ha,
          vx: d.vx + nx * sp * 0.35, vy: d.vy + ny * sp * 0.35,
          alive: true, wanderAngle: Math.random() * Math.PI * 2, wanderSpeed: 0.3 + Math.random() * 0.5,
          softPrevX: d.x + nx * off * 2, softPrevY: d.y + ny * off * 2,
          softOffX: 0, softOffY: 0, softVelX: 0, softVelY: 0,
        });
      }
      for (const a of add) if (dropsRef.current.length < MAX_DROPLETS) dropsRef.current.push(a);

      // Soft body
      for (const d of dropsRef.current) {
        const dx = d.x - d.softPrevX;
        const dy = d.y - d.softPrevY;
        d.softVelX += (dx - d.softOffX) * 0.22;
        d.softVelY += (dy - d.softOffY) * 0.22;
        d.softVelX *= 0.6; d.softVelY *= 0.6;
        d.softOffX += d.softVelX; d.softOffY += d.softVelY;
        d.softPrevX = d.x; d.softPrevY = d.y;
      }
    };

    const sync = () => {
      const drops = dropsRef.current;
      dropletBuf.fill(0);
      const n = Math.min(drops.length, MAX_DROPLETS);
      for (let i = 0; i < n; i++) {
        const d = drops[i];
        dropletBuf[i * 4] = d.x;
        dropletBuf[i * 4 + 1] = d.y;
        dropletBuf[i * 4 + 2] = d.r;
        dropletBuf[i * 4 + 3] = 1;

        const ghostScale = 0.7;
        const trailStr = 3.5;
        const gi = (MAX_DROPLETS + i) * 4;
        dropletBuf[gi] = d.x - d.softOffX * trailStr;
        dropletBuf[gi + 1] = d.y - d.softOffY * trailStr;
        dropletBuf[gi + 2] = d.r * ghostScale;
        dropletBuf[gi + 3] = 1;
      }
      dropletTex.needsUpdate = true;
      mat.uniforms.uCount.value = n * 2;
    };

    // Initial seed
    for (let i = 0; i < 12; i++) {
      spawn((Math.random() - 0.5) * 0.7, (Math.random() - 0.5) * 0.5, 0.03 + Math.random() * 0.05);
    }

    const onPointerMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * aspectRef.current;
      mouseRef.current.y = 0.5 - (e.clientY - rect.top) / rect.height;
      mouseRef.current.active = true;
    };
    const onPointerDown = () => { mouseRef.current.down = true; };
    const onPointerUp = () => { mouseRef.current.down = false; };
    const onPointerLeave = () => { mouseRef.current.active = false; mouseRef.current.down = false; };

    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointerup", onPointerUp);
    renderer.domElement.addEventListener("pointerleave", onPointerLeave);

    const onResize = () => {
      if (!container) return;
      renderer.setSize(container.clientWidth, container.clientHeight);
      aspectRef.current = container.clientWidth / container.clientHeight;
      mat.uniforms.uRes.value.set(renderer.domElement.width, renderer.domElement.height);
      drawBackground();
    };
    window.addEventListener("resize", onResize);

    const animate = () => {
      const now = performance.now();
      const dt = Math.min(now - lastTimeRef.current, MAX_FRAME_DT_MS);
      lastTimeRef.current = now;
      accRef.current += dt;

      let g = 0;
      while (accRef.current >= FIXED_DT_MS && g < MAX_CATCHUP) {
        fixedUpdate();
        accRef.current -= FIXED_DT_MS;
        g++;
      }
      if (g >= MAX_CATCHUP) accRef.current = 0;

      mat.uniforms.uTime.value = now * 0.001;
      sync();
      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", onResize);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
      renderer.domElement.removeEventListener("pointerleave", onPointerLeave);
      cancelAnimationFrame(requestRef.current);
      renderer.dispose();
      mat.dispose();
      bgTexture.dispose();
      dropletTex.dispose();
      // Only remove if it's still a child
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className={`absolute inset-0 z-0 h-full overflow-hidden ${className}`} />;
};

export default LiquidGlass;
