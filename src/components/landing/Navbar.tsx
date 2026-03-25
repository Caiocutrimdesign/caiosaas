import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b">
    <div className="max-w-5xl mx-auto flex items-center justify-between h-14 px-6">
      <Link to="/" className="font-bold text-lg">
        BizPlan<span className="text-primary">.</span>
      </Link>
      <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
        <a href="#features" className="hover:text-foreground transition-colors">Features</a>
        <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
        <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
      </div>
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost" size="sm">
          <Link to="/login">Log in</Link>
        </Button>
        <Button asChild size="sm">
          <Link to="/register">Sign up</Link>
        </Button>
      </div>
    </div>
  </nav>
);

export default Navbar;
