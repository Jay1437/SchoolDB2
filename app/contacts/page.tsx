"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Contact() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // For now, we'll just simulate a submission. In a real-world scenario, you'd send the data to an API.
      alert("Thank you for contacting us! We will get back to you soon.");
      router.push("/");
    } catch (error) {
      console.error(error); // Log the error if needed
      alert("Failed to submit your message.");
    }
    setIsSubmitting(false);
  };

  // Framer Motion variants for a staggered effect
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

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
      <motion.main className="py-20 px-4" variants={childVariants}>
        <div className="container mx-auto text-center">
          <motion.h1 className="text-4xl font-bold text-blue-700 mb-4" variants={childVariants}>
            Contact Us
          </motion.h1>
          <motion.p className="text-lg text-gray-600 mb-10" variants={childVariants}>
            Have questions or need support? Fill out the form below, and we’ll be in touch.
          </motion.p>

          {/* Contact Form */}
          <motion.form className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit} variants={childVariants}>
            <div className="mb-4">
              <Label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                Your Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">
                Message
              </Label>
              <textarea
                id="message"
                name="message"
                placeholder="Your message..."
                value={formData.message}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                rows={4}
                required
              ></textarea>
            </div>
            <motion.div variants={childVariants}>
              <Button type="submit" className="w-full bg-blue-700 text-white hover:bg-blue-800 transition" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </motion.div>
          </motion.form>

          {/* Additional Contact Information */}
          <motion.div className="mt-12" variants={childVariants}>
            <p className="text-gray-600">
              Alternatively, you can email us directly at{" "}
              <a href="mailto:support@edumanager.com" className="text-blue-700 font-medium hover:underline">
                support@edumanager.com
              </a>
            </p>
            <p className="text-gray-600 mt-2">
              Or call us at <span className="font-medium">+1 (555) 123-4567</span>
            </p>
            <div className="mt-6">
              <Link href="/">
                <Button className="bg-gray-700 text-white px-6 py-3 rounded hover:bg-gray-800 transition">
                  Back to Home
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.main>
    </motion.div>
  );
}
