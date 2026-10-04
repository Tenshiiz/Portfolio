"use client";

import { motion } from "framer-motion";
import ParticlesContainer from "../ui/ParticlesContainer";
import Container from "../ui/Container";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

/** Primeira dobra: apresentação, ações principais, redes e o orbe decorativo. */
export default function HeroSection() {

    const boxVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3, // Estabelece o atraso entre os filhos
            }
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },  // Animação de cada item
        visible: { opacity: 1, y: 0 },
    };

    return (
        <section className="relative z-10 flex items-center min-h-[min(100svh,56rem)] pt-28 pb-16">
            <ParticlesContainer />
            <Container className="relative grid items-center gap-12 lg:grid-cols-2">
            <motion.div variants={boxVariants} initial="hidden" animate="visible">
                <motion.p variants={itemVariants} className="font-['Space_Grotesk'] text-neon-cyan mb-2">Olá, eu sou</motion.p>
                <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold font-['Space_Grotesk'] mb-4">
                    Carlos <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent ">Eduardo</span>
                </motion.h1>
                <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl lg:text-4xl font-['Space_Grotesk'] mb-6 text-[#A3A3A3]">
                    Front-end <span className="text-neon-purple">Developer</span>
                </motion.h2>
                <motion.p variants={itemVariants} className="text-gray-300 mb-8 max-w-lg">
                    Eu crio experiências web bonitas, interativas e de alto desempenho usando as tecnologias mais recentes e as melhores práticas.
                </motion.p>
                <motion.div variants={itemVariants} className="flex flex-wrap gap-4 relative z-20">
                    <a href="#projetos" className="cursor-pointer px-6 py-3 rounded border border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10 transition-all duration-300 font-['Space_Grotesk']" style={{ boxShadow: 'rgba(0, 255, 255, 0.5) 0px 0px 5px, rgba(0, 255, 255, 0.3) 0px 0px 20px' }} >Meu trabalho</a>
                    <a href="#contato" className="cursor-pointer px-6 py-3 rounded bg-neon-purple text-white hover:bg-neon-purple/80 transition-all duration-300 font-['Space_Grotesk']">Contato</a>
                </motion.div>
                <motion.div variants={itemVariants} className="flex -ml-3 mt-8 relative">
                    <a href="https://github.com/Tenshiiz" className="inline-flex items-center justify-center w-11 h-11 text-gray-400 hover:text-neon-cyan transition-colors duration-300" aria-label="GitHub">
                        <FontAwesomeIcon icon={faGithub} className=" text-xl" />
                    </a>
                    <a href="https://www.linkedin.com/in/carloseduardo2003" className="inline-flex items-center justify-center w-11 h-11 text-gray-400 hover:text-neon-cyan transition-colors duration-300" aria-label="LinkedIn">
                        <FontAwesomeIcon icon={faLinkedin} className="text-xl" />
                    </a>
                </motion.div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex justify-center">

                <motion.div animate={{ y: [0, -10, 0] }} transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut"
                }} className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">

                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 blur-2xl"></div>
                    <div className="absolute inset-4 rounded-full border-2 border-neon-cyan shadow-[0_0_5px_rgba(0,255,255,0.5),0_0_20px_rgba(0,255,255,0.3)]"></div>
                    <div className="absolute inset-8 rounded-full border-2 border-neon-purple shadow-[0_0_5px_rgba(147,51,234,0.5),0_0_20px_rgba(147,51,234,0.3)]"></div>
                    <div className="absolute inset-12 rounded-full bg-space-900 flex items-center justify-center">
                        <span className="text-6xl font-['Orbitron'] bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">&lt;/&gt;</span>
                    </div>
                </motion.div>
            </motion.div>
            </Container>
        </section>
    );
}
