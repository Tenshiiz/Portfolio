"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Aplica `prefers-reduced-motion` a todas as animações do framer-motion: com `"user"`,
 * as de transform (`x`, `y`, `scale`) são suprimidas e as de opacidade continuam.
 * Fica num componente próprio para o layout permanecer um Server Component.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
