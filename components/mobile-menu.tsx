'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="h-8 w-8" aria-label="Toggle menu">
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>
      {isOpen && (
        <div className="absolute top-14 left-0 right-0 bg-background border-b border-border">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-foreground hover:text-primary" 
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/get-started" 
                className="text-foreground hover:text-primary" 
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
              <Link 
                href="#features" 
                className="text-foreground hover:text-primary" 
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}
