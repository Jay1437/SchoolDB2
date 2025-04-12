"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  // Framer Motion variants for a staggered container
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  // Each child fades in and slides up from below
  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Feature data
  const features = [
    { icon: "📊", title: "Digital Record-Keeping", desc: "Store all student and staff records securely." },
    { icon: "🔒", title: "Enhanced Security", desc: "Role-based access and end-to-end encryption." },
    { icon: "📱", title: "Accessible Anywhere", desc: "Access your dashboard from any device." },
    { icon: "📈", title: "Data-Driven Insights", desc: "Generate reports and visualize metrics." },
    { icon: "💰", title: "Fee Management", desc: "Online payments, receipts, and tracking." },
    { icon: "🔔", title: "Instant Notifications", desc: "Keep everyone informed with alerts." },
  ];

  // Testimonial data
  const testimonials = [
    {
      text: "EduManager has completely transformed how we handle student data. What used to take days now takes minutes, and our staff loves the intuitive interface.",
      name: "Dr. Sarah Johnson",
      role: "Principal, Westlake High School",
    },
    {
      text: "The security features give us peace of mind knowing our students' information is protected. The customer support team has been exceptional in helping us get started.",
      name: "Michael Roberts",
      role: "IT Administrator, Springfield Elementary",
    },
    {
      text: "Parents love being able to track their children's progress and fees online. The platform has significantly improved communication between our school and families.",
      name: "Jennifer Lee",
      role: "Administrative Head, Riverdale Academy",
    },
  ];

  return (
    <motion.div
      className="flex flex-col min-h-screen bg-gray-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Header />

      {/* Hero Section */}
      <motion.section className="hero pt-24 pb-20 bg-gradient-to-br from-gray-100 to-blue-100" variants={childVariants}>
        <div className="container mx-auto px-4">
          <div className="hero-content flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="hero-text flex-1">
              <motion.h1 className="text-4xl font-bold text-blue-700 mb-4" variants={childVariants}>
                Modern School Management Platform
              </motion.h1>
              <motion.p className="subtitle text-lg text-gray-600 mb-8" variants={childVariants}>
                Digitize your school&apos;s administrative tasks with our secure, scalable, and easy-to-use platform. Manage students, teachers, grades, attendance, and more from anywhere.
              </motion.p>
              <motion.div variants={childVariants}>
                <Link href="/get-started">
                  <button className="px-6 py-3 bg-blue-700 text-white rounded hover:bg-blue-800 transition">
                    Learn More
                  </button>
                </Link>
              </motion.div>
            </div>
            <motion.div className="hero-image flex-1 text-center" variants={childVariants}>
            <Image
  src="/path/to/image.jpg"
  alt="Dashboard Preview"
  width={500}  // Add appropriate width
  height={300} // Add appropriate height
/>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section className="features py-20 bg-gray-50" variants={childVariants}>
        <div className="container mx-auto px-4 text-center">
          <motion.h2 className="text-3xl font-bold text-blue-700 mb-4" variants={childVariants}>
            Why Choose EduManager
          </motion.h2>
          <motion.p className="text-lg text-gray-600 mb-12" variants={childVariants}>
            Simplify your school&apos;s administrative processes with our comprehensive features.
          </motion.p>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants}>
            {features.map((feature, index) => (
              <motion.div key={index} className="bg-white p-6 rounded shadow hover:shadow-lg transition" variants={childVariants}>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section className="testimonials py-20" variants={childVariants}>
        <div className="container mx-auto px-4 text-center">
          <motion.h2 className="text-3xl font-bold text-blue-700 mb-4" variants={childVariants}>
            What Schools Say About Us
          </motion.h2>
          <motion.p className="text-lg text-gray-600 mb-12" variants={childVariants}>
            Join hundreds of schools that have transformed their administrative processes.
          </motion.p>
          <motion.div className="flex flex-col md:flex-row gap-6 overflow-x-auto px-4" variants={containerVariants}>
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} className="bg-white p-6 rounded shadow min-w-[300px] hover:shadow-lg transition" variants={childVariants}>
                <p className="italic mb-4">{`"${testimonial.text}"`}</p>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer className="bg-blue-700 text-white py-6" variants={childVariants}>
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <motion.div variants={childVariants}>
            <h3 className="text-lg font-semibold mb-2">EduManager</h3>
            <p>
              Modern school data management platform designed to simplify administrative tasks.
            </p>
          </motion.div>
          <motion.div variants={childVariants}>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul>
              <li><Link href="/get-started">Home</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </motion.div>
          <motion.div variants={childVariants}>
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p>Email: info@edumanager.com</p>
            <p>Phone: (555) 123-4567</p>
          </motion.div>
        </div>
        <motion.div className="text-center mt-6 border-t border-blue-600 pt-4" variants={childVariants}>
          <p>&copy; 2025 EduManager. All rights reserved.</p>
        </motion.div>
      </motion.footer>
    </motion.div>
  );
}
