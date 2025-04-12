import { Suspense } from "react";
import { Header } from "@/components/Header";
import VerifyOtpForm from "@/components/VerifyOtpForm";

export default function VerifyOTPPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
        <VerifyOtpForm />
      </Suspense>
    </div>
  );
}
