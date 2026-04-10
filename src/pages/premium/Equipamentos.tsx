import { useState, useEffect } from "react";
import { ArrowRight, Truck, Package, Move, CheckCircle } from "lucide-react";

const Equipamentos = () => {
  const [activeTab, setActiveTab] = useState("guindastes");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("equipamentos-page");
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
    { id: "guindastes", label: "Guindastes", icon: Truck },
    { id: "carretas", label: "Carretas", icon: Package },
    { id: "cavalo", label: "Cavalo Mecânico", icon: Truck },
    { id: "empilhadeira", label: "Empilhadeira", icon: Move },
  ];

  const equipamentos = {
    guindastes: [
      { 
        name: "Guindaste Telescópico", 
        desc: "Ideal para operações de içamento em espaços confinados. Grande versatility e capacidade de alcance.",
        image: "https://premiumlocacao.com.br/wp-content/uploads/2021/06/Guindaste-1024x683.jpg"
      },
      { 
        name: "Guindaste AT (Autopropelido)", 
        desc: "Alta capacidade para cargas pesadas. Ideal para obras civis e industriais.",
        image: "https://premiumlocacao.com.br/wp-content/uploads/2021/06/ab-1024x768.jpeg"
      },
      { 
        name: "Guindaste Articulado", 
        desc: "Flexibilidade para operações complexas. Perfeito para espaços limitados.",
        image: "https://premiumlocacao.com.br/wp-content/uploads/2021/06/ac-1024x576.jpeg"
      },
    ],
    carretas: [
      { 
        name: "Transportes Convencionais", 
        desc: "Para cargas de peso moderado. идеаль para transporte regular.",
        image: "https://premiumlocacao.com.br/wp-content/uploads/2021/06/ad-1024x682.jpeg"
      },
      { 
        name: "Transportes Especiais", 
        desc: "Para cargas com dimensões atípicas. Equipamento especializado.",
        image: "https://premiumlocacao.com.br/wp-content/uploads/2021/06/ae-1024x682.jpeg"
      },
      { 
        name: "Transportes Especiais de Cargas Pesadas e Longas", 
        desc: "Para cargas de grande porte. Capacidade para máquinas industriais pesadas.",
        image: "https://premiumlocacao.com.br/wp-content/uploads/2021/06/af-1024x682.jpeg"
      },
    ],
    cavalo: [
      { 
        name: "Cavalo Mecânico Scania 440CV", 
        desc: "Alta potência para Transporte Pesado. Excelente performance.",
        image: "https://premiumlocacao.com.br/wp-content/uploads/2021/06/ag-1024x682.jpeg"
      },
      { 
        name: "Cavalo Mecânico 1932 Ford", 
        desc: "Clássico e confiável. Histórico de qualidade e durabilidade.",
        image: "https://premiumlocacao.com.br/wp-content/uploads/2021/06/ah-1024x576.jpeg"
      },
      { 
        name: "Cavalo Mecânico Scania 420CV", 
        desc: "Excelente desempenho. Potência e economia combinados.",
        image: "https://premiumlocacao.com.br/wp-content/uploads/2021/06/ai-1024x682.jpeg"
      },
      { 
        name: "Cavalo Mecânico Sinotruck 380CV", 
        desc: "Robustez e eficiência. Ideal para longas distâncias.",
        image: "https://premiumlocacao.com.br/wp-content/uploads/2021/06/aj-682x1024.jpeg"
      },
    ],
    empilhadeira: [
      { 
        name: "Empilhadeira Clarck – 3,5 Toneladas", 
        desc: "Compacta e ágil. Perfeita para espaços reduzidos.",
        image: "https://premiumlocacao.com.br/wp-content/uploads/2021/06/ak-576x1024.jpeg"
      },
      { 
        name: "Empilhadeira Clarck – 7 Toneladas", 
        desc: "Alta capacidade. Para cargas pesadas.",
        image: "https://premiumlocacao.com.br/wp-content/uploads/2021/06/al-576x1024.jpeg"
      },
      { 
        name: "Empilhadeira Clarck – 4,5 Toneladas", 
        desc: "Versatilidade operacional. Balance entre tamanho e capacidade.",
        image: "https://premiumlocacao.com.br/wp-content/uploads/2021/06/am-576x1024.jpeg"
      },
    ],
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
            Equipamentos
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Frota completa de equipamentos para locação
          </p>
        </div>
      </section>

      <section id="equipamentos-page" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categorias.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeTab === cat.id
                    ? "bg-premium-blue text-white"
                    : "bg-white text-premium-blue hover:bg-premium-yellow/20 shadow-md"
                }`}
              >
                <cat.icon className="w-5 h-5" />
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {equipamentos[activeTab as keyof typeof equipamentos].map((equip, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-700 transform ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={equip.image} 
                    alt={equip.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-premium-blue mb-2">{equip.name}</h3>
                  <p className="text-gray-600">{equip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Equipamentos;
