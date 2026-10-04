"use client";

import { Menu } from "lucide-react";
import { Orbitron } from 'next/font/google'
import { Space_Grotesk } from 'next/font/google'
import { useEffect, useRef, useState } from "react";
import Container from "../ui/Container";

const orbitron = Orbitron({ subsets: ['latin'] })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], })

// O `id` é explícito: derivá-lo do rótulo quebraria a âncora ao acentuar o texto ("Início" → "#início").
const listaMenu = [
    { label: "Início", id: "inicio" },
    { label: "Sobre", id: "sobre" },
    { label: "Habilidades", id: "habilidades" },
    { label: "Projetos", id: "projetos" },
    { label: "Contato", id: "contato" },
]

/** Cabeçalho fixo com navegação por âncoras; no celular, o menu abre num painel sob a barra. */
function Header() {

    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const menuButtonRef = useRef<HTMLButtonElement>(null);

    // Esc fecha o menu e devolve o foco ao botão, para o teclado não ficar perdido num painel que sumiu.
    useEffect(() => {
        if (!menuOpen) return;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key !== "Escape") return;
            setMenuOpen(false);
            menuButtonRef.current?.focus();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [menuOpen]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);

        // Sincroniza com a posição atual: após F5 no meio da página o navegador restaura a
        // rolagem sem disparar `scroll` depois da hidratação, e o cabeçalho (transparente no
        // topo) ficaria sem fundo sobre o conteúdo.
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-space-900/80 backdrop-blur-lg shadow-md border-b border-neon-cyan/20" : "border-b border-transparent"}`}>
            <Container className="py-3 flex justify-between items-center">
                <a href="#inicio" aria-label="Início" className={`text-2xl ${orbitron.className} font-bold text-neon-cyan`} style={{ textShadow: "rgba(0, 255, 255, 0.7) 0px 0px 10px" }}>
                    C
                    <span className="text-white">
                        E
                    </span>
                </a>
                <button
                    ref={menuButtonRef}
                    type="button"
                    aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
                    aria-expanded={menuOpen}
                    aria-controls="menu-movel"
                    className={`${menuOpen ? "text-neon-purple" : "text-neon-cyan"} md:hidden w-11 h-11 flex items-center justify-center`}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <Menu className="w-6 h-6" />
                </button>
                {/* Nav para Desktop */}
                <nav className="hidden md:block">
                    <ul className="flex space-x-6 px-6 py-2">
                        {listaMenu.map(({ label, id }) => (
                            <li key={id}>
                                <a href={`#${id}`} className="font-['Space_Grotesk'] hover:text-neon-cyan transition-colors duration-300 cursor-pointer">
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </Container>
            <nav id="menu-movel" className={`${spaceGrotesk.className} ${menuOpen ? 'block' : 'hidden'} md:hidden border-t border-neon-cyan/20 absolute top-full left-0 w-full bg-space-950`}>
                <ul className="flex flex-col space-y-4 px-6 py-4">
                    {listaMenu.map(({ label, id }) => (
                        <li key={id}>
                            <a href={`#${id}`} onClick={() => setMenuOpen(false)}>
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

        </header >

    )
}

export default Header;