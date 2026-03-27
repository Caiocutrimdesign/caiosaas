import React, { useState } from 'react';
import { useGestrackStore, ServiceOrder } from '@/hooks/useGestrackStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Camera, 
  Play, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  ArrowLeft,
  Wrench,
  Smartphone,
  Check
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import GestrackLayout from '@/components/layout/GestrackLayout';

const StatusBadge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-colors", className)}>
    {children}
  </span>
);

const TecPage = () => {
  const store = useGestrackStore();
  const [activeOs, setActiveOs] = useState<ServiceOrder | null>(null);
  const [currentStep, setCurrentStep] = useState(0); // 0: Start, 1: Photos, 2: Test, 3: Finish

  // Simulate hardcoded technician ID for demo
  const techId = '1'; 
  const myOrders = store.orders.filter(o => o.technicianId === techId);

  const startInstallation = (os: ServiceOrder) => {
    setActiveOs(os);
    setCurrentStep(0);
    store.updateOrderSteps(os.id, { started: new Date().toISOString() });
    toast.info('Instalação iniciada');
  };

  const handleNextStep = () => {
    if (activeOs) {
      if (currentStep === 1) { // Photos
        store.updateOrderSteps(activeOs.id, { photos: ['photo1.jpg', 'photo2.jpg'] });
      } else if (currentStep === 2) { // Test
        store.updateOrderSteps(activeOs.id, { tested: true });
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const finishInstallation = () => {
    if (activeOs) {
      store.updateOrderSteps(activeOs.id, { finished: new Date().toISOString() });
      store.updateOrderStatus(activeOs.id, 'finished');
      toast.success('Instalação finalizada com sucesso!');
      setActiveOs(null);
    }
  };

  if (activeOs) {
    return (
      <GestrackLayout>
        <div className="max-w-md mx-auto space-y-6 pb-20 pt-4 animate-in fade-in slide-in-from-right-4 duration-500">
          <Button variant="ghost" onClick={() => setActiveOs(null)} className="text-zinc-400 gap-2 mb-4 hover:bg-zinc-800">
            <ArrowLeft className="w-4 h-4" /> Voltar para Lista
          </Button>

          <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm border-t-4 border-t-red-600">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start mb-2">
                <StatusBadge className="bg-blue-500/10 text-blue-500 border-blue-500/20">EM ANDAMENTO</StatusBadge>
                <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest">{activeOs.id}</div>
              </div>
              <CardTitle className="text-white">Fluxo de Instalação</CardTitle>
              <CardDescription className="text-zinc-400">Siga os passos abaixo para concluir a instalação.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Stepper Vertical */}
              <div className="space-y-8 relative">
                <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-zinc-800 z-0"></div>
                
                {[
                  { title: 'Iniciar Instalação', icon: Play, desc: 'Verificando chegada no local.' },
                  { title: 'Anexar Fotos', icon: Camera, desc: 'Tire fotos do veículo e local da instalação.' },
                  { title: 'Realizar Teste', icon: Smartphone, desc: 'Verifique se o dispositivo está enviando sinal.' },
                  { title: 'Finalizar OS', icon: CheckCircle2, desc: 'Confirme a conclusão do serviço.' }
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 relative z-10 group">
                    <div className={cn(
                      "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                      currentStep === i ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/30 scale-110" : 
                      currentStep > i ? "bg-green-600 border-green-600 text-white" : 
                      "bg-zinc-950 border-zinc-800 text-zinc-600"
                    )}>
                      {currentStep > i ? <Check className="w-4 h-4" /> : <step.icon className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 opacity-100 transition-opacity">
                      <h4 className={cn("font-bold text-sm", currentStep === i ? "text-white" : "text-zinc-500")}>{step.title}</h4>
                      <p className="text-xs text-zinc-500">{step.desc}</p>
                      
                      {currentStep === i && (
                        <div className="mt-4 animate-in slide-in-from-top-2 duration-300">
                          {i === 1 && (
                            <div className="grid grid-cols-2 gap-2 mb-4">
                              <div className="aspect-square bg-zinc-800 rounded-lg flex flex-col items-center justify-center text-zinc-600 border border-dashed border-zinc-700 hover:border-zinc-500 cursor-pointer transition-colors">
                                <Camera className="w-6 h-6 mb-1" />
                                <span className="text-[10px]">VEÍCULO</span>
                              </div>
                              <div className="aspect-square bg-zinc-800 rounded-lg flex flex-col items-center justify-center text-zinc-600 border border-dashed border-zinc-700 hover:border-zinc-500 cursor-pointer transition-colors">
                                <Camera className="w-6 h-6 mb-1" />
                                <span className="text-[10px]">EQUIPAMENTO</span>
                              </div>
                            </div>
                          )}
                          {i === 2 && (
                            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 mb-4 flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                              <span className="text-xs text-zinc-400 font-mono italic">AGUARDANDO SINAL...</span>
                            </div>
                          )}
                          
                          {i < 3 ? (
                            <Button onClick={handleNextStep} className="w-full bg-red-600 hover:bg-red-700 text-white h-10 text-xs font-bold uppercase tracking-widest shadow-lg shadow-red-600/20">
                              Confirmar & Próximo
                            </Button>
                          ) : (
                            <Button onClick={finishInstallation} className="w-full bg-green-600 hover:bg-green-700 text-white h-10 text-xs font-bold uppercase tracking-widest shadow-lg shadow-green-600/20">
                              Finalizar Serviço
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </GestrackLayout>
    );
  }

  return (
    <GestrackLayout>
      <div className="max-w-md mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center pt-4">
          <div className="bg-red-600/10 text-red-500 px-4 py-1.5 rounded-full text-xs font-extrabold inline-block mb-4 border border-red-500/20 uppercase tracking-[0.2em] shadow-lg shadow-red-600/5">Campo • Field App</div>
          <h1 className="text-4xl font-black tracking-tight text-white mb-2 uppercase italic">Gestrack <span className="text-red-600">TEC</span></h1>
          <p className="text-zinc-400 text-sm">Olá, <span className="font-bold text-zinc-100">Ricardo Silva</span>. Suas ordens do dia:</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {myOrders.length === 0 ? (
            <div className="text-center py-20 bg-zinc-900/30 border border-zinc-800 rounded-3xl border-dashed">
              <AlertCircle className="w-10 h-10 text-zinc-700 mx-auto mb-4" />
              <p className="text-zinc-600 font-medium">Nenhuma ordem atribuída no momento.</p>
            </div>
          ) : (
            myOrders.map(order => {
              const vehicle = store.vehicles.find(v => v.id === order.vehicleId);
              return (
                <Card 
                  key={order.id} 
                  className={cn(
                    "bg-zinc-900 border-zinc-800 hover:border-red-500/50 transition-all duration-300 p-1 group overflow-hidden",
                    order.status === 'finished' && "opacity-60 bg-zinc-950 shadow-none border-zinc-900"
                  )}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors group-hover:scale-110 duration-500",
                      order.status === 'finished' ? "bg-zinc-800" : "bg-red-600 shadow-lg shadow-red-600/30"
                    )}>
                      {order.status === 'finished' ? <Check className="w-6 h-6 text-zinc-500" /> : <Wrench className="w-6 h-6 text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{order.id}</span>
                        {order.status === 'in_progress' && (
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                            <span className="text-[10px] text-blue-500 font-bold uppercase tracking-tight">Em andamento</span>
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-black text-white truncate uppercase m-0 leading-tight tracking-tight">{vehicle?.plate}</h3>
                      <p className="text-xs text-zinc-500 truncate">{vehicle?.brand} {vehicle?.model}</p>
                    </div>
                    {order.status !== 'finished' ? (
                      <Button 
                        onClick={() => startInstallation(order)} 
                        size="icon" 
                        variant="ghost" 
                        className="text-red-500 hover:bg-red-500/10 hover:text-red-400 group-hover:translate-x-1 transition-transform"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </Button>
                    ) : (
                      <div className="px-2 py-1 bg-zinc-800 text-zinc-500 text-[10px] font-bold rounded uppercase tracking-widest">OK</div>
                    )}
                  </CardContent>
                  <div className={cn(
                    "h-1 transition-all duration-700",
                    order.status === 'in_progress' ? "w-1/2 bg-blue-500" : 
                    order.status === 'finished' ? "w-full bg-green-600" : "w-0"
                  )} />
                </Card>
              );
            })
          )}
        </div>

        {/* Support Section */}
        <div className="mt-10 pt-6 border-t border-zinc-900">
          <p className="text-center text-[10px] text-zinc-600 font-bold uppercase tracking-widest mb-4 font-black italic">Central de Apoio</p>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-24 border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white flex flex-col gap-2 rounded-2xl hover:border-red-500/30 group transition-all duration-500">
              <Smartphone className="w-6 h-6 text-red-500/50 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] uppercase font-bold tracking-wider">Suporte</span>
            </Button>
            <Button variant="outline" className="h-24 border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white flex flex-col gap-2 rounded-2xl hover:border-red-500/30 group transition-all duration-500">
              <Camera className="w-6 h-6 text-red-500/50 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] uppercase font-bold tracking-wider">Documentação</span>
            </Button>
          </div>
        </div>
      </div>
    </GestrackLayout>
  );
};

export default TecPage;
