import { useState, useEffect } from "react";
import { Award, Users, Clock, Target, ArrowRight, CheckCircle, Instagram } from "lucide-react";

const Empresa = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("empresa-content");
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

  const stats = [
    { icon: Clock, value: "30+", label: "Anos de Experiência" },
    { icon: Users, value: "500+", label: "Clientes Atendidos" },
    { icon: Award, value: "100+", label: "Equipamentos" },
    { icon: Target, value: "1000+", label: "Projetos Concluídos" },
  ];

  const valores = [
    { name: "Ética", desc: "Agimos com integridade em todas as nossas relações" },
    { name: "Confiança", desc: "Construímos relacionamentos sólidos com nossos clientes" },
    { name: "Inovação", desc: "Buscamos sempre as melhores soluções" },
    { name: "Sustentabilidade", desc: "Praticamos responsabilidade socioambiental" },
    { name: "Transparência", desc: "Comunicamos de forma clara e honesta" },
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
            Empresa
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Experiência e qualidade em locação de equipamentos para indústria
          </p>
        </div>
      </section>

      <section id="empresa-content" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div 
              className={`transition-all duration-700 transform ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
              }`}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-premium-blue mb-6">
                Premium Locação
              </h2>
              <p className="text-gray-600 text-lg mb-4">
                A <strong>Premium Locação</strong> é uma empresa com mais de trinta anos de atuação no mercado de locação de máquinas pesadas. Referência no segmento desde 1989, oferecemos serviços especializados em transportes pesados, içamento vertical e cargas de grandes dimensões e complexidade, tendo como propósito a satisfação dos clientes e o sucesso dos trabalhos confiados a nós.
              </p>
              <p className="text-gray-600 text-lg mb-6">
                Nosso compromisso é o Gerenciamento da Qualidade, englobando métodos e processos de trabalho com uma política de ofertar mão de obra especializada, garantindo a qualidade em nossos produtos e serviços, assegurando nosso posicionamento consciente em relação ao meio ambiente e buscando o desenvolvimento sustentável por meio de práticas de responsabilidade socioambiental.
              </p>
              <p className="text-gray-600 text-lg mb-6">
                Acreditamos que a nossa equipe é a nossa força, por isso trabalhamos no cuidado, valorização e reconhecimento dos nossos funcionários, priorizando, em todas as esferas de trabalho, a segurança, a saúde e a capacitação constante das equipes, garantindo as melhores condições para os profissionais que compõem a Premium Locação.
              </p>
              <p className="text-gray-600 text-lg mb-8">
                Oferecemos equipamentos e serviços de alta capacidade, como empilhadeiras, guindastes, cavalos mecânicos e carretas. Nossa diversidade de maquinário nos permite atender o cliente conforme a sua necessidade, garantindo um atendimento personalizado.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 shadow-md">
                    <stat.icon className="w-8 h-8 text-premium-yellow mb-2" />
                    <div className="text-2xl font-bold text-premium-blue">{stat.value}</div>
                    <div className="text-gray-500 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div 
              className={`transition-all duration-700 delay-300 transform ${
                isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
              }`}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img 
                    src="https://premiumlocacao.com.br/wp-content/uploads/2021/06/Guindaste-1024x683.jpg" 
                    alt="Guindaste" 
                    className="rounded-lg shadow-lg w-full h-40 object-cover"
                  />
                  <img 
                    src="https://premiumlocacao.com.br/wp-content/uploads/2021/06/IMG_0005-1024x683.jpg" 
                    alt="Equipamento 2" 
                    className="rounded-lg shadow-lg w-full h-56 object-cover"
                  />
                </div>
                <div className="space-y-4 pt-8">
                  <img 
                    src="https://premiumlocacao.com.br/wp-content/uploads/2021/06/IMG_9997-1024x683.jpg" 
                    alt="Equipamento 3" 
                    className="rounded-lg shadow-lg w-full h-56 object-cover"
                  />
                  <img 
                    src="https://premiumlocacao.com.br/wp-content/uploads/2021/06/IMG_1144-1024x683.jpg" 
                    alt="Equipamento 4" 
                    className="rounded-lg shadow-lg w-full h-40 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-premium-blue text-center mb-12">
            Missão, Visão e Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-premium-gray100 rounded-xl p-8">
              <h3 className="text-xl font-bold text-premium-blue mb-4">MISSÃO</h3>
              <p className="text-gray-600">
                Nossa missão é garantir a excelência na qualidade dos nossos produtos e na prestação de serviços. Primamos pela eficiência como força motriz dos nossos negócios, assegurando nosso compromisso com ações de sustentabilidade e responsabilidade socioambiental, fortalecendo cada vez mais a confiança com os clientes.
              </p>
            </div>
            <div className="bg-premium-gray100 rounded-xl p-8">
              <h3 className="text-xl font-bold text-premium-blue mb-4">VISÃO</h3>
              <p className="text-gray-600">
                Ser líder no segmento de Locação de Guindastes, Remoção Industrial e Transportes. Com excelência, mantendo padrões de qualidade e competitividade, buscamos nos consolidar como referência na prestação de serviços, visando suprir as necessidades do mercado nacional, em especial nos estados do Norte e Nordeste.
              </p>
            </div>
            <div className="bg-premium-gray100 rounded-xl p-8">
              <h3 className="text-xl font-bold text-premium-blue mb-4">VALORES</h3>
              <ul className="space-y-2">
                {valores.map((valor, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-premium-yellow" />
                    <span className="font-medium text-premium-blue">{valor.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-premium-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-6">
            <a
              href="https://www.instagram.com/premiumlocacao/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-premium-yellow text-premium-blue font-semibold rounded-lg hover:bg-premium-yellowDark transition-colors"
            >
              <Instagram className="w-5 h-5" />
              Siga-nos no Instagram
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Empresa;
