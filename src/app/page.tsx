"use client";

import About from "./Components/About";
import Cabeçalho from "./Components/Cabeçalho";
import Footer from "./Components/Footer";
import Hero from "./Components/Hero";
import ProjectsSection from "./Components/Projects";
import Skills from "./Components/Skills";



export default function Home() {
  return (
    <div id="inicio" className="min-h-screen bg-[#050816] text-white">
      <Cabeçalho />
      <Hero />
      <About />
      <Skills />
      <ProjectsSection />
      <Footer />
    </div>
  );
}
