import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />

      <main className="flex-grow">
        <section className="bg-muted">
          <div className="container mx-auto px-4 py-12 md:py-20 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Effortless School Management at Your Fingertips!</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Streamline your administrative tasks with our powerful school database app.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/get-started">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features">
          <div className="container mx-auto px-4 py-12 md:py-20">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Features Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-lg bg-card">
                <h3 className="text-xl font-semibold mb-2">Centralized Database</h3>
                <p className="text-muted-foreground">Manage all your school data in one secure location.</p>
              </div>
              <div className="text-center p-6 rounded-lg bg-card">
                <h3 className="text-xl font-semibold mb-2">School-Specific Options</h3>
                <p className="text-muted-foreground">Customize the system to fit your school's unique needs.</p>
              </div>
              <div className="text-center p-6 rounded-lg bg-card">
                <h3 className="text-xl font-semibold mb-2">Hybrid Solutions</h3>
                <p className="text-muted-foreground">
                  Combine centralized and school-specific features for optimal flexibility.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-muted">
          <div className="container mx-auto px-4 py-12 md:py-20 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Trusted by Schools Nationwide</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-card p-6 rounded-lg shadow-sm">Trust Badge 1</div>
              <div className="bg-card p-6 rounded-lg shadow-sm">Trust Badge 2</div>
              <div className="bg-card p-6 rounded-lg shadow-sm">Trust Badge 3</div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-muted border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
              <p>Email: info@schooldb.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-primary">Facebook</a>
                <a href="#" className="hover:text-primary">Twitter</a>
                <a href="#" className="hover:text-primary">LinkedIn</a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Legal</h3>
              <Link href="/privacy-policy" className="hover:text-primary">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
