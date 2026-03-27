import React, { useState, useEffect } from 'react';
import { useGestrackStore, ServiceOrder } from '@/hooks/useGestrackStore';
import { 
  Camera, 
  CheckCircle2, 
  ChevronRight, 
  ArrowLeft,
  Wrench,
  Check,
  Zap,
  MapPin,
  ClipboardList,
  PenTool,
  Loader2,
  ShieldCheck
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
  const [signature, setSignature] = useState('');

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

  const handleRequestTest = async () => {
    if (!activeOs) return;
    setIsProcessing(true);
    store.updateOrderTestStatus(activeOs.id, 'requested');
    
    // Simulate approval delay
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    store.updateOrderTestStatus(activeOs.id, 'approved');
    store.updateOrderSteps(activeOs.id, { tested: true });
    toast.success('Hardware homologado via satélite!');
    setIsProcessing(false);
  };

  const handleNextStep = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    
    if (activeOs) {
      if (currentStep === 1) store.updateOrderSteps(activeOs.id, { photos: ['cam1.jpg', 'cam2.jpg'] });
    }
    
    setCurrentStep(currentStep + 1);
    setIsProcessing(false);
  };

  const finishInstallation = async () => {
    if (!signature) {
      toast.error('Assinatura do cliente é obrigatória');
      return;
    }
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (activeOs) {
      store.saveSignature(activeOs.id, signature);
      store.updateOrderSteps(activeOs.id, { finished: new Date().toISOString() });
      store.updateOrderStatus(activeOs.id, 'finished');
      toast.success('Serviço concluído com sucesso!');
      setActiveOs(null);
    }
    setIsProcessing(false);
  };

  if (activeOs) {
    const currentOrderFromStore = store.orders.find(o => o.id === activeOs.id);
    const isTestApproved = currentOrderFromStore?.testStatus === 'approved';
    const isTestRequested = currentOrderFromStore?.testStatus === 'requested';

    const steps = [
      { title: 'Localização', icon: MapPin, desc: 'Confirmar chegada no endereço.' },
      { title: 'Vistoria', icon: Camera, desc: 'Fotos antes da instalação.' },
      { title: 'Homologação', icon: Zap, desc: 'Teste de comunicação satelital.' },
      { title: 'Conclusão', icon: PenTool, desc: 'Assinatura digital e baixa.' }
    ];

    return (
      <GestrackLayout>
        <div className="max-w-md mx-auto space-y-6 pb-24 pt-4 px-4">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
            <GestrackButton variant="ghost" onClick={() => setActiveOs(null)} className="text-zinc-500 gap-2 mb-4 h-8 px-2 hover:bg-zinc-800">
              <ArrowLeft className="w-4 h-4" /> Voltar para Lista
            </GestrackButton>
          </motion.div>

          <GestrackCard accent="red" className="relative shadow-2xl">
             <div className="absolute -top-3 right-4 bg-red-600 text-white text-[9px] font-black px-3 py-1 rounded-full shadow-lg z-20">OS: {activeOs.id}</div>
            <GestrackCardHeader>
              <GestrackCardTitle>Fluxo Técnico</GestrackCardTitle>
              <GestrackCardDescription>Siga o protocolo obrigatório</GestrackCardDescription>
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
                                  <span className="text-[9px] font-black uppercase tracking-widest">Chassi</span>
                                </div>
                              </div>
                            )}

                            {i === 2 && (
                                <div className="space-y-4 mb-6">
                                  {!isTestApproved && (
                                    <div className="bg-zinc-950/80 p-5 rounded-2xl border border-zinc-800 flex flex-col gap-4">
                                      <div className="flex items-center gap-3">
                                        <div className={cn(
                                          "w-3 h-3 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)]",
                                          isTestRequested ? "bg-yellow-500 animate-pulse" : "bg-red-600"
                                        )}></div>
                                        <span className="text-[10px] text-zinc-400 font-black uppercase tracking-widest italic">
                                          {isTestRequested ? "Aguardando aprovação do servidor..." : "Aguardando teste de sinal"}
                                        </span>
                                      </div>
                                      {isTestRequested && (
                                        <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                                           <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 1.5, repeat: Infinity }} className="h-full w-1/2 bg-yellow-500" />
                                        </div>
                                      )}
                                    </div>
                                  )}
                                  
                                  {isTestApproved && (
                                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-green-600/10 border border-green-600/30 p-5 rounded-2xl flex items-center gap-4">
                                      <ShieldCheck className="text-green-500 w-8 h-8" />
                                      <div>
                                        <p className="text-[10px] text-green-500 font-black uppercase tracking-widest">Hardware Homologado</p>
                                        <p className="text-sm font-black text-white italic tracking-tighter">SINAL 100% OK</p>
                                      </div>
                                    </motion.div>
                                  )}
                                  
                                  {!isTestApproved && (
                                    <GestrackButton 
                                      onClick={handleRequestTest} 
                                      isLoading={isProcessing}
                                      loadingText="SOLICITANDO..."
                                      className="w-full h-14 bg-blue-600 hover:bg-blue-700 shadow-blue-600/20"
                                    >
                                      Solicitar Teste de Sinal
                                    </GestrackButton>
                                  )}
                                </div>
                            )}

                            {i === 3 && (
                              <div className="space-y-6 mb-6">
                                <div className="bg-zinc-950 rounded-2xl border-2 border-zinc-800 p-4 relative h-40 group hover:border-zinc-700 transition-all">
                                   <p className="absolute top-2 left-4 text-[9px] text-zinc-600 font-black uppercase tracking-widest">Assinatura Digital do Cliente</p>
                                   <div className="h-full w-full flex items-center justify-center cursor-crosshair">
                                      {signature ? (
                                        <div className="font-serif text-3xl italic text-zinc-300 pointer-events-none select-none">{signature}</div>
                                      ) : (
                                        <div className="text-zinc-800 flex flex-col items-center">
                                           <PenTool className="w-8 h-8 opacity-20 mb-2" />
                                           <span className="text-[10px] font-bold">Toque para assinar</span>
                                        </div>
                                      )}
                                      <input 
                                        type="text" 
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                                        onChange={(e) => setSignature(e.target.value)} 
                                        placeholder="Assinatura"
                                      />
                                   </div>
                                </div>
                                <GestrackButton 
                                  onClick={finishInstallation} 
                                  isLoading={isProcessing}
                                  loadingText="FINALIZANDO..."
                                  className="w-full h-14 bg-green-600 hover:bg-green-700 shadow-green-600/20"
                                >
                                  Finalizar Ordem de Serviço
                                </GestrackButton>
                              </div>
                            )}
                            
                            {i !== 2 && i !== 3 && (
                                <GestrackButton 
                                  onClick={handleNextStep} 
                                  isLoading={isProcessing}
                                  className="w-full h-14 bg-red-600 shadow-red-600/20"
                                >
                                  Confirmar & Continuar
                                </GestrackButton>
                            )}

                            {isTestApproved && i === 2 && (
                                <GestrackButton 
                                  onClick={handleNextStep} 
                                  className="w-full h-14 bg-red-600 shadow-red-600/20"
                                >
                                  Avançar para Assinatura
                                </GestrackButton>
                            )}
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
      <div className="max-w-md mx-auto space-y-8 pb-24 pt-6 px-4 font-sans">
        <div className="text-center relative">
          <GestrackBadge color="red" variant="glow" className="mb-6 h-7 font-black tracking-widest uppercase">Módulo Operacional</GestrackBadge>
          <h1 className="text-5xl font-black tracking-tighter text-white uppercase italic">
            Ordens <span className="text-red-600">Atribuídas</span>
          </h1>
          <p className="text-zinc-500 font-bold text-sm mt-3">Colaborador: <span className="text-zinc-100 uppercase tracking-widest ml-1">Ricardo Silva</span></p>
        </div>

        <div className="grid grid-cols-1 gap-5">
          {myOrders.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24 bg-zinc-900/30 border-2 border-zinc-900 rounded-[2.5rem] border-dashed">
              <ClipboardList className="w-16 h-16 text-zinc-800 mx-auto mb-6 opacity-30" />
              <p className="text-zinc-600 font-black uppercase tracking-widest text-[10px]">Sem ordens para hoje</p>
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
                  className={cn("relative overflow-hidden", isFinished && "opacity-40 grayscale")}
                >
                  <GestrackCardContent className="p-6 flex items-center gap-6">
                    <div className={cn(
                      "w-16 h-16 rounded-3xl flex items-center justify-center flex-shrink-0 transition-all duration-700",
                      isFinished ? "bg-zinc-800" : isProgress ? "bg-blue-600 shadow-xl shadow-blue-600/20" : "bg-red-600 shadow-xl shadow-red-600/20"
                    )}>
                      {isFinished ? <CheckCircle2 className="w-8 h-8 text-zinc-500" /> : <Wrench className="w-8 h-8 text-white animate-pulse" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">{order.id}</span>
                        {isProgress && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />}
                      </div>
                      <h3 className="text-2xl font-black text-white truncate uppercase italic tracking-tighter leading-none mb-1">{vehicle?.plate}</h3>
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider truncate">{vehicle?.brand} • {vehicle?.model}</p>
                    </div>
                    {!isFinished && (
                      <GestrackButton 
                        onClick={() => startInstallation(order)} 
                        isLoading={isProcessing && activeOs?.id === order.id}
                        className="w-12 h-12 p-0 rounded-2xl bg-zinc-800 border-zinc-700 hover:bg-red-600 transition-colors"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </GestrackButton>
                    )}
                  </GestrackCardContent>
                  {isProgress && (
                    <div className="h-1 w-full bg-zinc-950 overflow-hidden">
                       <motion.div 
                        initial={{ x: '-100%' }}
                        animate={{ x: '0%' }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="h-full w-full bg-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                       />
                    </div>
                  )}
                </GestrackCard>
              );
            })
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8 opacity-60">
            <div className="p-5 rounded-3xl bg-zinc-900/50 border border-zinc-900 flex flex-col items-center justify-center gap-2">
               <MapPin className="w-5 h-5 text-zinc-600" />
               <span className="text-[8px] font-black uppercase tracking-widest">Rotas</span>
            </div>
            <div className="p-5 rounded-3xl bg-zinc-900/50 border border-zinc-900 flex flex-col items-center justify-center gap-2">
               <ShieldCheck className="w-5 h-5 text-zinc-600" />
               <span className="text-[8px] font-black uppercase tracking-widest">Segurança</span>
            </div>
        </div>
      </div>
    </GestrackLayout>
  );
};

export default TecPage;
