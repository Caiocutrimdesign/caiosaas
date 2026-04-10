import { useState, useEffect } from "react";
import { X } from "lucide-react";

const Galeria = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("galeria-content");
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

  const imagens = [
    "https://premiumlocacao.com.br/wp-content/uploads/2021/06/ab-1024x768.jpeg",
    "https://premiumlocacao.com.br/wp-content/uploads/2021/06/ac-1024x576.jpeg",
    "https://premiumlocacao.com.br/wp-content/uploads/2021/06/ad-1024x682.jpeg",
    "https://premiumlocacao.com.br/wp-content/uploads/2021/06/ae-1024x682.jpeg",
    "https://premiumlocacao.com.br/wp-content/uploads/2021/06/af-1024x682.jpeg",
    "https://premiumlocacao.com.br/wp-content/uploads/2021/06/ag-1024x682.jpeg",
    "https://premiumlocacao.com.br/wp-content/uploads/2021/06/ah-1024x576.jpeg",
    "https://premiumlocacao.com.br/wp-content/uploads/2021/06/ai-1024x682.jpeg",
    "https://premiumlocacao.com.br/wp-content/uploads/2021/06/aj-682x1024.jpeg",
    "https://premiumlocacao.com.br/wp-content/uploads/2021/06/ak-576x1024.jpeg",
    "https://premiumlocacao.com.br/wp-content/uploads/2021/06/al-576x1024.jpeg",
    "https://premiumlocacao.com.br/wp-content/uploads/2021/06/am-576x1024.jpeg",
    "https://premiumlocacao.com.br/wp-content/uploads/2021/06/an-576x1024.jpeg",
    "https://premiumlocacao.com.br/wp-content/uploads/2021/06/ao-1024x576.jpeg",
    "https://premiumlocacao.com.br/wp-content/uploads/2021/06/ap-1024x576.jpeg",
    "https://premiumlocacao.com.br/wp-content/uploads/2021/06/aq-830x1024.jpeg",
    "https://premiumlocacao.com.br/wp-content/uploads/2021/06/ar-768x1024.jpeg",
    "https://premiumlocacao.com.br/wp-content/uploads/2021/06/Guindaste-1024x683.jpg",
    "https://premiumlocacao.com.br/wp-content/uploads/2021/06/IMG_0005-1024x683.jpg",
    "https://premiumlocacao.com.br/wp-content/uploads/2021/06/IMG_0020-1024x683.jpg",
    "https://premiumlocacao.com.br/wp-content/uploads/2021/06/IMG_0042-1024x683.jpg",
    "https://premiumlocacao.com.br/wp-content/uploads/2021/06/IMG_0061-1024x683.jpg",
    "https://premiumlocacao.com.br/wp-content/uploads/2021/06/IMG_1144-1024x683.jpg",
    "https://premiumlocacao.com.br/wp-content/uploads/2021/06/IMG_9997-1024x683.jpg",
    "https://premiumlocacao.com.br/wp-content/uploads/2021/06/loc-1024x682.jpeg",
  ];

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
            Galeria de Equipamentos
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Alguns dos nossos equipamentos em ação
          </p>
        </div>
      </section>

      <section id="galeria-content" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-600 text-center mb-8">
            <em>Clique nas imagens para ampliá-las.</em>
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {imagens.map((src, index) => (
              <div
                key={index}
                className={`relative group cursor-pointer overflow-hidden rounded-lg shadow-lg transition-all duration-700 transform ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
                onClick={() => setSelectedImage(src)}
              >
                <img 
                  src={src} 
                  alt={`Equipamento ${index + 1}`}
                  className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-premium-blue/0 group-hover:bg-premium-blue/40 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-premium-yellow transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img 
            src={selectedImage} 
            alt="Imagem ampliada"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Galeria;
