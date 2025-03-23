import Link from "next/link";

export function Header() {
  return (
    <div>
      {/* Header */}
      <header className="bg-white shadow fixed w-full z-10">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
          <Link href="/get-started" className="logo text-2xl font-bold text-blue-700">
  EduManager
</Link>

            <ul className="nav-links flex space-x-6">
              <li>
                <Link href="#" className="text-gray-800 font-medium hover:text-blue-700">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-800 font-medium hover:text-blue-700">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-800 font-medium hover:text-blue-700">
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="btn btn-outline px-4 py-2 border-2 border-blue-700 text-blue-700 rounded hover:bg-blue-700 hover:text-white"
                >
                  Sign Up
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="btn px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
                >
                  Login
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}
