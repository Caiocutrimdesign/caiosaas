import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard, CreditCard, Stethoscope, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  const { user, userData, subscription, signOut } = useAuth();
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    async function fetchPayments() {
      if (!subscription) return;
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('subscription_id', subscription.id)
        .order('due_date', { ascending: false });
        
      if (!error && data) setPayments(data);
    }
    fetchPayments();
  }, [subscription]);

  // SUSPENSION LOCK LOGIC
  if (subscription?.status === "suspended") {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-red-50 border border-red-200 rounded-2xl p-8 shadow-xl">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Acesso Suspenso</h1>
          <p className="text-red-700 mb-8">
            Seus serviços e agendamentos estão temporariamente suspensos devido a pendências financeiras. Por favor, regularize sua situação.
          </p>
          <Button onClick={signOut} variant="outline" className="w-full border-red-300 text-red-600 hover:bg-red-100">
            Sair da Conta
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <Link to="/" className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-teal-600" />
            Clínica Odonto
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 text-slate-900 bg-teal-50 rounded-lg">
            <LayoutDashboard className="w-5 h-5" />
            Meu Painel
          </Link>
          {userData?.role === "admin" && (
            <Link to="/admin" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
              <CreditCard className="w-5 h-5" />
              Painel Admin
            </Link>
          )}
        </nav>
        
        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-slate-900 truncate">{userData?.name || 'Paciente'}</p>
              <p className="text-xs text-slate-500 truncate">{user?.email}</p>
            </div>
          </div>
          <Button variant="outline" className="w-full justify-start gap-2 border-slate-300 hover:bg-slate-100" onClick={signOut}>
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-slate-200 md:hidden">
            <Link to="/" className="text-xl font-bold flex items-center gap-2 text-slate-900">
              <Stethoscope className="w-6 h-6 text-teal-600" />
              Odonto App
            </Link>
            <Button variant="ghost" size="icon" onClick={signOut}>
              <LogOut className="w-5 h-5 text-slate-600" />
            </Button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Área do Paciente</h1>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">Ativo</span>
              </div>
              <p className="text-slate-500 mt-2">Acompanhe seus tratamentos e faturas ativas em nossa clínica.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Subscription Details */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-4 text-slate-900">Plano Fixo / Tratamento Atual</h3>
                {subscription ? (
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-sm text-slate-500">Nome</span>
                      <span className="font-semibold text-slate-900 capitalize">{subscription.plan_name}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-sm text-slate-500">Valor Total Estimado</span>
                      <span className="font-semibold text-slate-900">R$ {subscription.total_value}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-sm text-slate-500">Parcelamento</span>
                      <span className="font-semibold text-slate-900">{subscription.number_of_installments}x de R$ {subscription.installment_value}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">Próximo Pagamento</span>
                      <span className="font-semibold text-slate-900">{subscription.next_due_date || 'N/A'}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-500">Você não tem nenhum plano ativo.</p>
                )}
              </div>

               {/* Recent Payments */}
               <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col">
                <h3 className="text-lg font-bold mb-4 text-slate-900">Minhas Faturas</h3>
                {payments.length > 0 ? (
                  <div className="space-y-3 flex-1 overflow-y-auto">
                    {payments.map(payment => (
                      <div key={payment.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                        <div>
                          <p className="text-sm font-bold text-slate-900">Valor cobrado: R$ {payment.amount}</p>
                          <p className="text-xs text-slate-500">Vencimento: {payment.due_date}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                          payment.status === 'paid' ? 'bg-emerald-100 text-emerald-700' :
                          payment.status === 'overdue' ? 'bg-red-100 text-red-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {payment.status === 'paid' ? "Pago" : payment.status === 'overdue' ? "Atrasado" : "Pendente"}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">Sem histórico de faturas.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
