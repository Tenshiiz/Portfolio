"use client";

import { Menu } from "lucide-react";
import { Orbitron } from 'next/font/google'
import { Space_Grotesk } from 'next/font/google'
import { useEffect, useState } from "react";

const orbitron = Orbitron({ subsets: ['latin'] })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], })

function Cabeçalho() {

    const listaMenu = ["ínicio", "Sobre", "Habilidades", "Projetos", "Contato"]
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 50) { // Ajuste esse valor conforme necessário
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        // Adiciona o event listener para o scroll
        window.addEventListener("scroll", handleScroll);

        // Remove o event listener quando o componente for desmontado
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-[#030610] shadow-lg" : "bg-transparent"}`}>
            <div className="px-7 py-3 flex justify-between items-center">
                <a className={`ml-2 text-2xl ${orbitron.className} font-bold text-[#00FFFF]`} style={{ textShadow: "rgba(0, 255, 255, 0.7) 0px 0px 10px" }}>
                    C
                    <span className="text-white">
                        E
                    </span>
                </a>
                <button className={`${menuOpen ? "text-[#9333EA]" : "text-[#00FFFF]"} md:hidden p-2`} onClick={() => setMenuOpen(!menuOpen)}>
                    <Menu className="w-6 h-6" />
                </button>
                {/* Nav para Desktop */}
                <nav className="hidden md:block">
                    <ul className="flex space-x-6 px-6 py-2">
                        {listaMenu.map((gaeul, index) => (
                            <a className="font-['Space_Grotesk'] hover:text-[#00FFFF] transition-colors duration-300 cursor-pointer" onClick={() => setMenuOpen(false)} key={index}>
                                <li>
                                    {gaeul}
                                </li>
                            </a>
                        ))}
                    </ul>
                </nav>
            </div>
            <nav className={`${spaceGrotesk.className} ${menuOpen ? 'block' : 'hidden'} border-t border-[#00FFFF]/20 absolute top-16 w-full bg-[#030610]`}>
                <ul className="flex flex-col space-y-4 px-6 py-4">
                    {listaMenu.map((gaeul, index) => (
                        <a onClick={() => setMenuOpen(false)} key={index}>
                            <li>
                                {gaeul}
                            </li>
                        </a>
                    ))}
                </ul>
            </nav>

        </header >

    )
}

export default Cabeçalho;