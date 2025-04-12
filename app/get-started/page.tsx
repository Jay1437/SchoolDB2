"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { motion } from "framer-motion";

export default function GetStarted() {
  const router = useRouter();
  const [selectedSchool, setSelectedSchool] = useState("");

  useEffect(() => {
    // Any client-only logic can be added here.
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSchool) {
      if (selectedSchool === "4") {
        router.push("/register");
      } else {
        router.push("/dashboard");
      }
    } else {
      alert("Please select your school to continue.");
    }
  };

  // Variants for the container (staggered children)
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Variants for each animated child
  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      className="flex flex-col min-h-screen bg-gray-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Header />
      <motion.section
        className="get-started pt-24 pb-20 bg-gray-50"
        variants={childVariants}
      >
        <div className="container mx-auto px-4">
          <motion.div className="flex flex-col items-center text-center" variants={childVariants}>
            <motion.h1 className="text-4xl font-bold text-blue-700 mb-4" variants={childVariants}>
              Get Started with EduManager
            </motion.h1>
            <motion.p className="text-lg text-gray-600 mb-8" variants={childVariants}>
              Choose your school to access your dashboard or register a new school.
            </motion.p>
            <motion.form className="w-full max-w-md" onSubmit={handleSubmit} variants={childVariants}>
              <motion.select
                className="w-full p-3 border border-gray-300 rounded mb-4"
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                variants={childVariants}
              >
                <option value="">Select Your School</option>
                <option value="1">Springfield Elementary School</option>
                <option value="2">Westlake High School</option>
                <option value="3">Riverdale Academy</option>
                <option value="4">Register a New School</option>
              </motion.select>
              <motion.button
                type="submit"
                className="w-full px-4 py-3 bg-blue-700 text-white rounded hover:bg-blue-800 transition"
                variants={childVariants}
              >
                Continue
              </motion.button>
            </motion.form>
            <motion.div className="mt-6" variants={childVariants}>
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-blue-700 font-medium hover:underline"
                >
                  Login here
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
}
