import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 border border-t border-t-zinc-200">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold mb-4 text-zinc-900">404</h1>
        <p className="text-xl text-gray-500 mb-8 w-5/6 mx-auto">Oops! The page you were looking for doesn't exist.</p>
        <Button asChild>
          <Link to="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
}
