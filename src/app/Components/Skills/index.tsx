"use client";

import { Code, Server, Sparkles, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import SkillCategory, { type SkillCategoryProps } from "./components/SkillCategory";
import SkillItem from "./components/SkillItem";
import Container from "../ui/Container";
import Halo from "../ui/Halo";

// Ordem do DOM = leitura em linhas: [Front-end | Ferramentas], [Back-end | Estudando agora].
const areas: SkillCategoryProps[] = [
    {
        title: "Front-end",
        subtitle: "Interface, aplicação e estilo",
        icon: Code,
        color: "cyan",
        skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
        className: "xl:col-span-7",
    },
    {
        title: "Ferramentas",
        subtitle: "Fluxo e testes",
        icon: Wrench,
        color: "pink",
        skills: ["Git & GitHub", "Vitest", "Playwright"],
        className: "xl:col-span-5",
    },
    {
        title: "Back-end",
        subtitle: "APIs e serviços",
        icon: Server,
        color: "purple",
        skills: ["FastAPI", "RESTful APIs", "SQL"],
        className: "xl:col-span-7",
    },
    {
        title: "Estudando agora",
        subtitle: "Em andamento",
        icon: Sparkles,
        color: "cyan",
        skills: ["Python", "RAG", "LLM"],
        studying: true,
        className: "xl:col-span-5",
    },
];

const additionalSkills = [
    "JavaScript", "Redux", "Jest", "GraphQL", "Node.js", "Webpack", "Framer Motion", "Vercel",
];

/**
 * Seção #habilidades. Em telas largas (xl) ocupa exatamente uma tela (`min-h-svh`) com as
 * áreas em grade 2×2; abaixo disso os cartões empilham e a altura segue o conteúdo.
 */
export default function SkillsSection() {
    return (
        <section id="habilidades" className="relative flex items-center pt-20 pb-8 xl:min-h-svh">
            <Halo tone="purple" className="-right-[10%] top-[6%]" />
            <Container className="relative z-10">
                <motion.div
                    className="mb-8 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold mb-2 font-['Space_Grotesk']">
                        Minhas{" "}
                        <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent ">
                            Habilidades
                        </span>
                    </h2>
                    <div
                        className="glint-bar [--glint-delay:-1.5s] w-20 h-1 bg-neon-purple mx-auto mb-6 rounded"
                        style={{ boxShadow: "0 0 5px rgba(147, 51, 234, 0.5), 0 0 20px rgba(147, 51, 234, 0.3)" }}
                    ></div>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        O que uso no dia a dia e o que estou aprendendo agora.
                    </p>
                </motion.div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-12">
                    {areas.map((area) => (
                        <SkillCategory key={area.title} {...area} />
                    ))}
                </div>

                <motion.section
                    className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-3xl border border-white/10 bg-[#0A0E1B] px-7 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                >
                    <h3 className="shrink-0 font-['Space_Grotesk'] text-xl">Tecnologias adicionais</h3>
                    <ul className="flex flex-wrap gap-2">
                        {additionalSkills.map((name) => (
                            <SkillItem key={name} name={name} level="extra" />
                        ))}
                    </ul>
                </motion.section>
            </Container>
        </section>
    );
}
