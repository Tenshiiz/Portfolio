"use client";

import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faEye } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import type { Accent } from "../ui/accent";
import Container from "../ui/Container";
import Halo from "../ui/Halo";

interface ProjectProps {
    title: string;
    description: string;
    imgSrc: string;
    tech: string[];
    demoLink: string;
    sourceLink: string;
    color: Accent;
}

/** Cartão de projeto: miniatura, descrição, stack e links de demo e código. */
const Project = React.memo(({ title, description, imgSrc, tech, demoLink, sourceLink, color }: ProjectProps) => {
    return (
        <motion.div
            data-accent={color}
            className="group relative overflow-hidden w-full md:w-[calc(50%-1rem)] lg:w-[calc((100%-4rem)/3)] rounded-lg bg-space-900 border border-(--accent)/20 hover:border-(--accent) transition-all duration-500"
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-(--accent)/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="relative w-full h-60">
                <Image
                    src={imgSrc}
                    alt={title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover object-center"
                />
            </div>

            <div className="p-6">
                <h3 className="text-xl font-['Space_Grotesk'] mb-2 group-hover:text-(--accent) transition-colors duration-300">{title}</h3>
                <p className="text-gray-300 mb-4 text-sm">{description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {tech.map((item, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 bg-[#171717]/50 text-xs rounded text-(--accent)"
                        >
                            {item}
                        </span>
                    ))}
                </div>

                <div className="flex justify-between">
                    <a
                        href={demoLink}
                        className="text-(--accent) hover:text-white hover:bg-white/10 transition-all duration-300 text-sm flex items-center gap-2 px-4 py-2 rounded-md"
                    >
                        <FontAwesomeIcon icon={faEye} /> Ver Demo
                    </a>
                    <a
                        href={sourceLink}
                        className="text-(--accent) hover:text-white hover:bg-white/10 transition-all duration-300 text-sm flex items-center gap-2 px-4 py-2 rounded-md"
                    >
                        <FontAwesomeIcon icon={faGithub} /> Ver Código
                    </a>
                </div>
            </div>
        </motion.div>
    );
});

Project.displayName = "Project";

/** Seção #projetos com a grade de cartões. */
export default function ProjectsSection() {
    const projects: ProjectProps[] = [
        {
            title: "Lumen",
            description: "Uma ferramenta elegante e intuitiva para designers e desenvolvedores explorarem e manipularem cores na web.",
            imgSrc: "/imgProjects/LumenLogo.png",
            tech: ["Next.js", "TypeScript", "Tailwind CSS"],
            demoLink: "https://lumen-ashy.vercel.app/",
            sourceLink: "https://github.com/Tenshiiz/Lumen",
            color: "cyan"
        },
        {
            title: "Clone do Youtube",
            description: "Projeto clone do YouTube desenvolvido para fins de estudo, com foco em assistir vídeos salvos e demonstrar habilidades em desenvolvimento web.",
            imgSrc: "/imgProjects/YoutubeClone.png",
            tech: ["React.js", "CSS"],
            demoLink: "https://youtube-clone-tenshi.vercel.app",
            sourceLink: "https://github.com/Tenshiiz/Youtube-clone",
            color: "purple"
        },
    ];

    return (
        <section id="projetos" className="py-24 relative">
            <Halo tone="cyan" className="left-[20%] top-[12%]" />
            <Container>
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold mb-2 font-['Space_Grotesk']">
                        Meus <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent ">Projetos</span>
                    </h2>
                    <div
                        className="glint-bar [--glint-delay:-3s] w-20 h-1 bg-neon-cyan mx-auto mb-6 rounded"
                        style={{ boxShadow: "0 0 5px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)" }}
                    ></div>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        Aqui estão alguns dos meus projetos recentes. Cada um representa um desafio único e exibe diferentes habilidades e tecnologias.
                    </p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-8">
                    {projects.map((project, index) => (
                        <Project
                            key={index}
                            {...project}
                        />
                    ))}
                </div>

                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <a
                        href="https://github.com/Tenshiiz?tab=repositories"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-3 rounded border border-neon-purple text-neon-purple hover:bg-neon-purple/10 transition-all duration-300 font-['Space_Grotesk']"
                        style={{ boxShadow: "0 0 5px rgba(147, 51, 234, 0.5), 0 0 20px rgba(147, 51, 234, 0.3)" }}
                    >
                        Ver Todos os Projetos <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                    </a>
                </motion.div>
            </Container>
        </section>
    );
}
