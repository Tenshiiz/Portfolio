export default function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
      <footer className="py-8 bg-[#030610] border-t border-[#00FFFF]/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <a 
                href="#" 
                className="text-2xl font-['Orbitron'] font-bold text-[#00FFFF]"
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
                Construido <i className="fas fa-heart text-[#E879F9]"></i> usando React & Tailwind CSS
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  