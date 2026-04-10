import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Send } from "lucide-react";

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

  return (
    <footer className="bg-premium-blue pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-white text-xl font-semibold mb-6">
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
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-premium-yellow transition-colors"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-premium-yellow transition-colors"
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
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-premium-yellow transition-colors"
                  required
                />
                <select
                  name="comoNosConheceu"
                  value={formData.comoNosConheceu}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-premium-yellow transition-colors"
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
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-premium-yellow transition-colors resize-none"
                required
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-premium-yellow text-premium-blue font-semibold rounded-lg hover:bg-premium-yellowDark transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Enviar
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-white text-xl font-semibold mb-6">
              Entre em Contato
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-premium-yellow flex-shrink-0 mt-0.5" />
                <p className="text-gray-300">
                  Av. Santos Dumont, 80 - Tirirical, São Luís - MA, 65046-660
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-premium-yellow flex-shrink-0" />
                <a
                  href="mailto:comercial.premiumguindastes@gmail.com"
                  className="text-gray-300 hover:text-premium-yellow transition-colors"
                >
                  comercial.premiumguindastes@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-premium-yellow flex-shrink-0" />
                <a
                  href="https://wa.me/5598991988828"
                  className="text-gray-300 hover:text-premium-yellow transition-colors"
                >
                  Whatsapp - (98) 99198-8828
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-premium-yellow flex-shrink-0" />
                <p className="text-gray-300">Fixo - (98) 3244-6776</p>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-white font-semibold mb-4">Links Rápidos</h4>
              <div className="grid grid-cols-2 gap-2">
                <Link to="/" className="text-gray-300 hover:text-premium-yellow transition-colors text-sm">
                  Home
                </Link>
                <Link to="/empresa" className="text-gray-300 hover:text-premium-yellow transition-colors text-sm">
                  Empresa
                </Link>
                <Link to="/equipamentos" className="text-gray-300 hover:text-premium-yellow transition-colors text-sm">
                  Equipamentos
                </Link>
                <Link to="/servicos" className="text-gray-300 hover:text-premium-yellow transition-colors text-sm">
                  Serviços
                </Link>
                <Link to="/galeria" className="text-gray-300 hover:text-premium-yellow transition-colors text-sm">
                  Galeria
                </Link>
                <Link to="/clientes" className="text-gray-300 hover:text-premium-yellow transition-colors text-sm">
                  Clientes
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-center text-gray-400 text-sm">
            Todos os direitos reservados Premium Locação - Desenvolvido por análise - © Copyright
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
