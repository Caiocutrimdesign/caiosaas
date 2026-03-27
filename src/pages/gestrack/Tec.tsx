import React, { useState, useEffect } from 'react';
import { useGestrackStore, ServiceOrder, Technician } from '@/hooks/useGestrackStore';
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
  ShieldCheck,
  Smartphone,
  User,
  LogOut,
  Image as ImageIcon,
  Clock,
  Filter,
  CheckCircle
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
  const [clientName, setClientName] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'in_progress' | 'finished'>('all');

  // If not logged in, show tech selector
  if (!store.currentTech) {
    return (
      <GestrackLayout>
        <div className="max-w-md mx-auto pt-10 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="w-20 h-20 bg-red-600 rounded-3xl mx-auto flex items-center justify-center mb-6 shadow-2xl shadow-red-600/20">
              <Smartphone className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter">Portal do <span className="text-red-600">Técnico</span></h1>
            <p className="text-zinc-500 font-bold text-xs mt-2 uppercase tracking-widest">Identifique-se para acessar suas rotas</p>
          </motion.div>

          <div className="space-y-4">
            {store.technicians.map((tech) => (
              <GestrackCard 
                key={tech.id} 
                className="cursor-pointer hover:border-red-600/50 transition-all active:scale-95 group"
                onClick={() => {
                  store.loginTech(tech);
                  toast.success(`Bem-vindo, ${tech.name.split(' ')[0]}!`);
                }}
              >
                <GestrackCardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center text-zinc-500 group-hover:bg-red-600 group-hover:text-white transition-all">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-black text-white uppercase italic text-sm">{tech.name}</h3>
                      <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Especialista I • Disponível</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-zinc-800 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
                </GestrackCardContent>
              </GestrackCard>
            ))}
          </div>
        </div>
      </GestrackLayout>
    );
  }

  const myOrders = store.orders.filter(o => {
    const isMine = o.technicianId === store.currentTech?.id;
    if (filter === 'all') return isMine;
    return isMine && o.status === filter;
  });

  const startInstallation = async (os: ServiceOrder) => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setActiveOs(os);
    setCurrentStep(0);
    store.updateOrderSteps(os.id, { started: new Date().toISOString() });
    store.updateOrderStatus(os.id, 'in_progress');
    toast.info('Atendimento iniciado no local');
    setIsProcessing(false);
  };

  const handleUploadPhoto = async (osId: string, type: string) => {
    setIsProcessing(true);
    toast.loading('Enviando foto para o servidor...', { duration: 1500 });
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const updates: any = {};
    updates[`${type}Photo`] = `photo_${type}_${Date.now()}.jpg`;
    store.updateOrderSteps(osId, updates);
    
    toast.success('Arquivo enviado com sucesso');
    setIsProcessing(false);
  };

  const handleRequestTest = async () => {
    if (!activeOs) return;
    setIsProcessing(true);
    toast.info('Solicitação enviada para teste');
    store.updateOrderTestStatus(activeOs.id, 'requested');
    
    // Simulate server side approval
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    store.updateOrderTestStatus(activeOs.id, 'approved');
    store.updateOrderSteps(activeOs.id, { tested: true });
    toast.success('Teste aprovado pela base');
    setIsProcessing(false);
  };

  const finishInstallation = async () => {
    if (!signature || !clientName) {
      toast.error('Assinatura e nome do cliente são obrigatórios');
      return;
    }
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (activeOs) {
      store.saveSignature(activeOs.id, signature);
      store.updateOrderSteps(activeOs.id, { finished: new Date().toISOString() });
      store.updateOrderStatus(activeOs.id, 'finished');
      toast.success('Ordem de Serviço finalizada com sucesso');
      setActiveOs(null);
    }
    setIsProcessing(false);
  };

  // OS Active View
  if (activeOs) {
    const order = store.orders.find(o => o.id === activeOs.id)!;
    const vehicle = store.vehicles.find(v => v.id === order.vehicleId);
    
    const steps = [
      { title: 'Início', icon: MapPin, desc: 'Chegada no local' },
      { title: 'Fotos', icon: Camera, desc: 'Checklist visual' },
      { title: 'Sinal', icon: Zap, desc: 'Teste satelital' },
      { title: 'Validação', icon: PenTool, desc: 'Assinatura digital' }
    ];

    const isTestApproved = order.testStatus === 'approved';
    const isTestRequested = order.testStatus === 'requested';
    const hasPhotos = !!(order.steps.trackerPhoto && order.steps.platePhoto && order.steps.dashPhoto && order.steps.installPhoto);

    return (
      <GestrackLayout>
        <div className="max-w-md mx-auto pb-24 px-4 pt-4">
          <motion.button 
            onClick={() => setActiveOs(null)}
            className="flex items-center gap-2 text-zinc-500 font-black uppercase text-[10px] mb-6 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Cancelar / Voltar
          </motion.button>

          <GestrackCard accent="red" className="relative overflow-visible">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[9px] font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-xl">
              Em Atendimento: {order.id}
            </div>
            
            <GestrackCardHeader className="pt-8">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-black text-white italic truncate tracking-tighter uppercase">{vehicle?.plate}</h2>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{vehicle?.brand} {vehicle?.model}</p>
                </div>
                <div className="text-right">
                  <p className="text-[8px] text-zinc-600 font-black uppercase tracking-widest mb-1">Passo Atual</p>
                  <GestrackBadge color="zinc">{currentStep + 1} de 4</GestrackBadge>
                </div>
              </div>
            </GestrackCardHeader>

            <GestrackCardContent className="space-y-8 pt-4">
               {/* Minimal Progress Bar */}
               <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                 <motion.div 
                   className="h-full bg-red-600" 
                   initial={{ width: 0 }} 
                   animate={{ width: `${(currentStep + 1) * 25}%` }} 
                 />
               </div>

               {/* STEPPER CONTENT */}
               <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="min-h-[300px]"
                  >
                    {currentStep === 0 && (
                      <div className="space-y-6 text-center pt-10">
                        <div className="w-20 h-20 bg-zinc-900 rounded-3xl mx-auto flex items-center justify-center border-2 border-zinc-800">
                          <MapPin className="w-10 h-10 text-red-500" />
                        </div>
                        <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Chegada no Destino</h3>
                        <p className="text-zinc-500 text-sm font-medium">Confirme que você está no endereço do cliente para iniciar os trabalhos.</p>
                        <GestrackButton 
                          onClick={() => setCurrentStep(1)} 
                          className="w-full h-16 bg-red-600 shadow-xl shadow-red-600/20"
                        >
                          Confirmar Localização
                        </GestrackButton>
                      </div>
                    )}

                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                          <Camera className="w-5 h-5 text-red-500" />
                          <h3 className="text-sm font-black text-white uppercase italic tracking-widest">Fotos Obrigatórias</h3>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { id: 'tracker', label: 'Rastreador' },
                            { id: 'plate', label: 'Placa' },
                            { id: 'dash', label: 'Painel' },
                            { id: 'install', label: 'Aplicação' }
                          ].map(photo => {
                            const isDone = !!(order.steps as any)[`${photo.id}Photo`];
                            return (
                              <div 
                                key={photo.id}
                                onClick={() => !isDone && handleUploadPhoto(order.id, photo.id)}
                                className={cn(
                                  "aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer relative overflow-hidden",
                                  isDone ? "bg-green-600/10 border-green-500/30" : "bg-zinc-950 border-zinc-900 hover:border-red-600/50"
                                )}
                              >
                                {isDone ? (
                                  <>
                                    <Check className="w-8 h-8 text-green-500" />
                                    <span className="text-[8px] font-black text-green-500 uppercase mt-2">Enviada</span>
                                  </>
                                ) : (
                                  <>
                                    <Camera className="w-8 h-8 text-zinc-800 mb-2" />
                                    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{photo.label}</span>
                                  </>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        
                        <GestrackButton 
                          disabled={!hasPhotos}
                          onClick={() => setCurrentStep(2)} 
                          className="w-full h-16 bg-red-600"
                        >
                          Próxima Etapa
                        </GestrackButton>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <div className="text-center space-y-4 pt-4">
                           <div className={cn(
                             "w-24 h-24 rounded-full mx-auto flex items-center justify-center border-4 transition-all duration-1000",
                             isTestApproved ? "bg-green-600/20 border-green-600 shadow-[0_0_30px_rgba(34,197,94,0.3)]" : "bg-zinc-900 border-zinc-800"
                           )}>
                             {isTestApproved ? <ShieldCheck className="w-12 h-12 text-green-500" /> : <Zap className={cn("w-12 h-12 text-zinc-700", isTestRequested && "animate-pulse color-yellow-500")} />}
                           </div>
                           
                           <h3 className={cn("text-xl font-black uppercase italic tracking-tighter", isTestApproved ? "text-green-500" : "text-white")}>
                             {isTestApproved ? "Sinal Sincronizado" : isTestRequested ? "Aguardando Aprovação..." : "Autenticação de Sinal"}
                           </h3>
                           <p className="text-zinc-500 text-sm font-medium">O hardware deve ser validado pela nossa central de monitoramento agora.</p>
                        </div>

                        {!isTestApproved ? (
                          <GestrackButton 
                            onClick={handleRequestTest} 
                            isLoading={isProcessing}
                            loadingText="ANALISANDO SINAL..."
                            className="w-full h-16 bg-blue-600"
                          >
                            Solicitar Teste de Comunicação
                          </GestrackButton>
                        ) : (
                          <GestrackButton 
                            onClick={() => setCurrentStep(3)} 
                            className="w-full h-16 bg-red-600 animate-in fade-in slide-in-from-bottom-2"
                          >
                            Avançar para Assinatura
                          </GestrackButton>
                        )}
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <label className="text-[10px] text-zinc-600 font-black uppercase tracking-widest ml-2">Nome do Responsável</label>
                          <input 
                            type="text" 
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            className="w-full h-14 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 font-bold focus:border-red-600 outline-none transition-all"
                            placeholder="Nome Completo do Cliente"
                          />
                        </div>

                        <div className="space-y-4">
                          <label className="text-[10px] text-zinc-600 font-black uppercase tracking-widest ml-2">Assinatura Digital</label>
                          <div className="bg-zinc-950 border-2 border-zinc-900 rounded-3xl h-48 relative overflow-hidden group hover:border-zinc-800 transition-all">
                             <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                               <PenTool className="w-16 h-16 text-zinc-400" />
                             </div>
                             {signature ? (
                               <div className="absolute inset-0 flex items-center justify-center font-serif text-4xl italic text-white pointer-events-none select-none">
                                 {signature}
                               </div>
                             ) : (
                               <div className="absolute inset-0 flex items-center justify-center text-zinc-800 text-[10px] font-black uppercase tracking-widest">Toque para assinar</div>
                             )}
                             <input 
                              type="text" 
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              onChange={(e) => setSignature(e.target.value)}
                             />
                          </div>
                        </div>

                        <GestrackButton 
                          onClick={finishInstallation} 
                          isLoading={isProcessing}
                          loadingText="ENVIANDO LAUDO..."
                          className="w-full h-16 bg-green-600 shadow-xl shadow-green-600/20"
                        >
                          Finalizar Ordem de Serviço
                        </GestrackButton>
                      </div>
                    )}
                  </motion.div>
               </AnimatePresence>
            </GestrackCardContent>
          </GestrackCard>
          
          <p className="text-center text-[10px] text-zinc-700 font-bold uppercase tracking-[0.3em] mt-10">
            Criptografia de ponta a ponta • Rastremix
          </p>
        </div>
      </GestrackLayout>
    );
  }

  return (
    <GestrackLayout>
      <div className="max-w-md mx-auto px-4 pb-24 pt-6">
        <div className="flex items-center justify-between mb-8">
          <div>
             <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">Minha <span className="text-red-600">Rota</span></h1>
             <p className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest mt-2">Logado como: <span className="text-white">{store.currentTech?.name}</span></p>
          </div>
          <button 
            onClick={() => store.logoutTech()}
            className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600 hover:text-red-500 transition-all"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        {/* Status Filters */}
        <div className="flex gap-2 overflow-x-auto pb-6 scrollbar-hide">
          <button 
            onClick={() => setFilter('all')}
            className={cn("px-4 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap", filter === 'all' ? "bg-red-600 text-white" : "bg-zinc-900 text-zinc-500 border border-zinc-800")}
          >
            Todos
          </button>
          <button 
            onClick={() => setFilter('pending')}
            className={cn("px-4 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap", filter === 'pending' ? "bg-yellow-600 text-white" : "bg-zinc-900 text-zinc-500 border border-zinc-800")}
          >
            Pendentes
          </button>
          <button 
            onClick={() => setFilter('in_progress')}
            className={cn("px-4 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap", filter === 'in_progress' ? "bg-blue-600 text-white" : "bg-zinc-900 text-zinc-500 border border-zinc-800")}
          >
            Andamento
          </button>
          <button 
            onClick={() => setFilter('finished')}
            className={cn("px-4 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap", filter === 'finished' ? "bg-green-600 text-white" : "bg-zinc-900 text-zinc-500 border border-zinc-800")}
          >
            Finalizadas
          </button>
        </div>

        <div className="space-y-4">
          {myOrders.length === 0 ? (
            <div className="text-center py-20 bg-zinc-950/50 rounded-[2.5rem] border-2 border-dashed border-zinc-900">
              <ClipboardList className="w-12 h-12 text-zinc-800 mx-auto mb-4 opacity-50" />
              <p className="text-zinc-700 font-black uppercase tracking-widest text-[10px]">Nenhuma O.S encontrada</p>
            </div>
          ) : (
            myOrders.map(order => {
              const vehicle = store.vehicles.find(v => v.id === order.vehicleId);
              const client = store.clients.find(c => c.id === order.clientId);
              const isFinished = order.status === 'finished';
              const isInProgress = order.status === 'in_progress';
              
              return (
                <GestrackCard 
                  key={order.id} 
                  accent={isFinished ? 'zinc' : isInProgress ? 'blue' : 'red'}
                  className={cn("transition-all duration-500", isFinished && "opacity-50 grayscale")}
                >
                  <GestrackCardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                       <span className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">{order.id}</span>
                       <GestrackBadge color={isFinished ? 'green' : isInProgress ? 'blue' : 'yellow'}>
                         {isFinished ? 'Finalizada' : isInProgress ? 'Na Rota' : 'Pendente'}
                       </GestrackBadge>
                    </div>

                    <div className="flex items-start gap-5 mb-6">
                       <div className={cn(
                         "w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0",
                         isFinished ? "bg-zinc-800" : isInProgress ? "bg-blue-600 shadow-lg shadow-blue-600/20" : "bg-red-600 shadow-lg shadow-red-600/20"
                       )}>
                         {isFinished ? <CheckCircle className="w-6 h-6 text-white" /> : <Wrench className="w-6 h-6 text-white" />}
                       </div>
                       <div>
                         <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none mb-1">{vehicle?.plate}</h3>
                         <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{vehicle?.brand} {vehicle?.model}</p>
                       </div>
                    </div>

                    <div className="space-y-3 pt-2 border-t border-zinc-900">
                       <div className="flex items-center gap-2 text-zinc-400">
                          <User className="w-3 h-3" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">{client?.name}</span>
                       </div>
                       <div className="flex items-center gap-2 text-zinc-500">
                          <MapPin className="w-3 h-3" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Atendimento In-loco</span>
                       </div>
                    </div>

                    {order.status !== 'finished' && (
                      <GestrackButton 
                        onClick={() => startInstallation(order)}
                        className={cn(
                          "w-full h-14 mt-6 uppercase italic font-black text-xs tracking-widest",
                          isInProgress ? "bg-blue-600" : "bg-red-600"
                        )}
                        isLoading={isProcessing && activeOs?.id === order.id}
                      >
                        {isInProgress ? 'Continuar OS' : 'Iniciar Instalação'} <ChevronRight className="w-4 h-4 ml-2" />
                      </GestrackButton>
                    )}
                  </GestrackCardContent>
                </GestrackCard>
              );
            })
          )}
        </div>
      </div>
    </GestrackLayout>
  );
};

export default TecPage;
