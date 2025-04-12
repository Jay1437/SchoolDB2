"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Bell, User, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// ProgressCircle component for profile completeness, now with a reduced default size.
interface ProgressCircleProps {
  progress: number;
  size?: number;
}
function ProgressCircle({ progress, size = 36 }: ProgressCircleProps) {
  const stroke = 4;
  const radius = (size - stroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const dashOffset = circumference - (progress / 100) * circumference;
  const strokeColor = progress >= 80 ? "green" : progress >= 50 ? "orange" : "red";
  return (
    <svg height={size} width={size}>
      {/* Background circle */}
      <circle
        stroke="#e5e7eb"
        fill="transparent"
        strokeWidth={stroke}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      {/* Progress circle */}
      <circle
        stroke={strokeColor}
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      {/* Profile icon inside */}
      <foreignObject x="0" y="0" width={size} height={size}>
        <div className="w-full h-full flex items-center justify-center">
          <User size={size / 2} className="text-gray-800" />
        </div>
      </foreignObject>
    </svg>
  );
}

export function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const profileProgress = 65; // Adjust dynamically as needed

  // Close sidebar when clicking outside.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setSidebarOpen(false);
        setIsEditingEmail(false);
      }
    };
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  // Function to update email.
  const handleEmailUpdate = async () => {
    if (!newEmail) return;
    try {
      const res = await fetch("/api/update-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newEmail }),
      });
      const result = await res.json();
      if (res.ok) {
        alert("Email updated. Please verify your new email.");
        router.push(`/verify-otp?email=${encodeURIComponent(newEmail)}`);
      } else {
        alert("Error updating email: " + result.error);
      }
    } catch (error) {
      console.error(error); // Log the error if needed
      alert("Failed to update email.");
    }
  };

  return (
    <>
      <header className="bg-white shadow fixed w-full z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-700">
            EduManager
          </Link>
          {/* Navigation */}
          <ul className="flex space-x-6 items-center">
            <li>
              <Link
                href="/get-started"
                className="text-gray-800 hover:text-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </li>
            <li>
              <Link
                href="/features"
                className="text-gray-800 hover:text-blue-700 transition-colors"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className="text-gray-800 hover:text-blue-700 transition-colors"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="/contacts"
                className="text-gray-800 hover:text-blue-700 transition-colors"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/book-demo"
                className="text-gray-800 hover:text-blue-700 transition-colors"
              >
                Book a Demo
              </Link>
            </li>
            {session ? (
              <>
                <li>
                  <button className="p-2 rounded hover:bg-gray-100 transition">
                    <Bell size={20} className="text-gray-800" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="flex items-center focus:outline-none"
                  >
                    <ProgressCircle progress={profileProgress} size={40} />
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/register"
                    className="px-4 py-2 border-2 border-blue-700 text-blue-700 rounded hover:bg-blue-700 hover:text-white transition-colors"
                  >
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors"
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </header>

      {/* Sliding Sidebar for Document Verification & Profile Editing */}
      {isSidebarOpen && (
        <div
          ref={sidebarRef}
          className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-20 transition-transform duration-300 ease-in-out"
        >
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Profile Details</h2>
            <button onClick={() => { setSidebarOpen(false); setIsEditingEmail(false); }} className="p-2 rounded hover:bg-gray-200">
              <X size={24} className="text-gray-800" />
            </button>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12">
                <ProgressCircle progress={profileProgress} size={48} />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800">{session?.user?.name || "Not Provided"}</p>
                <p className="text-sm text-gray-600">
                  {session?.user?.email || "Not Provided"}{" "}
                  <button onClick={() => setIsEditingEmail(true)} className="text-blue-700 underline">Edit</button>
                </p>
              </div>
            </div>
            {isEditingEmail && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">New Email</label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter new email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
                <button
                  onClick={handleEmailUpdate}
                  className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition-colors"
                >
                  Update Email
                </button>
              </div>
            )}
            <div className="border p-3 rounded bg-gray-100">
              <p className="text-sm text-gray-700">
                Complete your profile by verifying your documents. This helps us serve you better.
              </p>
            </div>
            <button
              onClick={() => router.push("/verify-docs")}
              className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition-colors"
            >
              Verify Documents
            </button>
          </div>
        </div>
      )}
    </>
  );
}
