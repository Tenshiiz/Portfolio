"use client";

import Cabeçalho from "./Components/Cabeçalho";
import Hero from "./Components/Hero";



export default function Home() {
  return (
    <div className="min-h-screen bg-[#050816] text-white px-4 py-3 md:p-7 md:py-3">
      <Cabeçalho />
      <Hero />
      
    </div>
  );
}
