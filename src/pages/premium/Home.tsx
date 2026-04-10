import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Package, Move, Truck, Phone, Clock, Shield, Award, ChevronLeft, ChevronRight, ArrowDown } from "lucide-react";

const slides = [
  {
    image: "https://premiumlocacao.com.br/wp-content/uploads/2021/06/Guindaste-1024x683.jpg",
    title: "Locação de Guindastes",
    subtitle: "Equipamentos de alta capacidade para içamento industrial",
    description: "Guindastes telescópicos, AT e articulados para projetos complexos",
    cta: "Ver Equipamentos",
    ctaLink: "/equipamentos",
  },
  {
    image: "https://premiumlocacao.com.br/wp-content/uploads/2021/06/IMG_0005-1024x683.jpg",
    title: "Transporte Especializado",
    subtitle: "Cargas de grandes dimensões com segurança",
    description: "Transportes convencionais, especiais e de cargas pesadas",
    cta: "Solicitar Orçamento",
    ctaLink: "/contato",
  },
  {
    image: "https://premiumlocacao.com.br/wp-content/uploads/2019/08/G1-1024x683.jpg",
    title: "Remoção Industrial",
    subtitle: "Especialistas em desmontagem industrial",
    description: "Planejamento detalhado e execução segura de remoções industriais",
    cta: "Saiba Mais",
    ctaLink: "/servicos",
  },
  {
    image: "https://premiumlocacao.com.br/wp-content/uploads/2021/06/IMG_9997-1024x683.jpg",
    title: "Frota Completa",
    subtitle: "Mais de 100 equipamentos disponíveis",
    description: "Cavalos mecânicos, carretas e empilhadeiras para todas as necessidades",
    cta: "Nossa Frota",
    ctaLink: "/equipamentos",
  },
  {
    image: "https://premiumlocacao.com.br/wp-content/uploads/2021/06/ab-1024x768.jpeg",
    title: "Excelência desde 1989",
    subtitle: "3 décadas de experiência e qualidade",
    description: "Referência no segmento de locação de máquinas pesadas no Norte/Nordeste",
    cta: "Nossa História",
    ctaLink: "/empresa",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const scrollToContent = () => {
    document.getElementById("hero-content")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen min-h-[600px] md:min-h-[800px] overflow-hidden">
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-110"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-premium-blue/90 via-premium-blue/70 to-transparent z-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-premium-blue/50 via-transparent to-transparent z-20" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="relative z-30 h-full flex flex-col justify-center">
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute top-1/2 -translate-y-1/2 left-0 right-0 transition-all duration-700 ${
                index === currentSlide
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 absolute top-1/2 -translate-y-1/2"
              }`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-premium-yellow/90 backdrop-blur-sm rounded-full text-premium-blue text-sm font-bold mb-6">
                    <Award className="w-4 h-4" />
                    {slide.subtitle}
                  </div>
                  
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4 drop-shadow-2xl">
                    {slide.title}
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-white/90 mb-4 font-light">
                    {slide.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-start gap-4 mt-8">
                    <Link
                      to={slide.ctaLink}
                      className="group inline-flex items-center gap-3 px-8 py-4 bg-premium-yellow text-premium-blue font-bold rounded-2xl hover:bg-white transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                    >
                      {slide.cta}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      to="/contato"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-2xl border border-white/30 hover:bg-white/20 transition-all duration-300"
                    >
                      <Phone className="w-5 h-5" />
                      Falar com Especialista
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === currentSlide
                  ? "bg-premium-yellow w-12"
                  : "bg-white/50 w-2 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>

      <button
        onClick={scrollToContent}
        className="absolute bottom-8 right-8 z-30 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 animate-bounce"
      >
        <ArrowDown className="w-5 h-5" />
      </button>

      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-premium-blue/50 to-transparent z-10 pointer-events-none" />
    </section>
  );
};

const HeroContent = () => (
  <div id="hero-content" className="py-24 bg-gradient-to-b from-gray-50 to-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: Clock, value: "30+", label: "Anos de Experiência" },
          { icon: Award, value: "500+", label: "Clientes Atendidos" },
          { icon: Shield, value: "100+", label: "Equipamentos" },
        ].map((stat, index) => (
          <div key={index} className="text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-20 h-20 bg-gradient-to-br from-premium-yellow to-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <stat.icon className="w-10 h-10 text-premium-blue" />
            </div>
            <div className="text-4xl font-bold text-premium-blue">{stat.value}</div>
            <div className="text-gray-500 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

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
      <HeroContent />
      <Services />
      <Equipamentos />
    </>
  );
};

export default Home;
