import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileMenu } from "@/components/mobile-menu"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-primary">
          SchoolDB
        </Link>
        <div className="hidden md:flex space-x-4 items-center">
          <Link href="/" className="text-foreground hover:text-primary">
            Home
          </Link>
          <Link href="/get-started" className="text-foreground hover:text-primary">
            Get Started
          </Link>
          <Link href="#features" className="text-foreground hover:text-primary">
            Features
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/login" className="text-foreground hover:text-primary">
            <Button variant="outline" size="sm">Login</Button>
          </Link>
          <ThemeToggle />
          <MobileMenu />
        </div>
      </nav>
    </header>
  )
}
