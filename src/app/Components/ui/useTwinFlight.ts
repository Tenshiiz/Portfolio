import { useEffect, type RefObject } from "react";

const DURATION_S = 8;
const HALF_GAP = 20;
const TRAIL = 380;
const MAX_BEND_DEG = 42;
const FIRST_FLIGHT_MS = 3000;
const PAUSE_MS = { min: 24000, max: 38000 };

interface TrailPoint {
  x: number;
  y: number;
  /** Direção (rad) no instante em que o ponto foi gravado; define a normal do deslocamento lateral. */
  h: number;
}

interface Flight {
  x: number;
  y: number;
  base: number;
  speed: number;
  /** Desvio atual da direção base, em graus, causado pela velocidade de rolagem. */
  bend: number;
  /** Velocidade de rolagem suavizada, em px/s. */
  vel: number;
  t: number;
  dying: number;
  lastY: number;
  last: number;
  pts: TrailPoint[];
}

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

/** Lê uma variável CSS de cor hexadecimal e devolve "r,g,b"; o canvas não enxerga classes do Tailwind. */
function readRgb(name: string, fallback: string): string {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim().replace("#", "");
  const hex = raw.length === 3 ? raw.replace(/./g, "$&$&") : raw;
  const n = parseInt(hex, 16);
  return Number.isNaN(n) ? fallback : `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}

/**
 * Voo de duas estrelas douradas sobre o canvas do céu. Nascem no meio da tela, seguem lado a lado a uma
 * distância fixa e apagam. A direção reage à velocidade de rolagem e o rastro é o histórico real das
 * posições, então ele curva junto. O canvas só é exibido e só gasta quadros durante o voo.
 * Não faz nada com `prefers-reduced-motion`; também não inicia voo com a aba oculta.
 */
export function useTwinFlight(canvasRef: RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const g = canvas?.getContext("2d");
    if (!canvas || !g || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gold = readRgb("--color-gold", "255,206,112");
    const core = readRgb("--color-gold-core", "255,243,214");

    let dpr = 1;
    const fit = () => {
      // Viewport lógica, nunca `screen.*`; `dpr` limitado a 2 para conter a área rasterizada.
      dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.round(innerWidth * dpr);
      canvas.height = Math.round(innerHeight * dpr);
    };
    fit();
    addEventListener("resize", fit);

    const sprite = document.createElement("canvas");
    sprite.width = sprite.height = 64;
    const sg = sprite.getContext("2d")!;
    const radial = sg.createRadialGradient(32, 32, 0, 32, 32, 32);
    radial.addColorStop(0, `rgba(${core},1)`);
    radial.addColorStop(0.1, `rgba(${gold},0.95)`);
    radial.addColorStop(0.32, `rgba(${gold},0.32)`);
    radial.addColorStop(1, `rgba(${gold},0)`);
    sg.fillStyle = radial;
    sg.fillRect(0, 0, 64, 64);

    let flight: Flight | null = null;
    let timer = 0;
    let raf = 0;

    const schedule = () => {
      timer = window.setTimeout(launch, PAUSE_MS.min + Math.random() * (PAUSE_MS.max - PAUSE_MS.min));
    };

    const launch = () => {
      if (document.hidden) return schedule();
      const w = innerWidth;
      const h = innerHeight;
      flight = {
        x: w * (0.4 + Math.random() * 0.2),
        y: h * (0.42 + Math.random() * 0.22),
        base: -(9 + Math.random() * 9) * (Math.PI / 180),
        speed: Math.max(180, w * 0.15),
        bend: 0,
        vel: 0,
        t: 0,
        dying: 0,
        lastY: scrollY,
        last: performance.now(),
        pts: [],
      };
      canvas.style.display = "block";
      raf = requestAnimationFrame(step);
    };

    const step = (now: number) => {
      const f = flight;
      if (!f) return;
      const w = innerWidth;
      const h = innerHeight;
      // Um quadro pausado (aba oculta) não vira salto.
      const dt = Math.min(0.05, (now - f.last) / 1000);
      f.last = now;
      f.t += dt;

      // Rolar para baixo curva a trajetória para baixo; rolar para cima, para cima.
      const instant = dt > 0 ? (scrollY - f.lastY) / dt : 0;
      f.lastY = scrollY;
      f.vel += (instant - f.vel) * (1 - Math.exp(-dt / 0.12));
      const target = clamp(f.vel / 45, -MAX_BEND_DEG, MAX_BEND_DEG);
      f.bend += (target - f.bend) * (1 - Math.exp(-dt / 0.45));

      const heading = f.base + f.bend * (Math.PI / 180);
      f.x += Math.cos(heading) * f.speed * dt;
      f.y += Math.sin(heading) * f.speed * dt;
      f.pts.unshift({ x: f.x, y: f.y, h: heading });

      let length = 0;
      let keep = f.pts.length;
      for (let i = 1; i < f.pts.length; i++) {
        length += Math.hypot(f.pts[i].x - f.pts[i - 1].x, f.pts[i].y - f.pts[i - 1].y);
        if (length > TRAIL) {
          keep = i + 1;
          break;
        }
      }
      f.pts.length = keep;

      // Saiu da tela por causa da curva: apaga em ~0,8s em vez de cortar.
      const outside = f.x < -200 || f.x > w + 200 || f.y < -200 || f.y > h + 200;
      if (outside && f.t > 1.5) f.dying += dt / 0.8;

      const progress = f.t / DURATION_S;
      const alpha =
        clamp(progress / 0.18, 0, 1) * clamp((1 - progress) / 0.3, 0, 1) * (1 - clamp(f.dying, 0, 1));

      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.clearRect(0, 0, w, h);
      g.lineCap = "round";

      for (const side of [-1, 1]) {
        const offset = side * HALF_GAP;
        // Cada ponto é deslocado ao longo da própria normal: as duas curvas ficam paralelas, à mesma distância.
        const line = f.pts.map((p) => ({ x: p.x - Math.sin(p.h) * offset, y: p.y + Math.cos(p.h) * offset }));
        let walked = 0;
        for (let i = 0; i + 2 < line.length; i += 2) {
          walked += Math.hypot(line[i + 2].x - line[i].x, line[i + 2].y - line[i].y);
          const k = Math.pow(Math.max(0, 1 - walked / TRAIL), 1.5);
          g.beginPath();
          g.moveTo(line[i].x, line[i].y);
          g.lineTo(line[i + 2].x, line[i + 2].y);
          g.strokeStyle = `rgba(${gold},${(alpha * k * 0.14).toFixed(3)})`;
          g.lineWidth = 3 + 6 * k;
          g.stroke();
          g.strokeStyle = `rgba(${gold},${(alpha * k * 0.95).toFixed(3)})`;
          g.lineWidth = 0.5 + 1.9 * k;
          g.stroke();
        }

        const head = line[0];
        if (!head) continue;
        g.globalAlpha = alpha;
        g.drawImage(sprite, head.x - 26, head.y - 26, 52, 52);
        g.fillStyle = `rgb(${core})`;
        g.beginPath();
        g.arc(head.x, head.y, 2.3, 0, Math.PI * 2);
        g.fill();
        g.globalAlpha = 1;

        const pulse = 0.75 + 0.25 * Math.sin(f.t * 2.4 + side);
        const arm = 16 * pulse;
        g.strokeStyle = `rgba(${core},${(alpha * 0.7 * pulse).toFixed(3)})`;
        g.lineWidth = 1;
        g.beginPath();
        g.moveTo(head.x - arm, head.y);
        g.lineTo(head.x + arm, head.y);
        g.moveTo(head.x, head.y - arm);
        g.lineTo(head.x, head.y + arm);
        g.stroke();
      }

      if (f.t < DURATION_S && f.dying < 1) {
        raf = requestAnimationFrame(step);
        return;
      }
      g.clearRect(0, 0, w, h);
      canvas.style.display = "none";
      flight = null;
      schedule();
    };

    timer = window.setTimeout(launch, FIRST_FLIGHT_MS);

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
      removeEventListener("resize", fit);
      canvas.style.display = "none";
    };
  }, [canvasRef]);
}
