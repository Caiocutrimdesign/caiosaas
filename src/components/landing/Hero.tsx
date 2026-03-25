import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => (
  <section className="py-24 px-6 text-center">
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
        Business management,{" "}
        <span className="text-primary">simplified</span>
      </h1>
      <p className="text-lg text-muted-foreground max-w-xl mx-auto">
        All-in-one platform tailored for restaurants, corporations, and
        professionals. Pick a plan that fits your business.
      </p>
      <div className="flex gap-3 justify-center pt-4">
        <Button asChild size="lg">
          <Link to="/register">Get Started</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href="#pricing">View Plans</a>
        </Button>
      </div>
    </div>
  </section>
);

export default Hero;
