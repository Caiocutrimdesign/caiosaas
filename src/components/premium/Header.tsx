import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Instagram, Phone } from "lucide-react";

const Logo = () => (
  <Link to="/" className="flex items-center">
    <img 
      src="https://premiumlocacao.com.br/wp-content/uploads/2019/07/logo-premium.png" 
      alt="Premium Locação"
      className="h-12 w-auto object-contain"
    />
  </Link>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContatoOpen, setIsContatoOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsContatoOpen(false);
  }, [location]);

  const navLinks = [
    { name: "HOME", href: "/", active: location.pathname === "/" },
    { name: "EMPRESA", href: "/empresa", active: location.pathname === "/empresa" },
    { name: "EQUIPAMENTOS", href: "/equipamentos", active: location.pathname === "/equipamentos" },
    { name: "SERVIÇOS", href: "/servicos", active: location.pathname === "/servicos" },
    { name: "GALERIA", href: "/galeria", active: location.pathname === "/galeria" },
    { name: "CLIENTES", href: "/clientes", active: location.pathname === "/clientes" },
  ];

  const contatoLinks = [
    { name: "Fale Conosco", href: "/contato" },
    { name: "Trabalhe Conosco", href: "/trabalhe-conosco" },
  ];

  return (
    <>
      <div className="h-8 bg-premium-blue hidden md:flex items-center justify-center gap-8 text-xs text-gray-300">
        <a href="https://wa.me/5598991988828" className="flex items-center gap-2 hover:text-premium-yellow transition-colors">
          <Phone className="w-3 h-3" /> (98) 99198-8828
        </a>
        <span className="text-gray-500">|</span>
        <span>Av. Santos Dumont, 80 - Tirirical, São Luís - MA</span>
        <span className="text-gray-500">|</span>
        <a href="https://www.instagram.com/premiumlocacao/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-premium-yellow transition-colors">
          <Instagram className="w-3 h-3" /> @premiumlocacao
        </a>
      </div>
      
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-lg' 
          : 'bg-premium-blue'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.slice(0, Math.floor(navLinks.length / 2)).map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-3 py-2 text-sm font-semibold transition-all duration-300 ${
                    link.active || (link.href !== "/" && location.pathname.startsWith(link.href))
                      ? 'text-premium-yellow' 
                      : scrolled ? 'text-gray-700 hover:text-premium-blue' : 'text-white hover:text-premium-yellow'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="flex-1 lg:flex-none flex justify-center lg:justify-start lg:mx-8">
              <Logo />
            </div>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.slice(Math.floor(navLinks.length / 2)).map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-3 py-2 text-sm font-semibold transition-all duration-300 ${
                    link.active || (link.href !== "/" && location.pathname.startsWith(link.href))
                      ? 'text-premium-yellow' 
                      : scrolled ? 'text-gray-700 hover:text-premium-blue' : 'text-white hover:text-premium-yellow'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="relative ml-2">
                <button
                  onClick={() => setIsContatoOpen(!isContatoOpen)}
                  className={`flex items-center px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                    scrolled ? 'text-gray-700 hover:text-premium-blue' : 'text-white hover:text-premium-yellow'
                  }`}
                >
                  CONTATO
                  <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${isContatoOpen ? 'rotate-180' : ''}`} />
                </button>
                {isContatoOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                    {contatoLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-premium-blue transition-colors"
                        onClick={() => setIsContatoOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/5598991988828"
                className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  scrolled 
                    ? 'bg-premium-blue text-white hover:bg-premium-blueLight' 
                    : 'bg-white text-premium-blue font-semibold'
                }`}
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">Orçamento</span>
              </a>
              <button
                className={`lg:hidden p-2 transition-colors ${scrolled ? 'text-gray-700' : 'text-white'}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`block py-3 px-4 text-base font-semibold rounded-lg transition-colors ${
                    link.active || (link.href !== "/" && location.pathname.startsWith(link.href))
                      ? 'bg-premium-yellow/10 text-premium-blue border-l-4 border-premium-yellow'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100">
                <span className="block px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Contato</span>
                {contatoLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="block py-3 px-4 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className="pt-4">
                <a
                  href="https://wa.me/5598991988828"
                  className="flex items-center justify-center gap-2 py-3 bg-premium-yellow text-premium-blue font-bold rounded-lg"
                >
                  <Phone className="w-4 h-4" />
                  Solicitar Orçamento
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
