import { useState, useEffect } from "react";
import { ArrowRight, Package, Move, Truck, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Servicos = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("servicos-content");
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

  const servicos = [
    {
      id: "locacao",
      icon: Package,
      title: "Locação",
      description: "Alugamos equipamentos para a execução de serviços complexos. Nossa frota inclui guindastes, carretas, cavalos mecânicos e empilhadeiras.",
      features: [
        "Guindastes telescópicos, AT e articulados",
        "Carretas convencionais e especiais",
        "Cavalos mecânicos de diversas potências",
        "Empilhadeiras de diferentes capacidades",
        "Manutenção preventiva incluída",
        "Suporte técnico especializado",
      ],
      image: "https://premiumlocacao.com.br/wp-content/uploads/2019/08/G1-1024x683.jpg",
    },
    {
      id: "remocao",
      icon: Move,
      title: "Remoção Industrial",
      description: "Serviço especializado em remoção industrial com equipe técnica qualificada e equipamentos adequados para operações seguras.",
      features: [
        "Planejamento detalhado de operações",
        "Equipe treinada e certificada",
        "Equipamentos de última geração",
        "Segurança em primeiro lugar",
        "Transporte de máquinas pesadas",
        "Desmontagem e montagem industrial",
      ],
      image: "https://premiumlocacao.com.br/wp-content/uploads/2019/08/Remoção-708x1024.jpeg",
    },
    {
      id: "transporte",
      icon: Truck,
      title: "Transporte",
      description: "Fazemos transporte de cargas de grandes dimensões com segurança e eficiência.",
      features: [
        "Cargas excedentes em peso e dimensão",
        "Transporte de máquinas industriais",
        "Escolta técnica especializada",
        "Monitoramento de rotas",
        "Documentação completa",
        "Equipe especializada",
      ],
      image: "https://premiumlocacao.com.br/wp-content/uploads/2019/08/transporte.png",
    },
  ];

  return (
    <div className="min-h-screen bg-premium-gray100">
      <section className="relative py-32 bg-premium-blue">
        <div className="absolute inset-0 bg-gradient-to-r from-premium-blue/90 to-premium-blueLight/80" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://premiumlocacao.com.br/wp-content/uploads/2019/08/banner-site-1.png')",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Serviços
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Soluções completas para sua indústria
          </p>
        </div>
      </section>

      <section id="servicos-content" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {servicos.map((servico, index) => (
              <div
                key={servico.id}
                id={servico.id}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-700 transform ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3">
                  <div className="relative h-64 lg:h-auto">
                    <img 
                      src={servico.image} 
                      alt={servico.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-premium-blue/30 lg:bg-gradient-to-r lg:from-premium-blue/80 lg:to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center lg:justify-start lg:pl-8">
                      <div className="w-20 h-20 bg-premium-yellow/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <servico.icon className="w-10 h-10 text-premium-yellow" />
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-2 p-8">
                    <h3 className="text-2xl font-bold text-premium-blue mb-4">{servico.title}</h3>
                    <p className="text-gray-600 mb-6">{servico.description}</p>
                    <h4 className="text-lg font-semibold text-premium-blue mb-4">O que inclui:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {servico.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-premium-yellow flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Servicos;
