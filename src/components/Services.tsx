import { Card } from "@/components/ui/card";
import { Crown, Scissors, Coffee } from "lucide-react";

const services = [
  {
    title: "Premium Priority",
    icon: Crown,
    priority: "Highest",
    description: "Bridal styling, special events, photo shoots",
    features: ["Immediate scheduling", "Extended time slots", "Dedicated stylist"],
    color: "from-primary to-primary/80",
  },
  {
    title: "Standard Service",
    icon: Scissors,
    priority: "Medium",
    description: "Regular cuts, coloring, styling",
    features: ["Same-day availability", "Flexible scheduling", "Professional care"],
    color: "from-accent to-accent/80",
  },
  {
    title: "Walk-in Welcome",
    icon: Coffee,
    priority: "Standard",
    description: "Quick trims, consultations, touch-ups",
    features: ["No appointment needed", "Quick service", "Budget-friendly"],
    color: "from-muted-foreground to-muted-foreground/80",
  },
];

const Services = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Service Priority Tiers</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your service level and we'll schedule you accordingly
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="p-8 hover:shadow-elegant transition-all duration-300 border-2 hover:border-primary/20"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6`}>
                  <Icon className="h-8 w-8 text-primary-foreground" />
                </div>
                
                <div className="mb-4">
                  <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                  <div className="text-sm font-semibold text-primary mb-3">
                    Priority: {service.priority}
                  </div>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>

                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
