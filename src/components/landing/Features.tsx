import { BarChart3, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Fast Setup",
    desc: "Get your business running in minutes with ready-made templates.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    desc: "Enterprise-grade security for all your business data.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    desc: "Track performance with intuitive dashboards and reports.",
  },
];

const Features = () => (
  <section id="features" className="py-20 px-6 bg-card">
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-12">Why choose us</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((f) => (
          <div key={f.title} className="space-y-3 text-center">
            <div className="mx-auto w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <f.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">{f.title}</h3>
            <p className="text-muted-foreground text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
