"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { useTwinFlight } from "./useTwinFlight";

interface Constellation {
  left: string;
  /** Posição dentro da camada de estrelas (px), que rola em paralaxe: espalha as figuras ao longo da página. */
  top: number;
  delay: string;
  points: [number, number][];
  edges: [number, number][];
  glints: number[];
}

const CONSTELLATIONS: Constellation[] = [
  {
    left: "6%",
    top: 110,
    delay: "0s",
    points: [[10, 120], [60, 70], [110, 95], [170, 40], [215, 70]],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4]],
    glints: [3],
  },
  {
    left: "72%",
    top: 430,
    delay: "-9s",
    points: [[20, 30], [70, 80], [40, 130], [120, 110], [190, 60], [225, 115]],
    edges: [[0, 1], [1, 2], [1, 3], [3, 4], [3, 5]],
    glints: [1, 4],
  },
  {
    left: "20%",
    top: 860,
    delay: "-17s",
    points: [[15, 70], [75, 35], [130, 80], [95, 135], [200, 110]],
    edges: [[0, 1], [1, 2], [2, 3], [2, 4]],
    glints: [2],
  },
];

const STAR_COLORS = ["--color-ink", "--color-ink", "--color-ink", "--color-neon-cyan", "--color-neon-pink"];

const STAR_FIELDS = [
  { selector: ".sky-stars-far > i", count: 130, mobileCount: 60, spread: 0, glow: 0, min: 0.25, max: 0.55 },
  { selector: ".sky-stars-mid > i", count: 60, mobileCount: 28, spread: 0.5, glow: 1, min: 0.35, max: 0.7 },
  { selector: ".sky-stars-near > i", count: 22, mobileCount: 10, spread: 1, glow: 5, min: 0.5, max: 0.9 },
];

const MOBILE_QUERY = "(max-width: 767px)";

/** Gerador pseudoaleatório com semente: o céu sai igual a cada carga. */
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Fundo da página inteira, fixo atrás do conteúdo: três auroras que mudam de cor com a rolagem
 * (ciano, roxo, rosa), estrelas em três profundidades com paralaxe, constelações que se desenham e o voo
 * das estrelas gêmeas. Estrelas são geradas em `useEffect` para não divergir entre servidor e cliente.
 */
export default function SkyBackground() {
  const skyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useTwinFlight(canvasRef);

  useEffect(() => {
    const sky = skyRef.current;
    if (!sky) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = matchMedia(MOBILE_QUERY).matches;

    const rnd = seeded(20261004);
    const width = Math.max(innerWidth, 1280);
    const height = Math.max(innerHeight, 800) * 1.9;
    for (const field of STAR_FIELDS) {
      const el = sky.querySelector<HTMLElement>(field.selector);
      if (!el) continue;
      const shadows: string[] = [];
      for (let i = 0; i < (mobile ? field.mobileCount : field.count); i++) {
        const x = Math.round(rnd() * width);
        const y = Math.round(rnd() * height);
        const color = STAR_COLORS[Math.floor(rnd() * STAR_COLORS.length)];
        const alpha = Math.round((field.min + rnd() * (field.max - field.min)) * 100);
        shadows.push(`${x}px ${y}px ${field.glow}px ${field.spread}px color-mix(in srgb, var(${color}) ${alpha}%, transparent)`);
      }
      el.style.boxShadow = shadows.join(",");
    }

    let pending = false;
    const update = () => {
      pending = false;
      const y = scrollY;
      const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      const p = Math.min(1, y / max);
      const weight = (center: number) => Math.max(0, 1 - Math.abs(p - center) / 0.62).toFixed(3);
      // Com movimento reduzido a paralaxe fica parada, mas o clima de cor continua acompanhando a seção.
      if (!reduce) sky.style.setProperty("--sy", `${y}px`);
      sky.style.setProperty("--wa", weight(0));
      sky.style.setProperty("--wb", weight(0.5));
      sky.style.setProperty("--wc", weight(1));
    };
    const onScroll = () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(update);
    };

    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    update();
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={skyRef} className="sky" aria-hidden="true" data-sky>
      <div className="sky-aurora sky-aurora-cyan"><i /></div>
      <div className="sky-aurora sky-aurora-purple"><i /></div>
      <div className="sky-aurora sky-aurora-pink"><i /></div>

      <div className="sky-stars sky-stars-far"><i /></div>
      <div className="sky-stars sky-stars-mid">
        <i />
        {CONSTELLATIONS.map((c) => (
          <svg
            key={c.left}
            className="sky-constellation"
            style={{ left: c.left, top: c.top, "--d": c.delay } as CSSProperties}
            width="240"
            height="160"
            viewBox="0 0 240 160"
            fill="none"
          >
            {c.edges.map(([a, b]) => (
              <path key={`${a}-${b}`} pathLength={1} d={`M${c.points[a].join(" ")}L${c.points[b].join(" ")}`} />
            ))}
            {c.points.map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r={1.6} />
            ))}
            {c.glints.map((i) => {
              const [x, y] = c.points[i];
              return <path key={i} className="sky-cross" d={`M${x - 7} ${y}H${x + 7}M${x} ${y - 7}V${y + 7}`} />;
            })}
          </svg>
        ))}
      </div>
      <div className="sky-stars sky-stars-near"><i /></div>

      <canvas ref={canvasRef} className="sky-canvas" />
      <div className="sky-vignette" />
      <div className="sky-grain" />
    </div>
  );
}
