import { useState, useEffect } from "react";

const Clientes = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("clientes-content");
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

  const clientes = [
    { name: "ENESA", url: "http://www.enesa.com.br/enesa/web/default_pt.asp?idioma=0&conta=28", logo: "https://premiumlocacao.com.br/wp-content/uploads/2021/05/enesa.png" },
    { name: "WHITE MARTINS", url: "https://www.praxair.com.br/", logo: "https://premiumlocacao.com.br/wp-content/uploads/2021/05/White-Martins_.png" },
    { name: "CIMENTO BRAVO", url: "http://www.cimentobravo.com.br/", logo: "https://premiumlocacao.com.br/wp-content/uploads/2019/08/cimento-bravo-logo.jpg" },
    { name: "COPABO", url: "http://www.copabo.com.br/", logo: "https://premiumlocacao.com.br/wp-content/uploads/2021/05/Copabo.png" },
    { name: "SANCHES TRIPOLONI", url: "https://www.sanchestripoloni.com.br/", logo: "https://premiumlocacao.com.br/wp-content/uploads/2021/05/Sanches-Tripolini.jpg" },
    { name: "A GERADORA", url: "https://www.ageradora.com.br/", logo: "https://premiumlocacao.com.br/wp-content/uploads/2019/08/geradora-aluguel-logo.jpg" },
    { name: "LLUCENA INFRAESTRUTURA", url: "https://www.grupollucena.com.br/", logo: "https://premiumlocacao.com.br/wp-content/uploads/2021/05/Lucena.png" },
    { name: "MATEUS", url: "https://www.mateusonline.com.br/", logo: "https://premiumlocacao.com.br/wp-content/uploads/2019/08/mateus-logo.jpg" },
    { name: "NIPLAN ENGENHARIA", url: "http://www.niplan.com.br/", logo: "https://premiumlocacao.com.br/wp-content/uploads/2019/08/Niplan-logo.jpg" },
    { name: "ÔMEGA SERVICE", url: "http://www.omegaservice.com.br", logo: "https://premiumlocacao.com.br/wp-content/uploads/2019/08/omega-logo.png" },
    { name: "PEDREIRAS TRANSPORTES", url: "http://www.pedreirastransportes.com.br", logo: "https://premiumlocacao.com.br/wp-content/uploads/2019/08/Pedreiras-transportes-logo-1.png" },
    { name: "ZORTEA CONSTRUÇÕES", url: "http://zortea.com.br/www/", logo: "https://premiumlocacao.com.br/wp-content/uploads/2019/08/Zortea-logo.png" },
    { name: "ULTRACARGO", url: "https://www.ultracargo.com.br/", logo: "https://premiumlocacao.com.br/wp-content/uploads/2021/05/Ultracargo.png" },
    { name: "MILLS", url: "https://www.milplan.com.br/", logo: "https://premiumlocacao.com.br/wp-content/uploads/2021/05/Mills.png" },
    { name: "VALE", url: "http://www.vale.com/brasil/pt/paginas/default.aspx", logo: "https://premiumlocacao.com.br/wp-content/uploads/2021/05/Vale.png" },
    { name: "EQUATORIAL", url: "https://ma.equatorialenergia.com.br/", logo: "https://premiumlocacao.com.br/wp-content/uploads/2021/05/logo-equatorial-energia-512.png" },
    { name: "TRANSPES", url: "http://www.transpes.com.br/", logo: "https://premiumlocacao.com.br/wp-content/uploads/2021/05/transpes-logo.png" },
    { name: "ENEVA", url: "https://eneva.com.br/", logo: "https://premiumlocacao.com.br/wp-content/uploads/2021/05/Eneva.png" },
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
            Clientes
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Empresas que confiam em nossos serviços
          </p>
        </div>
      </section>

      <section id="clientes-content" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-premium-blue text-center mb-12">
            Conheça alguns de nossos clientes:
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {clientes.map((cliente, index) => (
              <a
                key={index}
                href={cliente.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-white rounded-xl shadow-md p-6 flex items-center justify-center h-32 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <img 
                  src={cliente.logo} 
                  alt={cliente.name}
                  className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Clientes;
