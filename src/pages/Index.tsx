import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ArrowRight, 
  Stethoscope, 
  ActivitySquare, 
  HeartHandshake, 
  CalendarCheck,
  Phone,
  CheckCircle2,
  Syringe
} from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, 
    y: 0,
    transition: { delay: i * 0.1, duration: 0.8 }
  })
};

const serviceCard = "bg-white border border-teal-100 rounded-2xl p-8 hover:shadow-xl hover:shadow-teal-900/5 transition-all duration-300 relative group overflow-hidden";

export default function Index() {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  // Enforce light mode for the Dentist template
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-500/30 overflow-x-hidden">
      
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-50/50 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/3" />
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-cyan-50/50 rounded-full blur-3xl -z-10" />

      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50 flex items-center px-6 md:px-12 transition-all duration-300">
        <div className="flex-1 flex justify-start items-center gap-2">
          <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center text-white">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-900 leading-none mt-1">Dr. Thiago</span>
            <span className="text-xs font-semibold uppercase text-teal-600 tracking-wider">Odontologia</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-8 mx-auto">
          <a href="#services" className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors">Tratamentos</a>
          <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors">Planos Odontológicos</a>
          <a href="#contact" className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors">Contato</a>
        </div>

        <div className="flex-1 flex justify-end gap-4">
          <Link to="/login" className="hidden sm:flex text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors items-center">
            Área do Paciente
          </Link>
          <Button asChild className="rounded-full bg-teal-600 text-white hover:bg-teal-700 shadow-md hover:shadow-lg transition-all">
            <Link to="/register">Agendar Consulta</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 md:pt-56 md:pb-32 max-w-7xl mx-auto z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 max-w-2xl text-center md:text-left">
          <motion.div 
            custom={0} initial="hidden" animate="visible" variants={fadeUp}
            className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-sm font-medium text-teal-800 mb-6"
          >
            <span className="flex w-2 h-2 rounded-full bg-teal-500 mr-2 animate-pulse"></span>
            Atendimento humanizado
          </motion.div>
          
          <motion.h1 
            custom={1} initial="hidden" animate="visible" variants={fadeUp}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight"
          >
            Seu sorriso <br />
            é o nosso maior <span className="text-teal-600">compromisso.</span>
          </motion.h1>
          
          <motion.p 
            custom={2} initial="hidden" animate="visible" variants={fadeUp}
            className="text-lg text-slate-600 mb-10 leading-relaxed"
          >
            Especialistas em transformar vidas através de tratamentos odontológicos modernos, indolores e altamente eficazes.
          </motion.p>
          
          <motion.div 
            custom={3} initial="hidden" animate="visible" variants={fadeUp}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start"
          >
            <Button size="lg" asChild className="w-full sm:w-auto rounded-full px-8 h-14 bg-teal-600 hover:bg-teal-700 text-base shadow-lg shadow-teal-600/20">
              <a href="#services">Conhecer Tratamentos</a>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto rounded-full px-8 h-14 text-base border-slate-300 text-slate-700 hover:bg-slate-100">
              <a href="#contact"><Phone className="w-4 h-4 mr-2" /> Fale com a Clínica</a>
            </Button>
          </motion.div>
        </div>
        
        <motion.div style={{ y: yHero }} className="flex-1 hidden md:block">
          <div className="relative w-full aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-100 to-teal-100 rounded-[3rem] rotate-6 transform transition-transform hover:rotate-12 duration-700 opacity-60" />
            <div className="absolute inset-0 bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-teal-50">
              {/* Fake Image Placeholder since generic image URLs might break */}
              <div className="w-full h-full bg-slate-100 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2670&auto=format&fit=crop')" }}></div>
              </div>
            </div>
            
            {/* Floating badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-10 bg-white p-4 rounded-xl shadow-xl flex items-center gap-4 border border-slate-100"
            >
              <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-slate-900">+5.000</p>
                <p className="text-xs text-slate-500">Pacientes Felizes</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-teal-600 font-semibold tracking-wider uppercase text-sm mb-3">Especialidades</h2>
            <h3 className="text-4xl font-extrabold text-slate-900">Tratamentos Modernos</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className={serviceCard}>
              <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center mb-6">
                <ActivitySquare className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Clínico Geral</h4>
              <p className="text-slate-600 leading-relaxed">
                Prevenção, limpezas (profilaxia), restaurações e check-ups completos para a saúde da sua boca.
              </p>
            </div>
            
            <div className={serviceCard}>
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Ortodontia</h4>
              <p className="text-slate-600 leading-relaxed">
                Aparelhos invisíveis, estéticos e convencionais. Corrija a posição dos dentes com conforto e rapidez.
              </p>
            </div>

            <div className={serviceCard}>
              <div className="w-14 h-14 bg-cyan-50 text-cyan-600 rounded-xl flex items-center justify-center mb-6">
                <Syringe className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Implantes</h4>
              <p className="text-slate-600 leading-relaxed">
                Recupere dentes perdidos com próteses definitivas. Procedimento seguro com as melhores marcas do mercado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing/Plans Section */}
      <section id="pricing" className="py-24 bg-teal-900 relative px-6 overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-800 rounded-full blur-3xl opacity-50" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-teal-400 font-semibold tracking-wider uppercase text-sm mb-3">Assinaturas e Pacotes</h2>
          <h3 className="text-4xl font-extrabold text-white mb-6">Tratamentos Sob Medida</h3>
          <p className="text-teal-100 max-w-2xl mx-auto mb-16 text-lg">
            Acompanhamento contínuo da sua saúde bucal através de pacotes mensais e anuais flexíveis.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Prevention Plan */}
            <div className="bg-white rounded-3xl p-8 text-left shadow-2xl relative overflow-hidden group">
              <h4 className="text-2xl font-bold text-slate-900 mb-2">Plano Prevenção</h4>
              <p className="text-slate-500 mb-8">O essencial para manter seu sorriso saudável.</p>
              <div className="mb-8">
                <span className="text-4xl font-extrabold text-slate-900">Sob Medida</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-slate-700"><CheckCircle2 className="w-5 h-5 mr-3 text-teal-500 flex-shrink-0"/> 2 Limpezas completas ao ano</li>
                <li className="flex items-center text-slate-700"><CheckCircle2 className="w-5 h-5 mr-3 text-teal-500 flex-shrink-0"/> Aplicação de Flúor</li>
                <li className="flex items-center text-slate-700"><CheckCircle2 className="w-5 h-5 mr-3 text-teal-500 flex-shrink-0"/> Avaliação Clínica 3D</li>
              </ul>
              <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-12">Agendar Avaliação</Button>
            </div>

            {/* Ortho Plan */}
            <div className="bg-teal-600 rounded-3xl p-8 text-left shadow-2xl shadow-teal-900/50 border border-teal-500 relative overflow-hidden">
               <div className="absolute top-4 right-4 bg-teal-800 text-teal-100 text-xs font-bold px-3 py-1 rounded-full">Recomendado</div>
              <h4 className="text-2xl font-bold text-white mb-2">Plano Ortodôntico</h4>
              <p className="text-teal-100 mb-8">Para quem busca alinhar os dentes com precisão.</p>
              <div className="mb-8">
                <span className="text-4xl font-extrabold text-white">Sob Medida</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-teal-50"><CheckCircle2 className="w-5 h-5 mr-3 text-teal-300 flex-shrink-0"/> Aparelho Estético ou Transparente</li>
                <li className="flex items-center text-teal-50"><CheckCircle2 className="w-5 h-5 mr-3 text-teal-300 flex-shrink-0"/> Manutenções Mensais Inclusas</li>
                <li className="flex items-center text-teal-50"><CheckCircle2 className="w-5 h-5 mr-3 text-teal-300 flex-shrink-0"/> Raio-X de acompanhamento</li>
              </ul>
              <Button className="w-full bg-white text-teal-900 hover:bg-slate-100 rounded-xl h-12">Agendar Avaliação</Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto rounded-3xl bg-teal-50 border border-teal-100 p-12 text-center text-teal-900">
          <CalendarCheck className="w-12 h-12 mx-auto mb-6 text-teal-600" />
          <h2 className="text-3xl font-extrabold mb-4">Primeira consulta?</h2>
          <p className="text-teal-700 mb-8 max-w-lg mx-auto">
            Faça seu cadastro agora mesmo e tenha acesso à Área do Paciente para acompanhar seus pagamentos, orçamentos e agendamentos.
          </p>
          <Button size="lg" className="rounded-full bg-teal-600 text-white hover:bg-teal-700 shadow-md">
            Criar Minha Conta
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-slate-200 text-center px-6">
        <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Dr. Thiago Odontologia. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
