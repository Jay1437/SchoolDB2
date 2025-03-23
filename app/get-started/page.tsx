"use client";

import Link from "next/link";
import { Header } from "@/components/header";
import { useRouter } from "next/navigation"; // or next/router for older versions

export default function GetStarted() {
  const router = useRouter();
  return (
    <div>
<Header />
      {/* Hero Section */}
      <section className="hero pt-24 pb-20 bg-gradient-to-br from-gray-100 to-blue-100">
        <div className="container mx-auto px-4">
          <div className="hero-content flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="hero-text flex-1">
              <h1 className="text-4xl font-bold text-blue-700 mb-4">
                Modern School Management Platform
              </h1>
              <p className="subtitle text-lg text-gray-600 mb-8">
                Digitize your school's administrative tasks with our secure,
                scalable, and easy-to-use platform. Manage students, teachers,
                grades, attendance, and more from anywhere.
              </p>
              <div className="school-selector bg-white p-6 rounded shadow"   onSubmit={(e) => {
    e.preventDefault();
    router.push("/dashboard");
  }}>
                <h3 className="text-xl font-medium mb-4">
                  Find your school to continue:
                </h3>
                <form className="selector-form flex flex-col sm:flex-row gap-4">
                  <select className="flex-1 p-2 border border-gray-300 rounded">
                    <option value="">Select your school</option>
                    <option value="1">Springfield Elementary School</option>
                    <option value="2">Westlake High School</option>
                    <option value="3">Riverdale Academy</option>
                    <option value="4">Register a new school</option>
                  </select>
                  <button
                    type="submit"
                    className="btn px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
                  >
                    Continue
                  </button>
                </form>
              </div>
            </div>
            <div className="hero-image flex-1 text-center">
              <img
                src="/api/placeholder/500/300"
                alt="Dashboard Preview"
                className="mx-auto rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="section-title text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-700 mb-4">
              Why Choose EduManager
            </h2>
            <p className="text-lg text-gray-600">
              Simplify your school's administrative processes with our
              comprehensive features
            </p>
          </div>
          <div className="feature-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="feature-card bg-white p-6 rounded shadow hover:shadow-lg transition">
              <div className="feature-icon text-4xl mb-4">📊</div>
              <h3 className="feature-title text-xl font-semibold mb-2">
                Digital Record-Keeping
              </h3>
              <p className="text-gray-600">
                Store all your student and staff records securely in one place.
                Access them anytime, anywhere.
              </p>
            </div>
            <div className="feature-card bg-white p-6 rounded shadow hover:shadow-lg transition">
              <div className="feature-icon text-4xl mb-4">🔒</div>
              <h3 className="feature-title text-xl font-semibold mb-2">
                Enhanced Security
              </h3>
              <p className="text-gray-600">
                Role-based access control and end-to-end encryption ensure your
                data stays private and secure.
              </p>
            </div>
            <div className="feature-card bg-white p-6 rounded shadow hover:shadow-lg transition">
              <div className="feature-icon text-4xl mb-4">📱</div>
              <h3 className="feature-title text-xl font-semibold mb-2">
                Accessible Anywhere
              </h3>
              <p className="text-gray-600">
                Access your school dashboard from any device with our responsive
                design and mobile-friendly interface.
              </p>
            </div>
            <div className="feature-card bg-white p-6 rounded shadow hover:shadow-lg transition">
              <div className="feature-icon text-4xl mb-4">📈</div>
              <h3 className="feature-title text-xl font-semibold mb-2">
                Data-Driven Insights
              </h3>
              <p className="text-gray-600">
                Generate comprehensive reports and visualize key metrics to make
                informed decisions.
              </p>
            </div>
            <div className="feature-card bg-white p-6 rounded shadow hover:shadow-lg transition">
              <div className="feature-icon text-4xl mb-4">💰</div>
              <h3 className="feature-title text-xl font-semibold mb-2">
                Fee Management
              </h3>
              <p className="text-gray-600">
                Streamline fee collection with online payments, automatic receipts,
                and payment tracking.
              </p>
            </div>
            <div className="feature-card bg-white p-6 rounded shadow hover:shadow-lg transition">
              <div className="feature-icon text-4xl mb-4">🔔</div>
              <h3 className="feature-title text-xl font-semibold mb-2">
                Instant Notifications
              </h3>
              <p className="text-gray-600">
                Keep parents, students, and staff informed with automated
                notifications for important updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials py-20">
        <div className="container mx-auto px-4">
          <div className="section-title text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-700 mb-4">
              What Schools Say About Us
            </h2>
            <p className="text-lg text-gray-600">
              Join hundreds of schools that have transformed their administrative
              processes
            </p>
          </div>
          <div className="testimonial-slider flex flex-col md:flex-row gap-6 overflow-x-auto px-4">
            <div className="testimonial-card bg-white p-6 rounded shadow min-w-[300px] hover:shadow-lg transition">
              <p className="testimonial-text italic mb-4">
                "EduManager has completely transformed how we handle student data.
                What used to take days now takes minutes, and our staff loves the
                intuitive interface."
              </p>
              <p className="testimonial-author font-semibold">Dr. Sarah Johnson</p>
              <p className="testimonial-role text-sm text-gray-600">
                Principal, Westlake High School
              </p>
            </div>
            <div className="testimonial-card bg-white p-6 rounded shadow min-w-[300px] hover:shadow-lg transition">
              <p className="testimonial-text italic mb-4">
                "The security features give us peace of mind knowing our students'
                information is protected. The customer support team has been
                exceptional in helping us get started."
              </p>
              <p className="testimonial-author font-semibold">Michael Roberts</p>
              <p className="testimonial-role text-sm text-gray-600">
                IT Administrator, Springfield Elementary
              </p>
            </div>
            <div className="testimonial-card bg-white p-6 rounded shadow min-w-[300px] hover:shadow-lg transition">
              <p className="testimonial-text italic mb-4">
                "Parents love being able to track their children's progress and
                fees online. The platform has significantly improved communication
                between our school and families."
              </p>
              <p className="testimonial-author font-semibold">Jennifer Lee</p>
              <p className="testimonial-role text-sm text-gray-600">
                Administrative Head, Riverdale Academy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-700 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="footer-content grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="footer-column">
              <h3 className="text-lg font-semibold mb-2">EduManager</h3>
              <p>
                Modern school data management platform designed to simplify
                administrative tasks and enhance educational outcomes.
              </p>
            </div>
            <div className="footer-column">
              <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
              <ul>
                <li>
                  <Link href="/get-started">Home</Link>
                </li>
                <li>
                  <Link href="#">Features</Link>
                </li>
                <li>
                  <Link href="#">Pricing</Link>
                </li>
                <li>
                  <Link href="#">Contact</Link>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h3 className="text-lg font-semibold mb-2">Legal</h3>
              <ul>
                <li>
                  <Link href="#">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="#">Terms of Service</Link>
                </li>
                <li>
                  <Link href="#">Data Protection</Link>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
              <ul>
                <li>Email: info@edumanager.com</li>
                <li>Phone: (555) 123-4567</li>
                <li>Address: 123 Education St, Suite 100, San Francisco, CA 94105</li>
              </ul>
            </div>
          </div>
          <div className="copyright text-center mt-8 border-t border-blue-600 pt-4">
            <p>&copy; 2025 EduManager. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
