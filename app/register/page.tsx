"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/Header";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

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

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Registration failed.");
      }

      const result = await response.json();
      alert(result.message);
      router.push(`/verify-otp?email=${encodeURIComponent(data.email)}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message || "Failed to connect to the server.");
      } else {
        alert("An unexpected error occurred.");
      }
    }
     finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="flex flex-col min-h-screen bg-gray-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Header />
      <motion.main className="flex-grow flex items-center justify-center p-4 pt-20" variants={childVariants}>
        <div className="w-full max-w-md space-y-6">
          <motion.div className="text-center" variants={childVariants}>
            <h2 className="text-2xl font-bold text-blue-700">Register Your Account</h2>
            <p className="text-sm text-gray-600 mt-2">Create an account to get started with EduManager.</p>
          </motion.div>
          <motion.div className="bg-white p-6 rounded-lg shadow-sm" variants={childVariants}>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <motion.div className="space-y-2" variants={childVariants}>
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" {...register("name", { required: "Name is required" })} />
                {errors.name && <p className="text-red-600 text-sm" aria-live="polite">{errors.name.message}</p>}
              </motion.div>

              <motion.div className="space-y-2" variants={childVariants}>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email format" },
                  })}
                />
                {errors.email && <p className="text-red-600 text-sm" aria-live="polite">{errors.email.message}</p>}
              </motion.div>

              <motion.div className="space-y-2" variants={childVariants}>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                  })}
                />
                {errors.password && <p className="text-red-600 text-sm" aria-live="polite">{errors.password.message}</p>}
              </motion.div>

              <motion.div className="space-y-2" variants={childVariants}>
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (val: string) => watch("password") === val || "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <p className="text-red-600 text-sm" aria-live="polite">{errors.confirmPassword.message}</p>
                )}
              </motion.div>

              <motion.div variants={childVariants}>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Registering..." : "Register"}
                </Button>
              </motion.div>
            </form>
          </motion.div>

          <motion.div className="text-center text-sm" variants={childVariants}>
            Already have an account?{" "}
            <Link href="/login" className="text-blue-700 hover:text-blue-800 font-medium">
              Sign in
            </Link>
          </motion.div>
        </div>
      </motion.main>
    </motion.div>
  );
}
