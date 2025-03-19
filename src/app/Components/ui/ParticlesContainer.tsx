import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  speed: number;
}

interface SpotlightProps {
  className?: string;
}

const Spotlight = ({ className = "" }: SpotlightProps) => {
  return (
    <motion.div
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[200%] w-[150%] 
                  bg-[radial-gradient(circle,rgba(15, 255, 255, 0.1),transparent_40%)] rounded-full 
                  pointer-events-none z-0 ${className}`}
      animate={{
        opacity: [0.5, 0.8, 0.5],
        scale: [1, 1.15, 1],
      }}
      transition={{
        duration: 5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      }}
    />
  );
};

export default function ParticlesContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const animationRef = useRef<number>(0);
  const particlesCount = 50;

  const colors = ["#00FFFF", "#9333EA", "#E879F9"];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create particles
    const particles: Particle[] = [];

    for (let i = 0; i < particlesCount; i++) {
      const particle = document.createElement("div");
      particle.classList.add(
        "absolute", 
        "rounded-full", 
        "pointer-events-none"
      );
      
      const size = 1 + Math.random() * 2;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const opacity = 0.1 + Math.random() * 0.5;
      const speed = 10 + Math.random() * 20;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;
      particle.style.opacity = opacity.toString();
      particle.style.backgroundColor = color;
      particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
      particle.style.transition = `all ${speed}s linear`;

      container.appendChild(particle);
      particlesRef.current.push(particle);
      
      particles.push({
        x,
        y,
        size,
        color,
        opacity,
        speed
      });
    }

    // Animate particles
    const animateParticles = () => {
      particlesRef.current.forEach((particle) => {
        const newX = Math.random() * 100;
        const newY = Math.random() * 100;
        
        setTimeout(() => {
          if (particle && particle.style) {
            particle.style.left = `${newX}%`;
            particle.style.top = `${newY}%`;
          }
        }, Math.random() * 1000);
      });
      
      animationRef.current = requestAnimationFrame(() => {
        setTimeout(animateParticles, 10000);
      });
    };

    animateParticles();

    return () => {
      cancelAnimationFrame(animationRef.current);
      particlesRef.current.forEach(particle => {
        particle.remove();
      });
      particlesRef.current = [];
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="overflow-hidden absolute top-0 left-0 w-full h-full z-0"
    >
      <Spotlight />
    </div>
  );
}
