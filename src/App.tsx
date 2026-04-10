import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "./hooks/use-auth";
import { useGestrackStore, GestrackProvider } from "./hooks/useGestrackStore";
import Layout from "./components/premium/Layout";
import Home from "./pages/premium/Home";
import Empresa from "./pages/premium/Empresa";
import Equipamentos from "./pages/premium/Equipamentos";
import Servicos from "./pages/premium/Servicos";
import Galeria from "./pages/premium/Galeria";
import Clientes from "./pages/premium/Clientes";
import Contato from "./pages/premium/Contato";
import TrabalheConosco from "./pages/premium/TrabalheConosco";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import SellPage from "./pages/gestrack/Sell";
import ErpPage from "./pages/gestrack/Erp";
import TecPage from "./pages/gestrack/Tec";
import AdminPage from "./pages/gestrack/Admin";
import GestrackLoginPage from "./pages/gestrack/Login";
import GestrackIndex from "./pages/gestrack/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session, loading } = useAuth();
  
  if (loading) return <div className="h-screen w-screen flex flex-col items-center justify-center bg-zinc-950 text-white"><div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div><p className="mt-4 text-zinc-400">Carregando permissões...</p></div>;
  if (!session) return <Navigate to="/login" replace />;
  
  return <>{children}</>;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { session, userData, loading } = useAuth();
  
  if (loading) return <div className="h-screen w-screen flex flex-col items-center justify-center bg-zinc-950 text-white"><div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div><p className="mt-4 text-zinc-400">Verificando acesso admin...</p></div>;
  if (!session) return <Navigate to="/login" replace />;
  if (userData?.role !== "admin") return <Navigate to="/dashboard" replace />;
  
  return <>{children}</>;
};

const GestrackProtectedRoute = ({ children, role }: { children: React.ReactNode, role?: 'admin' | 'tecnico' | 'funcionario' }) => {
  const { user } = useGestrackStore();
  
  if (!user) return <Navigate to="/gestrack/login" replace />;
  
  if (role) {
    if (user.role === 'admin') return <>{children}</>;
    if (user.role !== role) {
      if (user.role === 'tecnico') return <Navigate to="/gestrack/tec" replace />;
      return <Navigate to="/gestrack" replace />;
    }
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <GestrackProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/empresa" element={<Empresa />} />
                <Route path="/equipamentos" element={<Equipamentos />} />
                <Route path="/servicos" element={<Servicos />} />
                <Route path="/galeria" element={<Galeria />} />
                <Route path="/clientes" element={<Clientes />} />
                <Route path="/contato" element={<Contato />} />
                <Route path="/trabalhe-conosco" element={<TrabalheConosco />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <AdminRoute>
                    <Admin />
                  </AdminRoute>
                } 
              />
              <Route path="/gestrack" element={<GestrackIndex />} />
              <Route path="/gestrack/login" element={<GestrackLoginPage />} />
              <Route 
                path="/gestrack/sell" 
                element={
                  <GestrackProtectedRoute>
                    <SellPage />
                  </GestrackProtectedRoute>
                } 
              />
              <Route 
                path="/gestrack/erp" 
                element={
                  <GestrackProtectedRoute role="funcionario">
                    <ErpPage />
                  </GestrackProtectedRoute>
                } 
              />
              <Route 
                path="/gestrack/tec" 
                element={
                  <GestrackProtectedRoute role="tecnico">
                    <TecPage />
                  </GestrackProtectedRoute>
                } 
              />
              <Route 
                path="/gestrack/admin" 
                element={
                  <GestrackProtectedRoute role="admin">
                    <AdminPage />
                  </GestrackProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </GestrackProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
