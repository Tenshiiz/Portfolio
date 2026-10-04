import About from "./Components/About";
import Header from "./Components/Header";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import Hero from "./Components/Hero";
import ProjectsSection from "./Components/Projects";
import Skills from "./Components/Skills";
import SkyBackground from "./Components/ui/SkyBackground";

/** Página única do portfólio, na ordem das âncoras do menu. */
export default function Home() {
  return (
    <>
      <SkyBackground />
      {/*
        `relative z-10` põe todo o conteúdo acima do céu fixo (um elemento posicionado pintaria por cima de
        conteúdo estático). `flow-root` impede que a margem de topo do hero colapse através deste contêiner:
        o cabeçalho é `fixed` e não ocupa fluxo, então sem isso a âncora #inicio começa 52px abaixo do topo.
      */}
      <div id="inicio" className="relative z-10 flow-root min-h-screen text-white">
        <Header />
        <Hero />
        <div className="section-sep" aria-hidden="true" />
        <About />
        <div className="section-sep" aria-hidden="true" />
        <Skills />
        <div className="section-sep" aria-hidden="true" />
        <ProjectsSection />
        <div className="section-sep" aria-hidden="true" />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
