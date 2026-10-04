"use client";

import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import SkillItem from "./SkillItem";
import type { Accent } from "../../ui/accent";
import { mono } from "../../ui/fonts";

export interface SkillCategoryProps {
    title: string;
    subtitle: string;
    icon: LucideIcon;
    color: Accent;
    skills: string[];
    /** Área em aprendizado: borda tracejada, subtítulo de status e chips tracejados. */
    studying?: boolean;
    className?: string;
}

// Brilho radial no canto superior direito + degradê diagonal, ambos na cor de destaque.
const SURFACE =
    "border-(--accent)/30 bg-[radial-gradient(circle_at_100%_0%,color-mix(in_srgb,var(--accent)_16%,transparent),transparent_55%),linear-gradient(155deg,color-mix(in_srgb,var(--accent)_7%,transparent),#0A0E1B_60%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]";
const SURFACE_STUDYING =
    "border-dashed border-(--accent)/50 bg-[#0A0E1B] bg-[radial-gradient(circle_at_100%_0%,color-mix(in_srgb,var(--accent)_10%,transparent),transparent_55%)]";

/** Cartão de uma área; o halo do ícone acende no hover do cartão. */
const SkillCategory = ({ title, subtitle, icon: Icon, color, skills, studying = false, className = "" }: SkillCategoryProps) => {
    return (
        <motion.section
            data-accent={color}
            className={`group relative flex min-w-0 flex-col justify-between gap-6 overflow-hidden rounded-3xl border p-7 transition-colors duration-300 hover:border-(--accent)/60 xl:min-h-[clamp(190px,24svh,300px)] ${studying ? SURFACE_STUDYING : SURFACE} ${className}`}
            whileHover={{ y: -3 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
        >
            {/* Marca d'água: ícone grande e quase transparente, só para dar profundidade ao cartão. */}
            <Icon
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-8 -right-6 h-40 w-40 text-(--accent) opacity-[0.07]"
                strokeWidth={1.1}
            />

            <div className="relative z-10 flex items-center gap-4">
                <span
                    aria-hidden="true"
                    data-skill-icon
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-(--accent)/35 bg-(--accent)/12 text-(--accent) transition-all duration-300 group-hover:glow"
                >
                    <Icon className="h-7 w-7" strokeWidth={1.8} />
                </span>
                <div>
                    <h3 className="font-['Space_Grotesk'] text-xl">{title}</h3>
                    {studying ? (
                        <p className={`${mono.className} flex items-center gap-2 text-sm uppercase tracking-[0.12em] text-[color-mix(in_srgb,var(--accent)_55%,white)]`}>
                            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-(--accent) shadow-[0_0_10px_var(--accent)] motion-safe:animate-pulse" />
                            {subtitle}
                        </p>
                    ) : (
                        <p className="text-sm text-slate-400">{subtitle}</p>
                    )}
                </div>
            </div>

            <ul className="relative z-10 flex flex-wrap gap-3">
                {skills.map((name) => (
                    <SkillItem key={name} name={name} level={studying ? "studying" : "daily"} />
                ))}
            </ul>
        </motion.section>
    );
};

export default SkillCategory;
