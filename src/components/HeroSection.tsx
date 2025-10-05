const HeroSection = () => {
  return (
    <section className="relative py-16 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 via-accent/20 to-primary/20" />
      
      <div className="relative z-10 container mx-auto text-center max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Salon Scheduler 💅
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
          Where CPUs double as stylists ✨
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Ever wondered how your computer decides which task to run next? 💻 Think of it like a busy salon—the CPU is the stylist, 
          and each program is a customer waiting for their turn. Learn how <span className="font-semibold text-primary">Priority Scheduling</span> and{" "}
          <span className="font-semibold text-accent">Round Robin</span> keep everything running smoothly!
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
