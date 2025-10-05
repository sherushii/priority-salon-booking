import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Visit Our Salon</h2>
            <p className="text-lg text-muted-foreground">
              Experience luxury hair care with intelligent scheduling
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 hover:shadow-soft transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Location</h3>
                  <p className="text-muted-foreground">
                    123 Elegance Avenue<br />
                    Beauty District, BD 12345
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-soft transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Phone</h3>
                  <p className="text-muted-foreground">
                    (555) 123-4567<br />
                    Available during business hours
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-soft transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-muted-foreground">
                    info@prioritysalon.com<br />
                    We respond within 24 hours
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-soft transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Hours</h3>
                  <p className="text-muted-foreground">
                    Mon-Fri: 9:00 AM - 7:00 PM<br />
                    Sat-Sun: 10:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="gap-2">
              Schedule Your Priority Appointment
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
