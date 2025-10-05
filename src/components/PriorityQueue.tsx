import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Scissors, Coffee } from "lucide-react";

const appointments = [
  { id: 1, name: "Sarah M.", service: "Bridal Styling", priority: "HIGH", icon: Crown, time: "10:00 AM" },
  { id: 2, name: "Emma L.", service: "Special Event", priority: "HIGH", icon: Crown, time: "11:30 AM" },
  { id: 3, name: "John D.", service: "Regular Cut", priority: "MEDIUM", icon: Scissors, time: "2:00 PM" },
  { id: 4, name: "Mike R.", service: "Trim", priority: "MEDIUM", icon: Scissors, time: "3:00 PM" },
  { id: 5, name: "Alex P.", service: "Consultation", priority: "LOW", icon: Coffee, time: "4:30 PM" },
];

const priorityStyles = {
  HIGH: "bg-primary/10 text-primary border-primary/20",
  MEDIUM: "bg-accent/10 text-accent border-accent/20",
  LOW: "bg-muted text-muted-foreground border-border",
};

const PriorityQueue = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Live Scheduling Queue</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our priority-based system ensures special occasions and important events receive immediate attention
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {appointments.map((apt, index) => {
            const Icon = apt.icon;
            return (
              <Card 
                key={apt.id} 
                className="p-6 transition-all hover:shadow-soft border-2"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeIn 0.5s ease-out forwards"
                }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-lg">{apt.name}</h3>
                        <Badge className={priorityStyles[apt.priority as keyof typeof priorityStyles]}>
                          {apt.priority}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{apt.service}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">#{index + 1}</div>
                    <div className="text-sm text-muted-foreground">{apt.time}</div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default PriorityQueue;
