import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send, Briefcase, UserPlus, Clock } from "lucide-react";

const TrabalheConosco = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cargo: "",
    experiencia: "",
    mensagem: "",
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("trabalhe-content");
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

  const beneficios = [
    { icon: Clock, title: "Horário Flexível", desc: "Adaptação às suas necessidades" },
    { icon: Briefcase, title: "Ambiente Profissional", desc: "Equipes qualificadas" },
    { icon: UserPlus, title: "Crescimento Profissional", desc: "Capacitação contínua" },
  ];

  return (
    <div className="min-h-screen bg-premium-gray100">
      <section className="relative py-32 bg-premium-blue">
        <div className="absolute inset-0 bg-gradient-to-r from-premium-blue/90 to-premium-blueLight/80" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://premiumlocacao.com.br/wp-content/uploads/2021/06/IMG_0005-1024x683.jpg')",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trabalhe Conosco
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Junte-se à nossa equipe e faça parte de uma empresa líder no segmento
          </p>
        </div>
      </section>

      <section id="trabalhe-content" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div 
              className={`transition-all duration-700 transform ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
              }`}
            >
              <h2 className="text-2xl font-bold text-premium-blue mb-8">
                Por que trabalhar na Premium Locação?
              </h2>
              
              <p className="text-gray-600 text-lg mb-8">
                A Premium Locação acredita que a nossa equipe é a nossa força. 
                Trabalhamos no cuidado, valorização e reconhecimento dos nossos funcionários, 
                priorizando, em todas as esferas de trabalho, a segurança, a saúde e a 
                capacitação constante das equipes.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {beneficios.map((beneficio, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center">
                    <div className="w-14 h-14 bg-premium-yellow/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <beneficio.icon className="w-7 h-7 text-premium-yellow" />
                    </div>
                    <h3 className="font-semibold text-premium-blue mb-2">{beneficio.title}</h3>
                    <p className="text-gray-600 text-sm">{beneficio.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-premium-blue rounded-xl p-6 text-white">
                <h3 className="font-semibold mb-4">Nossas Vagas</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-premium-yellow rounded-full"></span>
                    Operadores de Guindaste
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-premium-yellow rounded-full"></span>
                    Motoristas de Cavalo Mecânico
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-premium-yellow rounded-full"></span>
                    Operadores de Empilhadeira
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-premium-yellow rounded-full"></span>
                    Técnicos de Manutenção
                  </li>
                </ul>
              </div>
            </div>

            <div 
              className={`transition-all duration-700 delay-300 transform ${
                isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
              }`}
            >
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-premium-blue mb-6">
                  Envie seu Currículo
                </h2>
                <p className="text-gray-600 mb-6">
                  Preencha o formulário abaixo e envie seu currículo. Entraremos em contato em breve.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="nome"
                      placeholder="Nome Completo"
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
                      name="cargo"
                      value={formData.cargo}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-premium-yellow transition-colors"
                      required
                    >
                      <option value="">Selecione o cargo de interesse</option>
                      <option value="operador-guindaste">Operador de Guindaste</option>
                      <option value="motorista">Motorista de Cavalo Mecânico</option>
                      <option value="operador-empilhadeira">Operador de Empilhadeira</option>
                      <option value="tecnico-manutencao">Técnico de Manutenção</option>
                      <option value="outros">Outros</option>
                    </select>
                  </div>
                  <div>
                    <textarea
                      name="experiencia"
                      placeholder="Descreva sua experiência profissional"
                      value={formData.experiencia}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-premium-yellow transition-colors resize-none"
                    />
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
                    Enviar Currículo
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

export default TrabalheConosco;
