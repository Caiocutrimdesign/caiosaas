import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Package, Move, Truck, Phone, Clock, Shield, Award, ArrowDown, CheckCircle } from "lucide-react";

const slides = [
  {
    image: "https://premiumlocacao.com.br/wp-content/uploads/2021/06/Guindaste-1024x683.jpg",
    title: "Locação de Guindastes de Alta Performance",
    subtitle: "Mais de 30 anos de experiência",
    description: "Guindastes telescópicos, AT e articulados para projetos complexos de içamento. Equipamentos modernos com manutenção preventiva rigorosa e equipe técnica especializada.",
    features: ["Capacidade até 500 toneladas", "Operadores certificados", "Suporte técnico 24h"],
    cta: "Ver Equipamentos",
    ctaLink: "/equipamentos",
  },
  {
    image: "https://premiumlocacao.com.br/wp-content/uploads/2021/06/IMG_0005-1024x683.jpg",
    title: "Transporte Especializado de Cargas Pesadas",
    subtitle: "Segurança e eficiência garantidas",
    description: "Transportes convencionais, especiais e de cargas pesadas e longas. Documentação completa, escolta técnica especializada e monitoramento de rotas.",
    features: ["Cargas excedentes", "Escolta técnica", "Monitoramento GPS"],
    cta: "Solicitar Orçamento",
    ctaLink: "/contato",
  },
  {
    image: "https://premiumlocacao.com.br/wp-content/uploads/2019/08/G1-1024x683.jpg",
    title: "Remoção Industrial Completa",
    subtitle: "Especialistas em desmontagem e mudança",
    description: "Planejamento detalhado e execução segura de remoções industriais. Desmontagem, transporte e montagem de máquinas pesadas com total segurança.",
    features: ["Engenharia de remoções", "Equipamentos especializados", "Equipe treinada"],
    cta: "Saiba Mais",
    ctaLink: "/servicos",
  },
  {
    image: "https://premiumlocacao.com.br/wp-content/uploads/2021/06/IMG_9997-1024x683.jpg",
    title: "Frota Completa de Equipamentos",
    subtitle: "100+ equipamentos disponíveis",
    description: "Cavalos mecânicos, carretas e empilhadeiras para todas as necessidades. Frota diversificada para atender desde pequenos trabalhos até projetos de grande porte.",
    features: ["Diversos modelos", "Manutenção preventiva", "Entrega imediata"],
    cta: "Nossa Frota",
    ctaLink: "/equipamentos",
  },
  {
    image: "https://premiumlocacao.com.br/wp-content/uploads/2021/06/ab-1024x768.jpeg",
    title: "Excelência e Qualidade Desde 1989",
    subtitle: "Líder no Norte e Nordeste",
    description: "Referência no segmento de locação de máquinas pesadas. Compromisso com a qualidade, sustentabilidade e responsabilidade socioambiental.",
    features: ["500+ clientes atendidos", "Certificação de qualidade", "Compromisso ambiental"],
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
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-110"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540]/95 via-[#0A2540]/80 to-transparent z-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/60 via-transparent to-transparent z-20" />
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      <div className="relative z-30 h-full flex flex-col justify-center">
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute top-1/2 -translate-y-1/2 left-0 right-0 transition-all duration-700 ${
                index === currentSlide ? "opacity-100 translate-x-0" : "opacity-0 absolute top-1/2 -translate-y-1/2"
              }`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F5B041]/90 backdrop-blur-sm rounded-full text-[#0A2540] text-sm font-bold mb-6">
                    <Award className="w-4 h-4" />
                    {slide.subtitle}
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 drop-shadow-2xl">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-white/90 mb-4 font-light">{slide.description}</p>
                  <div className="flex flex-wrap gap-4 mb-6">
                    {slide.features?.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-white/80">
                        <CheckCircle className="w-4 h-4 text-[#F5B041]" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row items-start gap-4 mt-8">
                    <Link to={slide.ctaLink} className="group inline-flex items-center gap-3 px-8 py-4 bg-[#F5B041] text-[#0A2540] font-bold rounded-2xl hover:bg-white transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                      {slide.cta}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link to="/contato" className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-2xl border border-white/30 hover:bg-white/20 transition-all duration-300">
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

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {slides.map((_, index) => (
          <button key={index} onClick={() => setCurrentSlide(index)} className={`h-2 rounded-full transition-all duration-500 ${index === currentSlide ? "bg-[#F5B041] w-12" : "bg-white/50 w-2 hover:bg-white/80"}`} />
        ))}
      </div>

      <button onClick={scrollToContent} className="absolute bottom-8 right-8 z-30 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 animate-bounce">
        <ArrowDown className="w-5 h-5" />
      </button>

      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0A2540]/50 to-transparent z-10 pointer-events-none" />

      <a href="https://wa.me/5598991988828" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-2xl hover:bg-[#20BD5A] transition-all duration-300 flex items-center gap-2">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-3.172.856.856-3.172a9.894 9.894 0 011.378-5.071c.61-1.167 1.438-2.22 2.469-3.018.516-.4 1.142-.611 1.834-.611.691 0 1.318.21 1.834.611 1.03.798 1.859 1.851 2.469 3.018.516.4 1.057.89 1.486 1.434.429.544.715 1.168.858 1.834.143.666.071 1.371-.152 1.834l-.05.124-.096.195a.99.99 0 00.196.473l.124.05c.463.186.93.322 1.413.151.571-.085 1.758-.718 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
        </svg>
        <span className="font-semibold hidden sm:inline">WhatsApp</span>
      </a>
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
            <div className="w-20 h-20 bg-gradient-to-br from-[#F5B041] to-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <stat.icon className="w-10 h-10 text-[#0A2540]" />
            </div>
            <div className="text-4xl font-bold text-[#0A2540]">{stat.value}</div>
            <div className="text-gray-500 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Services = () => {
  const services = [
    { icon: Package, title: "Locação", description: "Alugamos equipamentos para a execução de serviços complexos.", link: "/servicos#locacao", image: "https://premiumlocacao.com.br/wp-content/uploads/2019/08/G1-1024x683.jpg" },
    { icon: Move, title: "Remoção", description: "Trabalhamos com Remoção Industrial.", link: "/servicos#remocao", image: "https://premiumlocacao.com.br/wp-content/uploads/2019/08/Remoção-708x1024.jpeg" },
    { icon: Truck, title: "Transporte", description: "Fazemos transporte de cargas de grandes dimensões.", link: "/servicos#transporte", image: "https://premiumlocacao.com.br/wp-content/uploads/2019/08/transporte.png" },
  ];

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("services");
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) setIsVisible(true);
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
          <span className="inline-block px-4 py-1 bg-[#F5B041]/10 text-[#0A2540] text-sm font-semibold rounded-full mb-4">Nossos Serviços</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A2540] mb-4">Conheça Nossos Serviços</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#F5B041] to-yellow-400 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link key={service.title} to={service.link} className={`group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 transform hover:-translate-y-2 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`} style={{ transitionDelay: `${index * 150}ms` }}>
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/80 to-transparent z-10"></div>
                <img src={service.image} alt={service.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <service.icon className="w-6 h-6 text-[#0A2540]" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0A2540] mb-2 group-hover:text-[#F5B041] transition-colors">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0A2540] group-hover:text-[#F5B041] transition-colors">
                 Saiba mais <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
        if (rect.top < window.innerHeight * 0.8) setIsVisible(true);
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
    guindastes: ["Guindaste Telescópico", "Guindaste AT", "Guindaste Articulado"],
    carretas: ["Transportes Convencionais", "Transportes Especiais", "Transportes Especiais de Cargas Pesadas e Longas"],
    cavalo: ["Cavalo Mecânico Scania 440CV", "Cavalo Mecânico 1932 Ford", "Cavalo Mecânico Scania 420CV", "Cavalo Mecânico Sinotruck 380CV"],
    empilhadeira: ["Empilhadeira Clarck – 3,5 Toneladas", "Empilhadeira Clarck – 7 Toneladas", "Empilhadeira Clarck – 4,5 Toneladas"],
  };

  return (
    <section id="equipamentos" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-[#F5B041]/10 text-[#0A2540] text-sm font-semibold rounded-full mb-4">Nossa Frota</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A2540] mb-4">Conheça Nossos Equipamentos</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#F5B041] to-yellow-400 mx-auto rounded-full"></div>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categorias.map((cat) => (
            <button key={cat.id} onClick={() => setActiveTab(cat.id)} className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${activeTab === cat.id ? "bg-gradient-to-r from-[#F5B041] to-yellow-400 text-[#0A2540] shadow-lg" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
              {cat.label}
            </button>
          ))}
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          {equipamentos[activeTab as keyof typeof equipamentos].map((equip, index) => (
            <div key={index} className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-[#0A2540] to-[#1B3A5A] rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                <Truck className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-lg font-bold text-[#0A2540] group-hover:text-[#F5B041] transition-colors">{equip}</h4>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/equipamentos" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#0A2540] to-[#1B3A5A] text-white font-bold rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            Ver Todos os Equipamentos <ArrowRight className="w-5 h-5" />
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
