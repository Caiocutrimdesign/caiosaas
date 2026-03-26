import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Users, LayoutDashboard, HeartPulse } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function Admin() {
  const { signOut } = useAuth();
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClients = async () => {
    setLoading(true);
    const { data: usersData, error: usersError } = await supabase
      .from("users")
      .select("*, subscriptions(*)");

    if (!usersError && usersData) {
      setClients(usersData.filter(u => u.role !== 'admin'));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const toggleSuspension = async (subscriptionId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'suspended' ? 'active' : 'suspended';
    const { error } = await supabase
      .from('subscriptions')
      .update({ status: newStatus })
      .eq('id', subscriptionId);

    if (error) {
      toast.error("Failed to update status");
    } else {
      toast.success(`Paciente alterado para ${newStatus}`);
      fetchClients();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navigation */}
      <nav className="h-16 flex items-center justify-between px-6 bg-white border-b border-slate-200">
        <Link to="/" className="text-xl font-bold text-teal-600 flex items-center gap-2">
          <HeartPulse className="w-6 h-6" />
          Clínica Administração
        </Link>
        <div className="flex gap-4">
          <Button variant="ghost" asChild className="text-slate-600 hover:text-slate-900">
            <Link to="/dashboard"><LayoutDashboard className="w-4 h-4 mr-2" />Voltar ao Painel</Link>
          </Button>
          <Button variant="outline" onClick={signOut} className="border-slate-300 hover:bg-slate-100">
            Sair
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <Users className="text-teal-600 w-8 h-8" />
            Gestão de Pacientes
          </h1>
          <p className="text-slate-500 mt-2">Gerencie tratamentos, bloqueios financeiros e andamento do plano de cada paciente.</p>
        </div>

        {loading ? (
          <div className="text-slate-500 text-center py-20 animate-pulse">Carregando painel clínico...</div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200 font-bold">
                  <tr>
                    <th className="px-6 py-4">Paciente</th>
                    <th className="px-6 py-4">Tratamento</th>
                    <th className="px-6 py-4">Parcelas</th>
                    <th className="px-6 py-4">Vencimento</th>
                    <th className="px-6 py-4">Situação</th>
                    <th className="px-6 py-4 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {clients.length > 0 ? clients.map((client) => {
                    const sub = client.subscriptions?.[0];
                    return (
                      <tr key={client.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-bold text-slate-900">{client.name || 'Sem nome'}</p>
                          <p className="text-xs text-slate-500">{client.email}</p>
                        </td>
                        <td className="px-6 py-4 font-semibold text-slate-700">
                          {sub ? sub.plan_name : 'Nenhum'}
                        </td>
                        <td className="px-6 py-4">
                          {sub ? `${sub.number_of_installments}x R$${sub.installment_value}` : '-'}
                        </td>
                        <td className="px-6 py-4">
                          {sub ? (sub.next_due_date || 'N/A') : '-'}
                        </td>
                        <td className="px-6 py-4">
                          {sub ? (
                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                              sub.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {sub.status === 'active' ? "Ativo" : "Bloqueado"}
                            </span>
                          ) : (
                            <span className="text-slate-400 uppercase text-xs font-semibold">Sem Plano</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {sub ? (
                            <Button 
                              size="sm" 
                              onClick={() => toggleSuspension(sub.id, sub.status)}
                              className={`${sub.status === 'active' ? 'bg-white border-red-200 text-red-600 hover:bg-red-50' : 'bg-white border-emerald-200 text-emerald-600 hover:bg-emerald-50'} border`}
                            >
                              {sub.status === 'active' ? 'Suspender' : 'Liberar'}
                            </Button>
                          ) : (
                            <Button size="sm" variant="ghost" disabled>Indisponível</Button>
                          )}
                        </td>
                      </tr>
                    );
                  }) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-slate-500">Nenhum paciente cadastrado.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
