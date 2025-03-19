import { motion } from "framer-motion";
import ParticlesContainer from "../ui/ParticlesContainer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faTwitter, faDribbble } from '@fortawesome/free-brands-svg-icons';

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
        <section className="md:flex md:justify-between md:items-center h-screen px-2 py-24 z-10 mt-13 lg:items-stretch">
            <ParticlesContainer />
            <motion.div variants={boxVariants} initial="hidden" animate="visible">
                <motion.h2 variants={itemVariants} className="font-['Space_Grotesk'] text-[#00FFFF] mb-2">Olá, eu sou</motion.h2>
                <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold font-['Space_Grotesk'] mb-4">
                    Carlos <span className="bg-gradient-to-r from-[#00FFFF] to-[#9333EA] bg-clip-text text-transparent ">Eduardo</span>
                </motion.h1>
                <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl lg:text-4xl font-['Space_Grotesk'] mb-6 text-[#A3A3A3]">
                    Front-end <span className="text-[#9333EA]">Developer</span>
                </motion.h2>
                <motion.p variants={itemVariants} className="text-gray-300 mb-8 max-w-lg">
                    Eu crio experiências web bonitas, interativas e de alto desempenho usando as tecnologias mais recentes e as melhores práticas.
                </motion.p>
                <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                    <a className="px-6 py-3 rounded border border-[#00FFFF] text-[#00FFFF] hover:bg-[#00FFFF]/10 transition-all duration-300 font-['Space_Grotesk']" style={{ boxShadow: 'rgba(0, 255, 255, 0.5) 0px 0px 5px, rgba(0, 255, 255, 0.3) 0px 0px 20px' }} >Meu trabalho</a>
                    <a className="px-6 py-3 rounded bg-[#9333EA] text-white hover:bg-[#9333EA]/80 transition-all duration-300 font-['Space_Grotesk']">Contate-me</a>
                </motion.div>
                <motion.div variants={itemVariants} className="flex space-x-4 mt-8">
                    <a href="#" className="text-gray-400 hover:text-[#00FFFF] transition-colors duration-300" aria-label="GitHub">
                        <FontAwesomeIcon icon={faGithub} className="text-xl" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-[#00FFFF] transition-colors duration-300" aria-label="LinkedIn">
                        <FontAwesomeIcon icon={faLinkedin} className="text-xl" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-[#00FFFF] transition-colors duration-300" aria-label="Twitter">
                        <FontAwesomeIcon icon={faTwitter} className="text-xl" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-[#00FFFF] transition-colors duration-300" aria-label="Dribbble">
                        <FontAwesomeIcon icon={faDribbble} className="text-xl" />
                    </a>
                </motion.div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="md:w-1/2 flex justify-center">

                <motion.div animate={{ y: [0, -10, 0] }} transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut"
                }} className="relative w-64 h-64 md:w-80 md:h-80">

                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00FFFF]/20 to-[#9333EA]/20 blur-2xl"></div>
                    <div className="absolute inset-4 rounded-full border-2 border-[#00FFFF] shadow-[0_0_5px_rgba(0,255,255,0.5),0_0_20px_rgba(0,255,255,0.3)]"></div>
                    <div className="absolute inset-8 rounded-full border-2 border-[#9333EA] shadow-[0_0_5px_rgba(147,51,234,0.5),0_0_20px_rgba(147,51,234,0.3)]"></div>
                    <div className="absolute inset-12 rounded-full bg-[#050816] flex items-center justify-center">
                        <span className="text-6xl font-['Orbitron'] bg-gradient-to-r from-[#00FFFF] to-[#9333EA] bg-clip-text text-transparent">&lt;/&gt;</span>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
