"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Valores em hex porque são aplicados via `element.style`, fora do alcance das classes do Tailwind.
const COLORS = ["#00FFFF", "#9333EA", "#E879F9"];
const PARTICLES_COUNT = 50;
const PARTICLES_COUNT_MOBILE = 20;
const MOBILE_QUERY = "(max-width: 767px)";
const REPOSITION_INTERVAL_MS = 10000;

interface Particle {
  element: HTMLDivElement;
  /** Posição inicial em % do contêiner; o deslocamento é medido a partir dela. */
  baseX: number;
  baseY: number;
}

/** Halo pulsante; com movimento reduzido fica parado num valor intermediário. */
const Spotlight = ({ className = "" }: { className?: string }) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      // Classes arbitrárias do Tailwind não aceitam espaço: o valor do gradiente usa vírgulas coladas.
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[200%] w-[150%] bg-[radial-gradient(circle,rgba(0,255,255,0.1),transparent_40%)] rounded-full pointer-events-none z-0 ${className}`}
      animate={
        reduceMotion
          ? { opacity: 0.65, scale: 1 }
          : { opacity: [0.5, 0.8, 0.5], scale: [1, 1.15, 1] }
      }
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 5, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }
      }
    />
  );
};

/**
 * Fundo decorativo do hero: halo pulsante e partículas posicionadas por DOM imperativo.
 * As partículas são criadas fora do React para evitar dezenas de nós reconciliados e
 * se movem por `transform`, que não força layout a cada quadro (`left`/`top` forçavam).
 * Com `prefers-reduced-motion`, nenhuma partícula é criada.
 */
export default function ParticlesContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || reduceMotion) return;

    const count = window.matchMedia(MOBILE_QUERY).matches ? PARTICLES_COUNT_MOBILE : PARTICLES_COUNT;
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const element = document.createElement("div");
      element.classList.add("absolute", "rounded-full", "pointer-events-none");
      element.dataset.particle = "";

      const size = 1 + Math.random() * 2;
      const baseX = Math.random() * 100;
      const baseY = Math.random() * 100;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const speed = 10 + Math.random() * 20;

      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      element.style.left = `${baseX}%`;
      element.style.top = `${baseY}%`;
      element.style.opacity = (0.1 + Math.random() * 0.5).toString();
      element.style.backgroundColor = color;
      element.style.boxShadow = `0 0 ${size * 2}px ${color}`;
      element.style.willChange = "transform";
      element.style.transition = `transform ${speed}s linear`;
      // Atraso fixo por partícula: desfasa o início de cada ciclo sem um `setTimeout` por partícula.
      element.style.transitionDelay = `${Math.random() * 1000}ms`;

      container.appendChild(element);
      particles.push({ element, baseX, baseY });
    }

    let timeoutId = 0;
    const animateParticles = () => {
      // Medido a cada ciclo: o deslocamento é em px porque `translate` em % é relativo à própria partícula.
      const { width, height } = container.getBoundingClientRect();
      for (const { element, baseX, baseY } of particles) {
        const dx = ((Math.random() * 100 - baseX) * width) / 100;
        const dy = ((Math.random() * 100 - baseY) * height) / 100;
        element.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      }
      timeoutId = window.setTimeout(animateParticles, REPOSITION_INTERVAL_MS);
    };

    animateParticles();

    return () => {
      window.clearTimeout(timeoutId);
      for (const { element } of particles) element.remove();
    };
  }, [reduceMotion]);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden absolute top-0 left-0 w-full h-full z-0"
    >
      <Spotlight />
    </div>
  );
}
