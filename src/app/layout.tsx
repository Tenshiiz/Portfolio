import type { Metadata } from "next";
import "./globals.css";
import MotionProvider from "./Components/ui/MotionProvider";

export const metadata: Metadata = {
  title: "Carlos Eduardo | Front-end Developer",
  description:
    "Portfólio de Carlos Eduardo, desenvolvedor front-end. Experiências web interativas e de alto desempenho.",
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
