import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send, Instagram } from "lucide-react";

const Contato = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    comoNosConheceu: "",
    mensagem: "",
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("contato-content");
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          setIsVisible(true);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <div className="min-h-screen bg-premium-gray100">
      <section className="relative py-32 bg-premium-blue">
        <div className="absolute inset-0 bg-gradient-to-r from-premium-blue/90 to-premium-blueLight/80" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://premiumlocacao.com.br/wp-content/uploads/2021/06/Guindaste-1024x683.jpg')",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Fale Conosco
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Esse espaço é um canal para que você possa entrar em contato conosco. Deixe sua sugestão, reclamação ou elogio.
          </p>
        </div>
      </section>

      <section id="contato-content" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div 
              className={`transition-all duration-700 transform ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
              }`}
            >
              <h2 className="text-2xl font-bold text-premium-blue mb-8">
                Entre em Contato
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-premium-yellow/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-premium-yellow" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-premium-blue">Endereço</h3>
                    <p className="text-gray-600">
                      Av. Santos Dumont, 80 - Tirirical, São Luís - MA, 65046-660
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-premium-yellow/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-premium-yellow" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-premium-blue">Email</h3>
                    <a
                      href="mailto:comercial.premiumguindastes@gmail.com"
                      className="text-gray-600 hover:text-premium-yellow transition-colors"
                    >
                      comercial.premiumguindastes@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-premium-yellow/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-premium-yellow" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-premium-blue">Whatsapp</h3>
                    <a
                      href="https://wa.me/5598991988828"
                      className="text-gray-600 hover:text-premium-yellow transition-colors"
                    >
                      (98) 99198-8828
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-premium-yellow/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-premium-yellow" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-premium-blue">Fixo</h3>
                    <p className="text-gray-600">(98) 3244-6776</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-premium-yellow/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-6 h-6 text-premium-yellow" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-premium-blue">Instagram</h3>
                    <a
                      href="https://www.instagram.com/premiumlocacao/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-premium-yellow transition-colors"
                    >
                      @premiumlocacao
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div 
              className={`transition-all duration-700 delay-300 transform ${
                isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
              }`}
            >
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-premium-blue mb-6">
                  Envie uma Mensagem
                </h2>
                <p className="text-gray-600 mb-6">
                  *Seu comentário é importante para nós.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="nome"
                      placeholder="Nome"
                      value={formData.nome}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-premium-yellow transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-premium-yellow transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="telefone"
                      placeholder="Telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-premium-yellow transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <select
                      name="comoNosConheceu"
                      value={formData.comoNosConheceu}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-premium-yellow transition-colors"
                      required
                    >
                      <option value="">Como nos conheceu?</option>
                      <option value="google">Busca do Google</option>
                      <option value="outros">Outros buscadores</option>
                      <option value="anuncios">Anúncios</option>
                      <option value="instagram">Instagram</option>
                      <option value="facebook">Facebook</option>
                      <option value="twitter">Twitter</option>
                      <option value="indicacao">Indicação</option>
                      <option value="outros">Outros</option>
                    </select>
                  </div>
                  <div>
                    <textarea
                      name="mensagem"
                      placeholder="Mensagem"
                      value={formData.mensagem}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-premium-yellow transition-colors resize-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-premium-yellow text-premium-blue font-semibold rounded-lg hover:bg-premium-yellowDark transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Enviar Mensagem
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contato;
