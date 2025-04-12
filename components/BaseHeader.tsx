// components/BaseHeader.tsx
import Link from "next/link";

export function BaseHeader() {
  return (
    <header className="bg-white shadow fixed w-full z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-700">
          EduManager
        </Link>
        {/* Navigation */}
        <ul className="flex space-x-6 items-center">
          <li>
            <Link
              href="/get-started"
              className="text-gray-800 font-medium hover:text-blue-700 transition-colors"
            >
              Get Started
            </Link>
          </li>
          <li>
            <Link
              href="/features"
              className="text-gray-800 font-medium hover:text-blue-700 transition-colors"
            >
              Features
            </Link>
          </li>
          <li>
            <Link
              href="/pricing"
              className="text-gray-800 font-medium hover:text-blue-700 transition-colors"
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              href="/contacts"
              className="text-gray-800 font-medium hover:text-blue-700 transition-colors"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/book-demo"
              className="text-gray-800 font-medium hover:text-blue-700 transition-colors"
            >
              Book a Demo
            </Link>
          </li>
          <li>
            <Link
              href="/register"
              className="btn btn-outline px-4 py-2 border-2 border-blue-700 text-blue-700 rounded hover:bg-blue-700 hover:text-white transition-colors"
            >
              Sign Up
            </Link>
          </li>
          <li>
            <Link
              href="/login"
              className="btn px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
