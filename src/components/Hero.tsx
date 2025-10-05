import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import heroImage from "@/assets/salon-hero.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/70" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Priority Scheduling
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
            Because Your Time Matters
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            Our intelligent booking system ensures special occasions get the attention they deserve. 
            From bridal styling to everyday cuts, we schedule based on what matters most.
          </p>
          <Button size="lg" className="gap-2 shadow-elegant hover:shadow-soft transition-all">
            <Calendar className="h-5 w-5" />
            Book Your Appointment
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
