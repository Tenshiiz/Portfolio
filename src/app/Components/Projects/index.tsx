/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import React from "react";

interface ProjectProps {
    title: string;
    description: string;
    imgSrc: string;
    tech: string[];
    demoLink: string;
    sourceLink: string;
    color: "cyan" | "purple" | "pink";
}

const colors = {
    cyan: {
        border: 'border-[#00FFFF]/20 hover:border-[#00FFFF]',
        text: 'text-[#00FFFF]',
        bg: 'bg-[#00FFFF]/30',
        hover: 'group-hover:text-[#00FFFF]'
    },
    purple: {
        border: 'border-[#9333EA]/20 hover:border-[#9333EA]',
        text: 'text-[#9333EA]',
        bg: 'bg-[#9333EA]/30',
        hover: 'group-hover:text-[#9333EA]'
    },
    pink: {
        border: 'border-[#E879F9]/20 hover:border-[#E879F9]',
        text: 'text-[#E879F9]',
        bg: 'bg-[#E879F9]/30',
        hover: 'group-hover:text-[#E879F9]'
    }
};

const Project = React.memo(({ title, description, imgSrc, tech, demoLink, sourceLink, color }: ProjectProps) => {
    return (
        <motion.div
            className={`group relative overflow-hidden rounded-lg bg-[#050816] border ${colors[color].border} transition-all duration-500`}
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
        >
            <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-${colors[color].bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>

            {/* Project Image */}
            <img
                src={imgSrc}
                alt={title}
                className="w-full h-60 object-cover object-center"
            />

            {/* Project Details */}
            <div className="p-6">
                <h3 className={`text-xl font-['Space_Grotesk'] mb-2 ${colors[color].hover} transition-colors duration-300`}>{title}</h3>
                <p className="text-gray-300 mb-4 text-sm">{description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {tech.map((item, index) => (
                        <span
                            key={index}
                            className={`px-2 py-1 bg-[#171717]/50 text-xs rounded ${colors[color].text}`}
                        >
                            {item}
                        </span>
                    ))}
                </div>

                {/* Project Links */}
                <div className="flex justify-between">
                    <a
                        href={demoLink}
                        className={`${colors[color].text} hover:text-white hover:bg-white/10 transition-all duration-300 text-sm flex items-center gap-2 px-4 py-2 rounded-md`}
                    >
                        <i className="fas fa-eye"></i> Ver Demo
                    </a>
                    <a
                        href={sourceLink}
                        className={`${colors[color].text} hover:text-white hover:bg-white/10 transition-all duration-300 text-sm flex items-center gap-2 px-4 py-2 rounded-md`}
                    >
                        <i className="fab fa-github"></i> Ver Código
                    </a>
                </div>
            </div>
        </motion.div>
    );
});

Project.displayName = "Project";

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
        <section id="projetos" className="py-24 bg-[#030610] relative">
            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold mb-2 font-['Space_Grotesk']">
                        Meus <span className="bg-gradient-to-r from-[#00FFFF] to-[#9333EA] bg-clip-text text-transparent ">Projetos</span>
                    </h2>
                    <div
                        className="w-20 h-1 bg-[#00FFFF] mx-auto mb-6 rounded"
                        style={{ boxShadow: "0 0 5px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)" }}
                    ></div>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        Aqui estão alguns dos meus projetos recentes. Cada um representa um desafio único e exibe diferentes habilidades e tecnologias.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                        href="#"
                        className="inline-block px-6 py-3 rounded border border-[#9333EA] text-[#9333EA] hover:bg-[#9333EA]/10 transition-all duration-300 font-['Space_Grotesk']"
                        style={{ boxShadow: "0 0 5px rgba(147, 51, 234, 0.5), 0 0 20px rgba(147, 51, 234, 0.3)" }}
                    >
                        Ver Todos os Projetos <i className="fas fa-arrow-right ml-2"></i>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
