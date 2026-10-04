import type { Metadata } from "next";
import "./globals.css";
import MotionProvider from "./Components/ui/MotionProvider";

export const metadata: Metadata = {
  title: "Carlos Eduardo Vanziler | Desenvolvedor Front-end",
  description:
    "Portfólio de Carlos Eduardo Vanziler Gomes, desenvolvedor front-end em Curitiba (React, Next.js, TypeScript) e pós-graduando em IA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
