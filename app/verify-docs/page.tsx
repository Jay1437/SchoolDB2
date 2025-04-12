"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";

export default function VerifyDocs() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    schoolName: "",
    schoolCode: "",
    authorizedPerson: "",
    contact: "",
    regCert: null as File | null,
    affiliationLetter: null as File | null,
    udisecert: null as File | null,
  });

  // If no session or role is not allowed, block access.
  if (!session || (session.user.role !== "school" && session.user.role !== "Admin")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-center text-xl font-semibold text-red-500">
          Access Denied. Only verified schools can upload documents.
        </p>
      </div>
    );
  }

  // Handle text input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file changes for each document field
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  // Framer Motion variants for smooth entrance
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const uploadData = new FormData();
    uploadData.append("schoolName", formData.schoolName);
    uploadData.append("schoolCode", formData.schoolCode);
    uploadData.append("authorizedPerson", formData.authorizedPerson);
    uploadData.append("contact", formData.contact);
    if (formData.regCert) uploadData.append("regCert", formData.regCert);
    if (formData.affiliationLetter) uploadData.append("affiliationLetter", formData.affiliationLetter);
    if (formData.udisecert) uploadData.append("udisecert", formData.udisecert);

    try {
      await axios.post("/api/verify-docs", uploadData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Documents uploaded successfully!");
    } catch (error) {
      console.error("Error uploading documents", error);
      alert("Upload failed");
    }
  };

  return (
    <>
      {/* Fixed Header to Stay on Top */}
      <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <Header />
      </div>

      {/* Main Content with Margin to Avoid Overlapping */}
      <motion.div
        className="max-w-3xl mx-auto p-8 mt-20 bg-white shadow rounded"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 className="text-3xl font-bold text-center mb-6" variants={childVariants}>
          Verify School Documents
        </motion.h1>
        <motion.form className="space-y-6" onSubmit={handleSubmit} variants={childVariants}>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium text-gray-700">School Name</label>
            <input
              type="text"
              name="schoolName"
              value={formData.schoolName}
              onChange={handleChange}
              placeholder="Enter your school name"
              className="border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium text-gray-700">School Code</label>
            <input
              type="text"
              name="schoolCode"
              value={formData.schoolCode}
              onChange={handleChange}
              placeholder="Enter your school code"
              className="border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium text-gray-700">Authorized Person</label>
            <input
              type="text"
              name="authorizedPerson"
              value={formData.authorizedPerson}
              onChange={handleChange}
              placeholder="Enter the authorized person's name"
              className="border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium text-gray-700">Contact</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Enter your contact number"
              className="border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium text-gray-700">School Registration Certificate</label>
            <input
              type="file"
              name="regCert"
              onChange={handleFileChange}
              className="border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium text-gray-700">Affiliation Letter</label>
            <input
              type="file"
              name="affiliationLetter"
              onChange={handleFileChange}
              className="border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium text-gray-700">UDISE Certificate</label>
            <input
              type="file"
              name="udisecert"
              onChange={handleFileChange}
              className="border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <motion.button
            type="submit"
            className="w-full bg-blue-700 text-white py-3 rounded hover:bg-blue-800 transition-colors"
            variants={childVariants}
          >
            Submit Documents
          </motion.button>
        </motion.form>
      </motion.div>
    </>
  );
}
