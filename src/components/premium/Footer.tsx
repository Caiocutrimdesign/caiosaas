import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Clock, ArrowUp } from "lucide-react";

const Footer = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    comoNosConheceu: "",
    mensagem: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-b from-premium-blue to-premium-blueLight pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="/logo-novo.png" 
                alt="Premium Locação"
                className="h-14 object-contain"
              />
            </div>
            <h3 className="text-white text-xl font-bold mb-6">
              Solicite um Orçamento
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="nome"
                  placeholder="Nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-premium-yellow focus:bg-white/20 transition-all"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-premium-yellow focus:bg-white/20 transition-all"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="tel"
                  name="telefone"
                  placeholder="Telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-premium-yellow focus:bg-white/20 transition-all"
                  required
                />
                <select
                  name="comoNosConheceu"
                  value={formData.comoNosConheceu}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:border-premium-yellow focus:bg-white/20 transition-all [&>option]:text-gray-900"
                  required
                >
                  <option value="" className="text-gray-900">Como nos conheceu?</option>
                  <option value="google" className="text-gray-900">Busca do Google</option>
                  <option value="outros" className="text-gray-900">Outros buscadores</option>
                  <option value="anuncios" className="text-gray-900">Anúncios</option>
                  <option value="instagram" className="text-gray-900">Instagram</option>
                  <option value="facebook" className="text-gray-900">Facebook</option>
                  <option value="twitter" className="text-gray-900">Twitter</option>
                  <option value="indicacao" className="text-gray-900">Indicação</option>
                  <option value="outros" className="text-gray-900">Outros</option>
                </select>
              </div>
              <textarea
                name="mensagem"
                placeholder="Mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                rows={3}
                className="w-full px-5 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-premium-yellow focus:bg-white/20 transition-all resize-none"
                required
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-premium-yellow to-yellow-400 text-premium-blue font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Enviar
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-white text-xl font-bold mb-6">
              Entre em Contato
            </h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-premium-yellow" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Endereço</p>
                  <p className="text-white font-medium">
                    Av. Santos Dumont, 80 - Tirirical, São Luís - MA, 65046-660
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-premium-yellow" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Email</p>
                  <a
                    href="mailto:comercial.premiumguindastes@gmail.com"
                    className="text-white font-medium hover:text-premium-yellow transition-colors"
                  >
                    comercial.premiumguindastes@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-premium-yellow" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Whatsapp</p>
                  <a
                    href="https://wa.me/5598991988828"
                    className="text-white font-medium hover:text-premium-yellow transition-colors"
                  >
                    (98) 99198-8828
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-premium-yellow" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Fixo</p>
                  <p className="text-white font-medium">(98) 3244-6776</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-premium-yellow" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Horário de Atendimento</p>
                  <p className="text-white font-medium">Seg - Sex: 7h às 18h</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-white font-semibold mb-4">Redes Sociais</h4>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/premiumlocacao/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-premium-yellow hover:text-premium-blue transition-all duration-300"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-premium-yellow hover:text-premium-blue transition-all duration-300"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://wa.me/5598991988828"
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-premium-yellow hover:text-premium-blue transition-all duration-300"
                >
                  <Phone className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-white font-semibold mb-4">Links Rápidos</h4>
              <div className="grid grid-cols-2 gap-2">
                {["Home", "Empresa", "Equipamentos", "Serviços", "Galeria", "Clientes", "Contato"].map((link) => (
                  <Link 
                    key={link} 
                    to={`/${link.toLowerCase().replace(" ", "-").replace("ó", "o")}`}
                    className="text-gray-300 hover:text-premium-yellow transition-colors text-sm"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left">
            Todos os direitos reservados <span className="text-white font-semibold">Premium Locação</span> - Desenvolvido por análise - © Copyright
          </p>
          <button
            onClick={scrollToTop}
            className="w-12 h-12 bg-premium-yellow text-premium-blue rounded-xl flex items-center justify-center hover:shadow-lg hover:scale-110 transition-all duration-300"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
