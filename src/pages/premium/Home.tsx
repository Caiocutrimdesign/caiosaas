import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Package, Move, Truck, Phone, Clock, Shield, Award, TrendingUp, CheckCircle, Star } from "lucide-react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: Award,
      title: "Desde 1989",
      description: "Mais de 3 décadas de experiência no mercado",
    },
    {
      icon: TrendingUp,
      title: "Líder no Norte/Nordeste",
      description: "Referência em locação de guindastes e transportes",
    },
    {
      icon: CheckCircle,
      title: "500+ Clientes Atendidos",
      description: "Empresas de grande porte confiam em nós",
    },
    {
      icon: Shield,
      title: "100+ Equipamentos",
      description: "Frota completa para qualquer necessidade",
    },
    {
      icon: Star,
      title: "Qualidade Garantida",
      description: "Certificação e manutenção preventiva rigorosa",
    },
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const stats = [
    { icon: Clock, value: "30+", label: "Anos de Experiência" },
    { icon: Award, value: "500+", label: "Clientes Atendidos" },
    { icon: Shield, value: "100+", label: "Equipamentos" },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-premium-blue via-premium-blueLight to-premium-blue"></div>
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-premium-yellow/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-transparent via-white/5 to-transparent rounded-full animate-spin-slow"></div>
      </div>

      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url('https://premiumlocacao.com.br/wp-content/uploads/2021/06/Guindaste-1024x683.jpg')",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-premium-yellow text-sm font-medium mb-8 border border-white/20">
              <Award className="w-4 h-4" />
              Referência em Locação de Guindastes desde 1989
            </div>
            
            <div className="mb-8">
              <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 md:p-8 max-w-4xl mx-auto overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-premium-yellow/10 via-transparent to-transparent"></div>
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-700 ${
                      index === currentSlide
                        ? "opacity-100 transform translate-x-0"
                        : "opacity-0 absolute top-0 left-0 transform translate-x-full"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-4 md:gap-6">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-premium-yellow to-yellow-400 rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0">
                        <slide.icon className="w-8 h-8 md:w-10 md:h-10 text-premium-blue" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                          {slide.title}
                        </h3>
                        <p className="text-gray-300 text-sm md:text-base">
                          {slide.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-center gap-2 mt-6">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? "bg-premium-yellow w-8"
                          : "bg-white/30 hover:bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 drop-shadow-2xl">
              Experiência nas atividades de <span className="text-premium-yellow">içamento</span>, <br />
              <span className="text-premium-yellow">remoção</span> e <span className="text-premium-yellow">transportes especiais</span> <br />
              há mais de 3 décadas.
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10">
              A Premium Locação oferece soluções completas em locação de equipamentos pesados, 
              com segurança, qualidade e suporte técnico especializado.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                to="/contato"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-premium-yellow text-premium-blue font-bold rounded-2xl hover:bg-premium-yellowDark transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <Phone className="w-5 h-5" />
                Solicite um Orçamento
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/equipamentos"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-2xl border border-white/30 hover:bg-white/20 transition-all duration-300"
              >
                Ver Equipamentos
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3 border border-white/20">
                    <stat.icon className="w-8 h-8 text-premium-yellow" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
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
      image: "https://premiumlocacao.com.br/wp-content/uploads/2019/08/G1-1024x683.jpg",
    },
    {
      icon: Move,
      title: "Remoção",
      description: "Trabalhamos com Remoção Industrial.",
      link: "/servicos#remocao",
      image: "https://premiumlocacao.com.br/wp-content/uploads/2019/08/Remoção-708x1024.jpeg",
    },
    {
      icon: Truck,
      title: "Transporte",
      description: "Fazemos transporte de cargas de grandes dimensões.",
      link: "/servicos#transporte",
      image: "https://premiumlocacao.com.br/wp-content/uploads/2019/08/transporte.png",
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
    <section id="services" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-premium-yellow/10 text-premium-blue text-sm font-semibold rounded-full mb-4">
            Nossos Serviços
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-premium-blue mb-4">
            Conheça Nossos Serviços
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-premium-yellow to-yellow-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link
              key={service.title}
              to={service.link}
              className={`group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 transform hover:-translate-y-2 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-premium-blue/80 to-transparent z-10"></div>
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <service.icon className="w-6 h-6 text-premium-blue" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-premium-blue mb-2 group-hover:text-premium-yellow transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-premium-blue group-hover:text-premium-yellow transition-colors">
                  Saiba mais
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
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
    <section id="equipamentos" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-premium-yellow/10 text-premium-blue text-sm font-semibold rounded-full mb-4">
            Nossa Frota
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-premium-blue mb-4">
            Conheça Nossos Equipamentos
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-premium-yellow to-yellow-400 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categorias.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeTab === cat.id
                  ? "bg-gradient-to-r from-premium-yellow to-yellow-400 text-premium-blue shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          {equipamentos[activeTab as keyof typeof equipamentos].map((equip, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-premium-blue to-premium-blueLight rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                <Truck className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-lg font-bold text-premium-blue group-hover:text-premium-yellow transition-colors">{equip}</h4>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/equipamentos"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-premium-blue to-premium-blueLight text-white font-bold rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
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
