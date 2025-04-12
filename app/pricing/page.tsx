"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Example pricing plans data
const plans = [
  {
    name: "Free Trial",
    price: "Free",
    period: "30 days",
    features: [
      "Basic school management",
      "Limited support",
      "Access to demo features",
    ],
    buttonText: "Get Started",
    link: "/register",
  },
  {
    name: "Basic Plan",
    price: "$99",
    period: "per month",
    features: [
      "Full access to all features",
      "Priority support",
      "Monthly reports",
    ],
    buttonText: "Book a Demo",
    link: "/book-demo",
  },
  {
    name: "Premium Plan",
    price: "$199",
    period: "per month",
    features: [
      "All features in Basic",
      "Advanced analytics",
      "Dedicated account manager",
    ],
    buttonText: "Book a Demo",
    link: "/book-demo",
  },
];

// Container variant with staggerChildren
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Each child will animate from 30px down (y: 30) and opacity 0 to y: 0 and opacity 1
const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Pricing() {
  return (
    <motion.div
      className="flex flex-col min-h-screen bg-gray-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Header />
      <motion.main className="py-20 px-4" variants={childVariants}>
        <div className="container mx-auto text-center">
          <motion.h1
            className="text-4xl font-bold text-blue-700 mb-4"
            variants={childVariants}
          >
            Pricing Plans
          </motion.h1>
          <motion.p
            className="text-lg text-gray-600 mb-10"
            variants={childVariants}
          >
            Choose the plan that best fits your school&apos;s needs.
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition"
                variants={childVariants}
              >
                <motion.h2 className="text-2xl font-semibold mb-2" variants={childVariants}>
                  {plan.name}
                </motion.h2>
                <motion.p className="text-3xl font-bold text-blue-700 mb-4" variants={childVariants}>
                  {plan.price} <span className="text-sm font-medium">{plan.period}</span>
                </motion.p>
                <motion.ul className="mb-6 space-y-2 text-left px-4" variants={containerVariants}>
                  {plan.features.map((feature, idx) => (
                    <motion.li key={idx} className="flex items-center" variants={childVariants}>
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </motion.li>
                  ))}
                </motion.ul>
                <motion.div variants={childVariants}>
                  <Link href={plan.link}>
                    <Button className="w-full bg-blue-700 text-white hover:bg-blue-800 transition">
                      {plan.buttonText}
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="mt-12" variants={childVariants}>
            <p className="text-gray-600">
              Not sure which plan is right for you?{" "}
              <Link href="/book-demo" className="text-blue-700 font-medium hover:underline">
                Book a demo
              </Link>{" "}
              to learn more.
            </p>
          </motion.div>
        </div>
      </motion.main>
    </motion.div>
  );
}
