/** Peso visual do chip: uso diário, em estudo, ou lista complementar sem destaque. */
export type SkillLevel = "daily" | "studying" | "extra";

interface SkillItemProps {
    name: string;
    level: SkillLevel;
}

// Texto no matiz de destaque clareado: o ciano e o roxo puros têm contraste baixo sobre o fundo escuro.
const ACCENT_TEXT = "text-[color-mix(in_srgb,var(--accent)_55%,white)]";

const LEVEL_STYLES: Record<SkillLevel, string> = {
    daily: `glow border border-(--accent)/65 bg-(--accent)/12 px-5 py-2.5 text-base font-semibold ${ACCENT_TEXT}`,
    studying: `border border-dashed border-(--accent)/70 px-5 py-2.5 text-base font-medium ${ACCENT_TEXT}`,
    extra: "border border-white/20 px-3.5 py-1.5 text-sm text-gray-300",
};

/** Chip de uma habilidade; a cor de destaque vem do `data-accent` do cartão. */
const SkillItem = ({ name, level }: SkillItemProps) => {
    return (
        <li
            className={`rounded-full transition-transform duration-300 motion-safe:hover:-translate-y-0.5 ${LEVEL_STYLES[level]}`}
        >
            {name}
        </li>
    );
};

export default SkillItem;
