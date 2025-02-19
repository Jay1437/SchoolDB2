import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Header } from "@/components/header"

export default function GetStarted() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-muted py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Set Up Your School in Minutes!</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Choose your preferred database model and start managing student records effortlessly.
            </p>
            <div className="space-x-4">
              <Button asChild size="lg">
                <Link href="/register">Register Your School</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: 1,
                  title: "Register Your School",
                  description: "Provide school details (name, location, type).",
                },
                { step: 2, title: "Choose Database Model", description: "Centralized, School-Specific, or Hybrid." },
                { step: 3, title: "Set Up Users & Roles", description: "Add admins, teachers, and students." },
                { step: 4, title: "Start Managing!", description: "Access attendance, timetables, fees, and reports." },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Benefits Section */}
        <section className="bg-muted py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Flexible Database Options", description: "Choose the model that fits your school." },
                { title: "Secure & Reliable", description: "Encrypted data storage with regular backups." },
                { title: "Easy-to-Use Interface", description: "Designed for schools of all sizes." },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="max-w-2xl mx-auto">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I register my school?</AccordionTrigger>
                <AccordionContent>Click "Register Your School" and follow the steps.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Can I change the database model later?</AccordionTrigger>
                <AccordionContent>Yes, admins can modify settings.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is there a free trial?</AccordionTrigger>
                <AccordionContent>Yes, we offer a 30-day free trial.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted text-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
              <Button asChild variant="link">
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
            <div className="mb-4 md:mb-0">
              <p>Email: support@schoolapp.com</p>
            </div>
            <div>
              <p>Address: Your Company Location</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

