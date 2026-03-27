import React, { useState } from 'react';
import { useGestrackStore, ServiceOrder } from '@/hooks/useGestrackStore';
import { 
  Camera, 
  Play, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  ArrowLeft,
  Wrench,
  Smartphone,
  Check,
  Zap,
  MapPin,
  ClipboardList
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import GestrackLayout from '@/components/layout/GestrackLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { GestrackButton } from '@/components/gestrack/ui/GestrackButton';
import { 
  GestrackCard, 
  GestrackCardContent, 
  GestrackCardHeader, 
  GestrackCardTitle,
  GestrackCardDescription 
} from '@/components/gestrack/ui/GestrackCard';
import { GestrackBadge } from '@/components/gestrack/ui/GestrackBadge';

const TecPage = () => {
  const store = useGestrackStore();
  const [activeOs, setActiveOs] = useState<ServiceOrder | null>(null);
  const [currentStep, setCurrentStep] = useState(0); 
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulate technician ID '1' (Ricardo Silva)
  const techId = '1'; 
  const myOrders = store.orders.filter(o => o.technicianId === techId);

  const startInstallation = async (os: ServiceOrder) => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setActiveOs(os);
    setCurrentStep(0);
    store.updateOrderSteps(os.id, { started: new Date().toISOString() });
    toast.info('Atendimento iniciado no local');
    setIsProcessing(false);
  };

  const handleNextStep = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    
    if (activeOs) {
      if (currentStep === 1) store.updateOrderSteps(activeOs.id, { photos: ['cam1.jpg', 'cam2.jpg'] });
      if (currentStep === 2) store.updateOrderSteps(activeOs.id, { tested: true });
    }
    
    setCurrentStep(currentStep + 1);
    setIsProcessing(false);
  };

  const finishInstallation = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (activeOs) {
      store.updateOrderSteps(activeOs.id, { finished: new Date().toISOString() });
      store.updateOrderStatus(activeOs.id, 'finished');
      toast.success('Serviço concluído e homologado!');
      setActiveOs(null);
    }
    setIsProcessing(false);
  };

  if (activeOs) {
    const steps = [
      { title: 'Check-in Local', icon: MapPin, desc: 'Validar coordenadas do cliente.' },
      { title: 'Vistoria & Fotos', icon: Camera, desc: 'Registrar evidências da instalação.' },
      { title: 'Teste de Sinal', icon: Zap, desc: 'Homologação do rastreador.' },
      { title: 'Finalização', icon: CheckCircle2, desc: 'Assinatura digital e baixa.' }
    ];

    return (
      <GestrackLayout>
        <div className="max-w-md mx-auto space-y-6 pb-24 pt-4 px-4 h-full flex flex-col">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
            <GestrackButton variant="ghost" onClick={() => setActiveOs(null)} className="text-zinc-500 gap-2 mb-4 h-8 px-2 hover:bg-zinc-800">
              <ArrowLeft className="w-4 h-4" /> Painel de Ordens
            </GestrackButton>
          </motion.div>

          <GestrackCard accent="red" className="relative shadow-2xl overflow-visible">
             <div className="absolute -top-3 right-4 bg-red-600 text-white text-[9px] font-black px-3 py-1 rounded-full shadow-lg z-20">PROTOCOLO: {activeOs.id}</div>
            <GestrackCardHeader>
              <GestrackCardTitle>Fluxo Operacional</GestrackCardTitle>
              <GestrackCardDescription>Procedimento técnico obrigatório</GestrackCardDescription>
            </GestrackCardHeader>
            <GestrackCardContent className="space-y-10 pt-4">
              <div className="relative space-y-12">
                <div className="absolute left-6 top-2 bottom-2 w-1.5 bg-zinc-950 rounded-full z-0 overflow-hidden">
                   <motion.div 
                    initial={{ height: 0 }} 
                    animate={{ height: `${(currentStep / (steps.length - 1)) * 100}%` }} 
                    className="w-full bg-red-600 transition-all duration-1000 shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                   />
                </div>
                
                {steps.map((step, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: currentStep >= i ? 1 : 0.3, scale: currentStep === i ? 1.05 : 1 }}
                    className="flex gap-6 relative z-10"
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border-2",
                      currentStep === i ? "bg-red-600 border-red-500 text-white shadow-xl shadow-red-600/30 font-black" : 
                      currentStep > i ? "bg-green-600 border-green-500 text-white" : 
                      "bg-zinc-950 border-zinc-900 text-zinc-700"
                    )}>
                      {currentStep > i ? <Check className="w-5 h-5 shadow-sm" /> : <step.icon className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <h4 className={cn("font-black text-sm uppercase italic tracking-tighter", currentStep === i ? "text-white" : "text-zinc-600")}>{step.title}</h4>
                      <p className="text-[11px] text-zinc-500 font-medium leading-tight mt-1">{step.desc}</p>
                      
                      <AnimatePresence>
                        {currentStep === i && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }} 
                            animate={{ height: 'auto', opacity: 1 }} 
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-6 overflow-hidden"
                          >
                            {i === 1 && (
                              <div className="grid grid-cols-2 gap-3 mb-6">
                                <div className="aspect-square bg-zinc-950 rounded-2xl flex flex-col items-center justify-center text-zinc-600 border-2 border-dashed border-zinc-800 hover:border-red-600/50 cursor-pointer transition-all active:scale-95">
                                  <Camera className="w-8 h-8 mb-2 opacity-30" />
                                  <span className="text-[9px] font-black uppercase tracking-widest">Veículo</span>
                                </div>
                                <div className="aspect-square bg-zinc-950 rounded-2xl flex flex-col items-center justify-center text-zinc-600 border-2 border-dashed border-zinc-800 hover:border-red-600/50 cursor-pointer transition-all active:scale-95">
                                  <Camera className="w-8 h-8 mb-2 opacity-30" />
                                  <span className="text-[9px] font-black uppercase tracking-widest">Painel</span>
                                </div>
                              </div>
                            )}
                            {i === 2 && (
                                <div className="bg-zinc-950/80 p-5 rounded-2xl border border-zinc-800 mb-6 flex flex-col gap-4">
                                  <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                                    <span className="text-[10px] text-zinc-400 font-black uppercase tracking-widest italic">Homologando Sinal GPRS...</span>
                                  </div>
                                  <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                                     <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 2, repeat: Infinity }} className="h-full w-1/3 bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]" />
                                  </div>
                                </div>
                            )}
                            
                            <GestrackButton 
                              onClick={i < 3 ? handleNextStep : finishInstallation} 
                              isLoading={isProcessing}
                              loadingText={i < 3 ? "PROCESSANDO..." : "FINALIZANDO..."}
                              className={cn(
                                "w-full h-14 text-xs font-black shadow-2xl",
                                i === 3 ? "bg-green-600 hover:bg-green-700 shadow-green-600/20" : "bg-red-600 shadow-red-600/20"
                              )}
                            >
                              {i < 3 ? "Confirmar & Continuar" : "Concluir Ordem de Serviço"}
                            </GestrackButton>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GestrackCardContent>
          </GestrackCard>
        </div>
      </GestrackLayout>
    );
  }

  return (
    <GestrackLayout>
      <div className="max-w-md mx-auto space-y-8 pb-24 pt-6 px-4">
        <div className="text-center relative">
          <GestrackBadge color="red" variant="glow" className="mb-6 h-7 font-black">App de Campo • TEC</GestrackBadge>
          <h1 className="text-5xl font-black tracking-tighter text-white uppercase italic">
            Ordens <span className="text-red-600">Ativas</span>
          </h1>
          <p className="text-zinc-500 font-bold text-sm mt-3">Operação: <span className="text-zinc-100 uppercase tracking-widest">Ricardo Silva</span></p>
        </div>

        <div className="grid grid-cols-1 gap-5">
          {myOrders.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24 bg-zinc-900/30 border-2 border-zinc-900 rounded-[2.5rem] border-dashed">
              <ClipboardList className="w-16 h-16 text-zinc-800 mx-auto mb-6 opacity-30" />
              <p className="text-zinc-600 font-black uppercase tracking-widest text-xs">Sem novas atribuições</p>
            </motion.div>
          ) : (
            myOrders.map((order, i) => {
              const vehicle = store.vehicles.find(v => v.id === order.vehicleId);
              const isFinished = order.status === 'finished';
              const isProgress = order.status === 'in_progress';
              
              return (
                <GestrackCard 
                  key={order.id} 
                  accent={isFinished ? 'zinc' : isProgress ? 'blue' : 'red'}
                  delay={i * 0.1}
                  className={cn(isFinished && "opacity-40 grayscale")}
                >
                  <GestrackCardContent className="p-5 flex items-center gap-5">
                    <div className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-700",
                      isFinished ? "bg-zinc-800" : isProgress ? "bg-blue-600 shadow-xl shadow-blue-600/20" : "bg-red-600 shadow-xl shadow-red-600/20"
                    )}>
                      {isFinished ? <CheckCircle2 className="w-8 h-8 text-zinc-500" /> : <Wrench className="w-8 h-8 text-white animate-pulse" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em] mb-1">{order.id} • {order.plan}</p>
                      <h3 className="text-2xl font-black text-white truncate uppercase italic tracking-tighter leading-none">{vehicle?.plate}</h3>
                      <p className="text-[10px] text-zinc-500 font-bold uppercase mt-1 truncate">{vehicle?.brand} {vehicle?.model}</p>
                    </div>
                    {!isFinished && (
                      <GestrackButton 
                        onClick={() => startInstallation(order)} 
                        isLoading={isProcessing && activeOs?.id === order.id}
                        className="w-12 h-12 p-0 rounded-2xl bg-zinc-800/50 border border-zinc-700 hover:bg-red-600"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </GestrackButton>
                    )}
                  </GestrackCardContent>
                  {!isFinished && (
                    <div className="h-1.5 w-full bg-zinc-950">
                       <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: isProgress ? '50%' : '15%' }} 
                        className={cn("h-full transition-all duration-1000 shadow-lg", isProgress ? "bg-blue-600" : "bg-red-600")} 
                       />
                    </div>
                  )}
                </GestrackCard>
              );
            })
          )}
        </div>

        {/* Support Grid */}
        <div className="mt-6 pt-10 border-t border-zinc-900 border-dashed space-y-6">
          <p className="text-center text-[10px] text-zinc-700 font-black uppercase tracking-[0.4em] italic leading-none">Canais de Apoio Técnico</p>
          <div className="grid grid-cols-2 gap-4">
             {[
               { icon: Smartphone, label: 'Central OS', color: 'red' },
               { icon: Camera, label: 'Guias PDF', color: 'zinc' }
             ].map((item, i) => (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.95 }}
                  className="h-28 bg-zinc-900/50 border border-zinc-800 rounded-[2rem] flex flex-col items-center justify-center gap-3 transition-all hover:bg-zinc-800 hover:border-zinc-700 group"
                >
                  <item.icon className={cn("w-6 h-6 transition-all group-hover:scale-125 duration-500", `text-${item.color}-600`)} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-white">{item.label}</span>
                </motion.button>
             ))}
          </div>
        </div>
      </div>
    </GestrackLayout>
  );
};

export default TecPage;
