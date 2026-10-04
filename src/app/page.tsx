import About from "./Components/About";
import Header from "./Components/Header";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import Hero from "./Components/Hero";
import ProjectsSection from "./Components/Projects";
import Skills from "./Components/Skills";

/** Página única do portfólio, na ordem das âncoras do menu. */
export default function Home() {
  return (
    // `flow-root` impede que a margem de topo do hero colapse através deste contêiner:
    // o cabeçalho é `fixed` e não ocupa fluxo, então sem isso o fundo começa 52px abaixo do topo.
    <div id="inicio" className="flow-root min-h-screen bg-space-900 text-white">
      <Header />
      <Hero />
      <About />
      <Skills />
      <ProjectsSection />
      <Contact />
      <Footer />
    </div>
  );
}
