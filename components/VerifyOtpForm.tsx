"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

export default function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") || "";
  const [email] = useState(initialEmail);
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { update } = useSession();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) setOtp(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Email verified successfully!");
        await update();
        router.push("/login");
      } else {
        setError(result.error || "Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to connect to the server.");
    }

    setIsSubmitting(false);
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
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
      <motion.main className="flex-grow flex items-center justify-center p-4" variants={childVariants}>
        <div className="w-full max-w-sm space-y-6">
          <motion.div className="text-center" variants={childVariants}>
            <h2 className="text-3xl font-bold text-blue-700">Verify Your Email</h2>
            <p className="text-sm text-gray-600">Please enter the OTP sent to: {email}</p>
          </motion.div>
          <motion.form className="space-y-4" onSubmit={handleSubmit} variants={childVariants}>
            <div className="space-y-2">
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP</label>
              <input
                id="otp"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={otp}
                onChange={handleChange}
                autoComplete="one-time-code"
                inputMode="numeric"
                pattern="[0-9]*"
                required
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <motion.button
              type="submit"
              className="w-full px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition"
              disabled={isSubmitting}
              variants={childVariants}
            >
              {isSubmitting ? <span className="loader"></span> : "Verify Email"}
            </motion.button>
          </motion.form>
        </div>
      </motion.main>
    </motion.div>
  );
}
