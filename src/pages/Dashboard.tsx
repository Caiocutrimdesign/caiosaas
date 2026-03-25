import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { LayoutDashboard, User, CreditCard, LogOut } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(stored));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-56 border-r bg-card p-4 flex flex-col">
        <Link to="/" className="font-bold text-lg mb-8">
          BizPlan<span className="text-primary">.</span>
        </Link>
        <nav className="space-y-1 flex-1">
          {[
            { icon: LayoutDashboard, label: "Dashboard" },
            { icon: User, label: "Profile" },
            { icon: CreditCard, label: "Billing" },
          ].map((item) => (
            <button
              key={item.label}
              className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>
        <Button variant="ghost" size="sm" onClick={handleLogout} className="justify-start gap-2">
          <LogOut className="h-4 w-4" />
          Log out
        </Button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Account</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{user.email}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Current Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">No active plan</p>
              <Button size="sm" variant="outline" className="mt-2" asChild>
                <Link to="/#pricing">View Plans</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
