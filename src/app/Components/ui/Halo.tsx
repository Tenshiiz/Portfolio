interface HaloProps {
  tone: "cyan" | "purple" | "pink";
  /** Posição do brilho dentro da seção, por exemplo `-left-[8%] top-[10%]`. */
  className?: string;
}

/**
 * Brilho local atrás do conteúdo de uma seção. Fica num contêiner que recorta o excesso (evita rolagem
 * horizontal) e em `-z-10`, para nunca tingir o texto que está por cima. A seção pai precisa ser `relative`.
 */
export default function Halo({ tone, className = "" }: HaloProps) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className={`halo halo-${tone} ${className}`} />
    </div>
  );
}
