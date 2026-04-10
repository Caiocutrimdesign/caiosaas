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

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const textColor = scrolled ? "text-gray-700 hover:text-premium-blue" : "text-white hover:text-premium-yellow";

  return (
    <>
      <div className="h-8 bg-[#0A2540] hidden md:flex items-center justify-center gap-8 text-xs text-gray-300">
        <a href="https://wa.me/5598991988828" className="flex items-center gap-2 hover:text-[#F5B041] transition-colors">
          <Phone className="w-3 h-3" /> (98) 99198-8828
        </a>
        <span className="text-gray-500">|</span>
        <span>Av. Santos Dumont, 80 - Tirirical, São Luís - MA</span>
        <span className="text-gray-500">|</span>
        <a href="https://www.instagram.com/premiumlocacao/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#F5B041] transition-colors">
          <Instagram className="w-3 h-3" /> @premiumlocacao
        </a>
      </div>
      
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-[#0A2540]'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-3 py-2 text-sm font-semibold transition-all duration-300 ${
                    isActive(link.href) ? 'text-[#F5B041]' : textColor
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="relative ml-2">
                <button
                  onClick={() => setIsContatoOpen(!isContatoOpen)}
                  className={`flex items-center px-4 py-2 text-sm font-semibold transition-all duration-300 ${textColor}`}
                >
                  CONTATO
                  <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${isContatoOpen ? 'rotate-180' : ''}`} />
                </button>
                {isContatoOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                    {contatoLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#0A2540] transition-colors"
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
              className={`lg:hidden p-2 ${scrolled ? 'text-gray-700' : 'text-white'}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div className="flex-shrink-0">
              <Logo />
            </div>

            <div className="hidden lg:flex items-center">
              <a
                href="https://wa.me/5598991988828"
                className="flex items-center gap-2 px-4 py-2 bg-[#F5B041] text-[#0A2540] font-semibold rounded-lg hover:bg-[#D49B2A] transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                Orçamento
              </a>
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
                    isActive(link.href) 
                      ? 'bg-[#F5B041]/10 text-[#0A2540] border-l-4 border-[#F5B041]' 
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
                  className="flex items-center justify-center gap-2 py-3 bg-[#F5B041] text-[#0A2540] font-bold rounded-lg"
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
