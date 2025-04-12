'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import Link from "next/link";

export default function BookAppointment() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    contactName: "",
    email: "",
    phone: "",
    schoolName: "",
    schoolAddress: "",
    preferredDate: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace with your API call to submit appointment request.
      alert("Appointment request submitted. Our representative will contact you soon!");
      router.push("/");
    } catch (error) {
      console.error(error); // Log the error if needed
      alert("Failed to submit your appointment request.");
    }
    setIsSubmitting(false);
  };

  // Framer Motion variants for a staggered effect.
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
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
            Book an Appointment
          </motion.h1>
          <motion.p className="text-lg text-gray-600 mb-10" variants={childVariants}>
            Provide your details below so our representative can visit your school and explain our services.
          </motion.p>
          <motion.form
            className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md"
            onSubmit={handleSubmit}
            variants={childVariants}
          >
            <div className="mb-4">
              <Label htmlFor="contactName" className="block mb-2 text-sm font-medium text-gray-700">
                Contact Person&apos;s Name
              </Label>
              <Input
                id="contactName"
                name="contactName"
                type="text"
                placeholder="Your Name"
                value={formData.contactName}
                onChange={handleChange}
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
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700">
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Your Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="schoolName" className="block mb-2 text-sm font-medium text-gray-700">
                School Name
              </Label>
              <Input
                id="schoolName"
                name="schoolName"
                type="text"
                placeholder="Enter your school name"
                value={formData.schoolName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="schoolAddress" className="block mb-2 text-sm font-medium text-gray-700">
                School Address
              </Label>
              <Input
                id="schoolAddress"
                name="schoolAddress"
                type="text"
                placeholder="Enter your school address"
                value={formData.schoolAddress}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="preferredDate" className="block mb-2 text-sm font-medium text-gray-700">
                Preferred Appointment Date
              </Label>
              <Input
                id="preferredDate"
                name="preferredDate"
                type="date"
                value={formData.preferredDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">
                Message (Optional)
              </Label>
              <textarea
                id="message"
                name="message"
                placeholder="Any additional details..."
                value={formData.message}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                rows={4}
              ></textarea>
            </div>
            <motion.div variants={childVariants}>
              <Button
                type="submit"
                className="w-full bg-blue-700 text-white hover:bg-blue-800 transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Appointment Request"}
              </Button>
            </motion.div>
          </motion.form>
          <motion.div className="mt-12" variants={childVariants}>
            <p className="text-gray-600">
              Prefer to speak with us directly?{" "}
              <Link href="mailto:support@edumanager.com" className="text-blue-700 font-medium hover:underline">
                Email our team
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.main>
    </motion.div>
  );
}
