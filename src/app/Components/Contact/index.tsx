"use client";

import { motion } from "framer-motion";
import Container from "../ui/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const links = [
    { label: "E-mail", href: "mailto:carlosvanziler50@gmail.com", icon: faEnvelope, external: false },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/carloseduardo2003", icon: faLinkedin, external: true },
    { label: "GitHub", href: "https://github.com/Tenshiiz", icon: faGithub, external: true },
];

/** Seção final de contato: três links diretos, sem formulário nem backend. */
export default function ContactSection() {
    return (
        <section id="contato" className="py-24 bg-space-900 relative">
            <Container>
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold mb-2 font-['Space_Grotesk']">
                        Entre em <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">Contato</span>
                    </h2>
                    <div
                        className="w-20 h-1 bg-neon-cyan mx-auto mb-6 rounded"
                        style={{ boxShadow: "0 0 5px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)" }}
                    ></div>
                    <p className="text-gray-300 max-w-2xl mx-auto mb-10">
                        Tem um projeto, uma vaga ou só quer trocar uma ideia? Me chame por qualquer um dos canais abaixo.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        {links.map(({ label, href, icon, external }) => (
                            <a
                                key={label}
                                href={href}
                                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                className="inline-flex items-center gap-3 min-h-11 px-6 py-3 rounded border border-neon-purple text-neon-purple hover:bg-neon-purple/10 transition-all duration-300 font-['Space_Grotesk']"
                            >
                                <FontAwesomeIcon icon={icon} />
                                {label}
                            </a>
                        ))}
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
