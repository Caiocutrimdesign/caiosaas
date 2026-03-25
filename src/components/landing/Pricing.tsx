import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Restaurants & Snack Bars",
    price: "$49",
    features: ["Menu management", "Order tracking", "Table reservations", "Basic analytics"],
  },
  {
    name: "Corporate",
    price: "$99",
    popular: true,
    features: ["Team management", "Project tracking", "Advanced reports", "Priority support"],
  },
  {
    name: "Professionals",
    price: "$29",
    features: ["Client scheduling", "Invoice management", "Calendar sync", "Email reminders"],
  },
];

const Pricing = () => (
  <section id="pricing" className="py-20 px-6">
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Pricing Plans</h2>
      <p className="text-center text-muted-foreground mb-12">
        Choose the plan that fits your business
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative ${plan.popular ? "border-primary ring-1 ring-primary" : ""}`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                Popular
              </span>
            )}
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-lg">{plan.name}</CardTitle>
              <p className="text-3xl font-bold mt-2">
                {plan.price}
                <span className="text-sm font-normal text-muted-foreground">/mo</span>
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full" variant={plan.popular ? "default" : "outline"}>
                <Link to="/register">Get Started</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default Pricing;
