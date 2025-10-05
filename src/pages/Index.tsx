import Hero from "@/components/Hero";
import Services from "@/components/Services";
import PriorityQueue from "@/components/PriorityQueue";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <PriorityQueue />
      <Contact />
    </div>
  );
};

export default Index;
