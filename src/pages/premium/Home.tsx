import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Package, Truck, Move } from "lucide-react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-premium-blue/90 to-premium-blueLight/80 z-10" />
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        }}
      />
      <div className="relative z-20 max-w-5xl mx-auto px-4 text-center">
        <div 
          className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Experiência nas atividades de içamento, remoção e transportes especiais há mais de 3 décadas.
          </h1>
          <Link
            to="/contato"
            className="inline-flex items-center gap-2 px-8 py-4 bg-premium-yellow text-premium-blue font-semibold rounded-lg hover:bg-premium-yellowDark transition-all duration-300 text-lg"
          >
            Solicite um Orçamento
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      icon: Package,
      title: "Locação",
      description: "Alugamos equipamentos para a execução de serviços complexos.",
      link: "/servicos#locacao",
    },
    {
      icon: Move,
      title: "Remoção",
      description: "Trabalhamos com Remoção Industrial.",
      link: "/servicos#remocao",
    },
    {
      icon: Truck,
      title: "Transporte",
      description: "Fazemos transporte de cargas de grandes dimensões.",
      link: "/servicos#transporte",
    },
  ];

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("services");
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

  return (
    <section id="services" className="py-20 bg-premium-gray100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-premium-blue mb-4">
            Conheça Nossos Serviços
          </h2>
          <div className="w-24 h-1 bg-premium-yellow mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`bg-white rounded-xl shadow-lg p-8 transition-all duration-700 transform ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="w-16 h-16 bg-premium-yellow/10 rounded-lg flex items-center justify-center mb-6">
                <service.icon className="w-8 h-8 text-premium-yellow" />
              </div>
              <h3 className="text-xl font-semibold text-premium-blue mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <Link
                to={service.link}
                className="inline-flex items-center gap-2 text-premium-blue font-medium hover:text-premium-yellow transition-colors"
              >
                Saiba mais
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Equipamentos = () => {
  const [activeTab, setActiveTab] = useState("guindastes");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("equipamentos");
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

  const categorias = [
    { id: "guindastes", label: "Guindastes" },
    { id: "carretas", label: "Carretas" },
    { id: "cavalo", label: "Cavalo Mecânico" },
    { id: "empilhadeira", label: "Empilhadeira" },
  ];

  const equipamentos = {
    guindastes: [
      "Guindaste Telescópico",
      "Guindaste AT",
      "Guindaste Articulado",
    ],
    carretas: [
      "Transportes Convencionais",
      "Transportes Especiais",
      "Transportes Especiais de Cargas Pesadas e Longas",
    ],
    cavalo: [
      "Cavalo Mecânico Scania 440CV",
      "Cavalo Mecânico 1932 Ford",
      "Cavalo Mecânico Scania 420CV",
      "Cavalo Mecânico Sinotruck 380CV",
    ],
    empilhadeira: [
      "Empilhadeira Clarck – 3,5 Toneladas",
      "Empilhadeira Clarck – 7 Toneladas",
      "Empilhadeira Clarck – 4,5 Toneladas",
    ],
  };

  return (
    <section id="equipamentos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-premium-blue mb-4">
            Conheça Nossos Equipamentos
          </h2>
          <div className="w-24 h-1 bg-premium-yellow mx-auto" />
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categorias.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === cat.id
                  ? "bg-premium-blue text-white"
                  : "bg-premium-gray100 text-premium-blue hover:bg-premium-yellow/20"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {equipamentos[activeTab as keyof typeof equipamentos].map((equip, index) => (
            <div
              key={index}
              className="bg-premium-gray100 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-12 h-12 bg-premium-blue/10 rounded-lg flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-premium-blue" />
              </div>
              <h4 className="text-premium-blue font-semibold">{equip}</h4>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/equipamentos"
            className="inline-flex items-center gap-2 px-8 py-4 bg-premium-blue text-white font-semibold rounded-lg hover:bg-premium-blueLight transition-colors duration-300"
          >
            Ver Todos os Equipamentos
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <Equipamentos />
    </>
  );
};

export default Home;
