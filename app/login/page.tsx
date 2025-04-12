"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/Header";
import { motion } from "framer-motion";

type FormData = {
  email: string;
  password: string;
};

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

export default function Login() {
  const { update } = useSession(); // Removed session as it's unused

  useEffect(() => {
    update(); // Forces session refresh after email update
  }, [update]); // Added 'update' to the dependency array

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.ok) {
      router.push("/");
    } else {
      alert("Login failed. Please check your credentials and try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <motion.div
      className="flex flex-col min-h-screen bg-gray-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Header />
      <motion.main className="flex-grow flex items-center justify-center p-4" variants={childVariants}>
        <div className="w-full max-w-md space-y-6">
          <motion.div className="text-center" variants={childVariants}>
            <h2 className="text-2xl font-bold text-blue-700">
              Sign in to your EduManager account
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Welcome back! Please enter your details.
            </p>
          </motion.div>
          <motion.div className="bg-white p-6 rounded-lg shadow-sm" variants={childVariants}>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <motion.div className="space-y-2" variants={childVariants}>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm">{errors.email.message}</p>
                )}
              </motion.div>
              <motion.div className="space-y-2" variants={childVariants}>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  {...register("password", { required: "Password is required" })}
                />
                {errors.password && (
                  <p className="text-red-600 text-sm">{errors.password.message}</p>
                )}
              </motion.div>
              <motion.div className="flex items-center justify-end" variants={childVariants}>
                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-700 hover:text-blue-800"
                >
                  Forgot password?
                </Link>
              </motion.div>
              <motion.div variants={childVariants}>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </Button>
              </motion.div>
            </form>
          </motion.div>
          <motion.div className="text-center text-sm" variants={childVariants}>
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-700 hover:text-blue-800 font-medium">
              Sign up
            </Link>
          </motion.div>
        </div>
      </motion.main>
    </motion.div>
  );
}
