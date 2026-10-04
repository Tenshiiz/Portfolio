import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Container from "../ui/Container";

/** Rodapé com o logo, direitos e crédito da stack. */
export default function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
      <footer className="py-8 border-t border-neon-cyan/10">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <a 
                href="#inicio" 
                className="text-2xl font-['Orbitron'] font-bold text-neon-cyan"
                style={{ textShadow: "0 0 10px rgba(0, 255, 255, 0.7)" }}
              >
                C<span className="text-white">E</span>
              </a>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400">
                &copy; {currentYear} Carlos Eduardo.
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Feito com <FontAwesomeIcon icon={faHeart} className="text-neon-pink" /> usando Next.js e Tailwind CSS
              </p>
            </div>
          </div>
        </Container>
      </footer>
    );
  }
  