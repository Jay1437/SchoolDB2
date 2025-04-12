"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";

interface PlanDetails {
  schoolName: string;
  planName: string;
  planExpiry: string;
  features: string[];
}

export default function MyPlan() {
  const [plan, setPlan] = useState<PlanDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("/api/my-plan")
      .then((response) => {
        setPlan(response.data);
        setLoading(false);
      })
      .catch(() => {
        setPlan(null);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <Header />
      </div>

      {/* Main Content */}
      <motion.div
        className="max-w-3xl mx-auto p-6 mt-20 bg-white shadow rounded"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
      >
        <h1 className="text-3xl font-bold text-center mb-6">My Plan</h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : plan ? (
          <div className="p-6 bg-gray-100 rounded shadow">
            <h2 className="text-xl font-semibold">{plan.schoolName}</h2>
            <p><strong>Plan:</strong> {plan.planName}</p>
            <p className="text-green-600"><strong>Expires On:</strong> {plan.planExpiry}</p>
            <h3 className="text-lg font-semibold mt-4">Features:</h3>
            <ul className="list-disc pl-6">
              {plan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-500 mb-4">You haven&apos;t purchased a plan yet.</p>
            <button
              onClick={() => router.push("/book-demo")}
              className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
            >
              Book a Demo
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
}
