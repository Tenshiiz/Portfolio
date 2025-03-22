import { motion } from "framer-motion";

import Image from "next/image";
import { useEffect, useState } from "react";


function About() {

    const [hasScrolled, setHasScrolled] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 300) {
            setHasScrolled(true);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <section className="bg-[#030610] flex flex-col md:flex-row items-center gap-12 px-7.5 py-24 overflow-hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity : hasScrolled ? 1 : 0, x : hasScrolled ? [-50, 0] : [-50] }} transition={{ duration: 1 }} className="relative w-full h-64 lg:h-96 md:max-w-1/2 ">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#00FFFF]/40 to-[#9333EA]/40 rounded-lg opacity-70 blur-lg"></div>
                <Image src={"https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} alt=""
                    layout="fill"
                    objectFit="cover" className="rounded-xl px-2" />
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity : hasScrolled ? 1 : 0, x : hasScrolled ? [100, 0] : [100] }} transition={{ duration: 1 }} className="max-w-sm md:max-w-xs lg:max-w-1/2">
                <h2 className="text-3xl font-bold mb-2 font-['Space_Grotesk']">
                    Sobre <span className="bg-gradient-to-r from-[#00FFFF] to-[#9333EA] bg-clip-text text-transparent">Mim</span>
                </h2>
                <div className="w-20 h-1 bg-[#00FFFF] mb-6 rounded" style={{ boxShadow: 'rgba(0, 255, 255, 0.5) 0px 0px 5px, rgba(0, 255, 255, 0.3) 0px 0px 20px' }}></div>
                <div className="space-y-4 text-gray-300">
                    <p>Sou um desenvolvedor front-end apaixonado, com forte foco na criação de interfaces de usuário visualmente impressionantes e altamente funcionais. Com expertise em frameworks e bibliotecas modernas, construo experiências digitais fluidas que engajam os usuários e alcançam os objetivos de negócios.</p>
                    <p>Minha jornada no desenvolvimento web começou há 5 anos e, desde então, venho aprendendo constantemente e me adaptando às novas tecnologias. Especializo-me em React, Next.js e TypeScript, com um carinho especial por criar designs responsivos usando Tailwind CSS.</p>
                    <p>Quando não estou programando, você pode me encontrar explorando novas tendências de design, contribuindo para projetos open-source ou compartilhando meu conhecimento por meio de escrita técnica e mentoria.</p>
                </div>
                <div className="flex flex-col gap-3 mt-5 md:flex-row">
                    <div className="bg-[#171717]/40 p-4 rounded-lg border border-[#00FFFF]/30">
                        <h3 className="font-['Orbitron'] text-[#00FFFF] mb-2">
                            Experiencia
                        </h3>
                        <p className="text-gray-300">
                            2 anos de experiência em desenvolvimento web
                        </p>
                    </div>
                    <div className="bg-[#171717]/40 p-4 rounded-lg border border-[#9333EA]/60">
                        <h3 className="font-['Orbitron'] text-[#9333EA] mb-2">Educação</h3>
                        <p className="text-gray-300">
                            Graduação em Análise e Desenvolvimento de Sistemas
                        </p>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default About;