import type { ReactNode } from "react";

interface ContainerProps {
    children: ReactNode;
    className?: string;
}

/**
 * Contêiner único de conteúdo: mesma largura máxima e mesmo respiro lateral em todas as seções.
 * Substitui o `container` do Tailwind, que trava a largura por breakpoint e deixava Hero e About
 * (sem contêiner) com bordas diferentes das demais seções.
 */
export default function Container({ children, className = "" }: ContainerProps) {
    return <div className={`mx-auto w-full max-w-7xl px-6 md:px-8 ${className}`}>{children}</div>;
}
