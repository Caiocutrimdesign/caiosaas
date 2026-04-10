import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const Logo = () => (
  <div className="relative group">
    <div className="absolute -inset-1 bg-premium-yellow rounded-lg blur opacity-25 group-hover:opacity-50 transition-opacity duration-300"></div>
    <div className="relative w-12 h-12 bg-gradient-to-br from-premium-yellow to-premium-yellowDark rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
      <svg viewBox="0 0 60 60" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 5 L45 20 L45 55 L15 55 L15 20 Z" fill="#0A2540"/>
        <circle cx="30" cy="12" r="6" fill="#0A2540"/>
        <line x1="30" y1="18" x2="30" y2="30" stroke="#0A2540" strokeWidth="3" strokeLinecap="round"/>
        <path d="M22 40 Q30 48 38 40" stroke="#0A2540" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M22 48 Q30 56 38 48" stroke="#0A2540" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      </svg>
    </div>
  </div>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContatoOpen, setIsContatoOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "EMPRESA", href: "/empresa" },
    { name: "EQUIPAMENTOS", href: "/equipamentos" },
    { name: "SERVIÇOS", href: "/servicos" },
    { name: "GALERIA", href: "/galeria" },
    { name: "CLIENTES", href: "/clientes" },
  ];

  const contatoLinks = [
    { name: "Fale Conosco", href: "/contato" },
    { name: "Trabalhe Conosco", href: "/trabalhe-conosco" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-premium-blue/95 backdrop-blur-sm shadow-lg' : 'bg-premium-blue'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3">
            <Logo />
            <span className="text-white font-semibold text-xl tracking-wide hidden sm:block">
              Premium Locação
            </span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="px-4 py-2 text-gray-300 hover:text-premium-yellow transition-colors duration-200 text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}
            <div className="relative">
              <button
                onClick={() => setIsContatoOpen(!isContatoOpen)}
                className="flex items-center px-4 py-2 text-gray-300 hover:text-premium-yellow transition-colors duration-200 text-sm font-medium"
              >
                CONTATO
                <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              {isContatoOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2">
                  {contatoLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="block px-4 py-2 text-premium-blue hover:bg-premium-gray100 transition-colors duration-200 text-sm"
                      onClick={() => setIsContatoOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block py-3 text-gray-300 hover:text-premium-yellow transition-colors duration-200 text-sm font-medium border-b border-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="py-2">
              <span className="text-gray-500 text-sm font-medium px-4">CONTATO</span>
              {contatoLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block py-3 pl-4 text-gray-300 hover:text-premium-yellow transition-colors duration-200 text-sm font-medium border-b border-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
