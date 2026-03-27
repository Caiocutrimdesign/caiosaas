import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGestrackStore } from '@/hooks/useGestrackStore';
import { 
  ShieldCheck, 
  Mail, 
  Lock, 
  ArrowRight, 
  AlertCircle,
  Truck,
  Shield,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GestrackButton } from '@/components/gestrack/ui/GestrackButton';
import { GestrackBadge } from '@/components/gestrack/ui/GestrackBadge';
import { GestrackCard, GestrackCardContent } from '@/components/gestrack/ui/GestrackCard';
import { toast } from 'sonner';

const GestrackLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { loginUser, user } = useGestrackStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === 'tecnico') navigate('/gestrack/tec');
      else if (user.role === 'admin') navigate('/gestrack/admin');
      else if (user.role === 'funcionario') navigate('/gestrack/erp');
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Preencha todos os campos para autenticar.');
      return;
    }

    setIsLoading(true);
    // Simulate real auth latency
    await new Promise(resolve => setTimeout(resolve, 800));

    const success = loginUser(email, password);

    if (success) {
      toast.success('Autenticação realizada com sucesso.');
    } else {
      toast.error('Email ou senha incorretos.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Brand & Social Proof */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:flex flex-col space-y-8"
        >
          <div>
            <GestrackBadge color="red" className="mb-6">Empresa de Segurança & Rastreamento</GestrackBadge>
            <h1 className="text-7xl font-black text-white italic tracking-tighter uppercase leading-[0.9]">
              Gestrack <br />
              <span className="text-red-600">Enterprise</span>
            </h1>
            <p className="text-zinc-500 font-bold text-lg mt-6 max-w-md leading-relaxed">
              Gestão inteligente de frotas e automação de serviços em campo para operações críticas.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             {[
               { icon: Shield, label: 'Segurança Militar', color: 'text-red-500' },
               { icon: Zap, label: 'Latência Zero', color: 'text-blue-500' },
               { icon: Truck, label: 'Frota Global', color: 'text-zinc-400' },
               { icon: CheckCircle2, label: 'SLA 99.9%', color: 'text-green-500' }
             ].map(feat => (
               <div key={feat.label} className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex flex-col gap-3">
                  <feat.icon className={`w-6 h-6 ${feat.color}`} />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">{feat.label}</span>
               </div>
             ))}
          </div>
        </motion.div>

        {/* Right Side: Login Form */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
        >
          <GestrackCard accent="red" className="border-zinc-900 bg-zinc-950/50 shadow-2xl">
            <GestrackCardContent className="p-10">
              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-red-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-xl shadow-red-600/20">
                   <ShieldCheck className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Portal de Acesso</h2>
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-2">Identifique-se para prosseguir</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-600 font-black uppercase tracking-widest ml-2">Email Institucional</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700" />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@rastremix.com.br"
                      className="w-full h-14 bg-zinc-900/50 border border-zinc-900 rounded-xl pl-12 pr-4 text-white focus:border-red-600 outline-none transition-all font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-600 font-black uppercase tracking-widest ml-2">Senha de Acesso</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700" />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-14 bg-zinc-900/50 border border-zinc-900 rounded-xl pl-12 pr-4 text-white focus:border-red-600 outline-none transition-all font-bold"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <GestrackButton 
                    type="submit" 
                    isLoading={isLoading}
                    className="w-full h-14 bg-red-600 text-white font-black italic uppercase tracking-widest group"
                  >
                    Autenticar <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </GestrackButton>
                </div>
              </form>

              <div className="mt-8 pt-8 border-t border-zinc-900">
                 <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest text-center mb-4 italic">Usuários de teste disponíveis:</p>
                 <div className="space-y-3">
                    {[
                      { email: 'teste1@gmail.com', label: 'Admin (Master)' },
                      { email: 'teste2@gmail.com', label: 'Funcionário (ERP)' },
                      { email: 'teste3@gmail.com', label: 'Técnico (TEC App)' }
                    ].map(u => (
                      <div key={u.email} onClick={() => { setEmail(u.email); setPassword('123456'); }} className="flex justify-between items-center p-3 bg-zinc-900/30 rounded-xl border border-zinc-900 hover:border-red-600/30 cursor-pointer transition-all group">
                         <span className="text-[10px] text-zinc-400 group-hover:text-white font-bold">{u.email}</span>
                         <span className="text-[9px] text-zinc-600 uppercase font-black">{u.label}</span>
                      </div>
                    ))}
                    <p className="text-[9px] text-zinc-700 font-bold uppercase tracking-widest text-center mt-2">Senha para todos: 123456</p>
                 </div>
              </div>
            </GestrackCardContent>
          </GestrackCard>
        </motion.div>
      </div>
    </div>
  );
};

export default GestrackLoginPage;
