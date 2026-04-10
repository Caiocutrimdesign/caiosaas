import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Instagram, Facebook, Phone } from "lucide-react";

const Logo = () => (
  <div className="relative group">
    <div className="absolute -inset-3 bg-gradient-to-r from-premium-yellow via-yellow-400 to-premium-yellow rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-all duration-700 animate-pulse"></div>
    <div className="relative">
      <img 
        src="https://premiumlocacao.com.br/wp-content/uploads/2019/07/logo-premium.png" 
        alt="Premium Locação"
        className="h-16 w-auto object-contain drop-shadow-2xl transform group-hover:scale-110 transition-all duration-500"
      />
    </div>
  </div>
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
      <div className="h-10 bg-premium-blueLight hidden md:flex items-center justify-center gap-8 text-xs text-gray-300">
        <a href="https://wa.me/5598991988828" className="flex items-center gap-2 hover:text-premium-yellow transition-colors">
          <Phone className="w-3 h-3" /> (98) 99198-8828
        </a>
        <span className="text-gray-600">|</span>
        <span>Av. Santos Dumont, 80 - Tirirical, São Luís - MA</span>
        <span className="text-gray-600">|</span>
        <a href="https://www.instagram.com/premiumlocacao/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-premium-yellow transition-colors">
          <Instagram className="w-3 h-3" /> @premiumlocacao
        </a>
      </div>
      
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-2xl py-2' 
          : 'bg-gradient-to-b from-white/95 to-white/80 backdrop-blur-sm py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.slice(0, Math.floor(navLinks.length / 2)).map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-3 py-2 text-sm font-semibold transition-all duration-300 relative ${
                    link.active || (link.href !== "/" && location.pathname.startsWith(link.href))
                      ? 'text-premium-yellow' 
                      : 'text-gray-700 hover:text-premium-blue'
                  }`}
                >
                  {link.name}
                  {(link.active || (link.href !== "/" && location.pathname.startsWith(link.href))) && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-premium-yellow rounded-full"></span>
                  )}
                </Link>
              ))}
            </nav>

            <Link to="/" className="flex-shrink-0 -ml-4 lg:ml-0 z-50">
              <Logo />
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.slice(Math.floor(navLinks.length / 2)).map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-3 py-2 text-sm font-semibold transition-all duration-300 relative ${
                    link.active || (link.href !== "/" && location.pathname.startsWith(link.href))
                      ? 'text-premium-yellow' 
                      : 'text-gray-700 hover:text-premium-blue'
                  }`}
                >
                  {link.name}
                  {(link.active || (link.href !== "/" && location.pathname.startsWith(link.href))) && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-premium-yellow rounded-full"></span>
                  )}
                </Link>
              ))}
              <div className="relative ml-2">
                <button
                  onClick={() => setIsContatoOpen(!isContatoOpen)}
                  className="flex items-center px-4 py-2 text-sm font-semibold text-gray-700 hover:text-premium-yellow transition-colors"
                >
                  CONTATO
                  <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${isContatoOpen ? 'rotate-180' : ''}`} />
                </button>
                {isContatoOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 py-3 animate-in fade-in slide-in-from-top-2 duration-200">
                    {contatoLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.href}
                        className="block px-5 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-premium-yellow/10 hover:to-transparent hover:text-premium-blue transition-all duration-200 font-medium"
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
              className="lg:hidden p-2 text-gray-700 hover:text-premium-blue transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-white/98 backdrop-blur-xl border-t border-gray-100 shadow-2xl animate-in slide-in-from-top-5 duration-300">
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`block py-4 px-4 text-base font-semibold rounded-xl transition-all duration-200 ${
                    link.active || (link.href !== "/" && location.pathname.startsWith(link.href))
                      ? 'bg-gradient-to-r from-premium-yellow/20 to-transparent text-premium-blue border-l-4 border-premium-yellow'
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
                    className="block py-3 px-4 text-base font-medium text-gray-700 hover:bg-premium-yellow/10 rounded-xl transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className="pt-4 flex gap-3 px-4">
                <a href="https://wa.me/5598991988828" className="flex-1 flex items-center justify-center gap-2 py-3 bg-premium-yellow text-premium-blue font-semibold rounded-xl hover:bg-premium-yellowDark transition-colors">
                  <Phone className="w-4 h-4" /> WhatsApp
                </a>
                <a href="https://www.instagram.com/premiumlocacao/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center px-4 bg-premium-blue text-white rounded-xl hover:bg-premium-blueLight transition-colors">
                  <Instagram className="w-5 h-5" />
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
