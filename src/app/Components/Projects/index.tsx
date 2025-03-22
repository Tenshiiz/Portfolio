/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";

interface ProjectProps {
    title: string;
    description: string;
    imgSrc: string;
    tech: string[];
    demoLink: string;
    sourceLink: string;
    color: "cyan" | "purple" | "pink";
}

const Project = ({ title, description, imgSrc, tech, demoLink, sourceLink, color }: ProjectProps) => {
    const colors = {
        cyan: {
            border: "border-[#00FFFF]/20 hover:border-[#00FFFF]",
            text: "text-[#00FFFF]",
            bg: "bg-[#00FFFF]/30",
            hover: "group-hover:text-[#00FFFF]"
        },
        purple: {
            border: "border-[#9333EA]/20 hover:border-[#9333EA]",
            text: "text-[#9333EA]",
            bg: "bg-[#9333EA]/30",
            hover: "group-hover:text-[#9333EA]"
        },
        pink: {
            border: "border-[#E879F9]/20 hover:border-[#E879F9]",
            text: "text-[#E879F9]",
            bg: "bg-[#E879F9]/30",
            hover: "group-hover:text-[#E879F9]"
        }
    };

    return (
        <motion.div
            className={`group relative overflow-hidden rounded-lg bg-[#050816] border ${colors[color].border} transition-all duration-500`}
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
        >
            <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-${colors[color].bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

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
                            className="px-2 py-1 bg-[#171717]/50 text-xs rounded"
                            style={{ color: index % 3 === 0 ? '#00FFFF' : index % 3 === 1 ? '#9333EA' : '#E879F9' }}
                        >
                            {item}
                        </span>
                    ))}
                </div>

                {/* Project Links */}
                <div className="flex justify-between">
                    <a
                        href={demoLink}
                        className={`${colors[color].text} hover:text-white transition-colors duration-300 text-sm flex items-center gap-2`}
                    >
                        <i className="fas fa-eye"></i> prévia
                    </a>
                    <a
                        href={sourceLink}
                        className={`${colors[color].text} hover:text-white transition-colors duration-300 text-sm flex items-center gap-2`}
                    >
                        <i className="fab fa-github"></i> Codigo Fonte
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

export default function ProjectsSection() {
    const projects: ProjectProps[] = [
        {
            title: "Painel de E-commerce",
            description: "Um painel administrativo abrangente para plataformas de e-commerce com análises em tempo real, gestão de inventário e processamento de pedidos.",
            imgSrc: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            tech: ["React", "TypeScript", "Tailwind CSS"],
            demoLink: "#",
            sourceLink: "#",
            color: "cyan"
        },
        {
            title: "Aplicativo de Viagem",
            description: "Um aplicativo interativo de planejamento de viagem com recomendações personalizadas, criação de itinerários e atualizações de clima em tempo real.",
            imgSrc: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            tech: ["Next.js", "GraphQL", "Styled Components"],
            demoLink: "#",
            sourceLink: "#",
            color: "purple"
        },
        {
            title: "Gerador de Conteúdo com IA",
            description: "Uma plataforma poderosa movida por IA para gerar e editar conteúdo com modelos personalizáveis e opções de exportação.",
            imgSrc: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            tech: ["React", "Node.js", "OpenAI API"],
            demoLink: "#",
            sourceLink: "#",
            color: "pink"
        }
    ];


    return (
        <section id="projects" className="py-24 bg-[#030610] relative">
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
                        View All Projects <i className="fas fa-arrow-right ml-2"></i>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
