"use client";

import { motion } from "framer-motion";

import Image from "next/image";
import Container from "../ui/Container";
import Halo from "../ui/Halo";

/**
 * Seção "Sobre". A entrada usa `whileInView` (IntersectionObserver) em vez de um
 * listener de scroll: abrir a página direto em `/#sobre` salta para a seção sem
 * garantir um evento de scroll, e o conteúdo ficava com `opacity: 0`.
 */
function About() {
    return (
        <section id="sobre" className="relative py-24 overflow-hidden">
            <Halo tone="cyan" className="-left-[8%] top-[10%]" />
            <Container className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 1 }} className="relative w-full lg:w-1/2 h-64 md:h-80 lg:h-96">
                <div className="absolute -inset-4 bg-gradient-to-r from-neon-cyan/40 to-neon-purple/40 rounded-lg opacity-70 blur-lg"></div>
                <Image src="https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt=""
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover rounded-xl px-2" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 1 }} className="w-full lg:w-1/2">
                <h2 className="text-3xl font-bold mb-2 font-['Space_Grotesk']">
                    Sobre <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">Mim</span>
                </h2>
                <div className="glint-bar w-20 h-1 bg-neon-cyan mb-6 rounded" style={{ boxShadow: 'rgba(0, 255, 255, 0.5) 0px 0px 5px, rgba(0, 255, 255, 0.3) 0px 0px 20px' }}></div>
                <div className="space-y-4 text-gray-300">
                    <p>Sou desenvolvedor front-end e trabalho com React, Next.js e TypeScript. Gosto de interfaces acessíveis, responsivas e cobertas por testes automatizados, com Vitest e Playwright.</p>
                    <p>No back-end, uso Supabase e implemento autenticação. Com Python e FastAPI escrevo APIs e microsserviços para integrar modelos de IA a aplicações reais, que é o que estudo hoje na pós da FIAP.</p>
                    <p>Publiquei o Lumen, um clone do YouTube e este portfólio, todos com código aberto no GitHub.</p>
                </div>
                <div className="flex flex-col gap-3 mt-5 md:flex-row">
                    <div className="bg-[#171717]/40 p-4 rounded-lg border border-neon-cyan/30">
                        <h3 className="font-['Orbitron'] text-neon-cyan mb-2">
                            Experiência
                        </h3>
                        <p className="text-gray-300">
                            Analista de suporte técnico na Quality Digital, em Curitiba. Projetos web desde 2023.
                        </p>
                    </div>
                    <div className="bg-[#171717]/40 p-4 rounded-lg border border-neon-purple/60">
                        <h3 className="font-['Orbitron'] text-neon-purple mb-2">Educação</h3>
                        <p className="text-gray-300">
                            Pós-graduação em AI Scientist, FIAP (2026–2027)
                        </p>
                        <p className="text-gray-300">
                            Tecnólogo em ADS, Estácio (2022–2024)
                        </p>
                    </div>
                </div>
            </motion.div>
            </Container>
        </section>
    )
}

export default About;