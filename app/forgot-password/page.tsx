"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement forgot password logic with API
    // Handle forgot password logic here
    setIsSubmitted(true);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Image */}
      <div className="relative hidden w-1/2 lg:block">
        <Image
          src="/login-image.png"
          alt="Family using tablet"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right Side - Form */}
      <div className="flex w-full items-center justify-center bg-white px-6 py-12 lg:w-1/2 lg:px-12">
        <div className="w-full max-w-md space-y-8">
          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-slate-900">Lupa Password</h1>
                <p className="text-slate-600">
                  Reset password akun Sentra Medika Anda dengan memasukkan email terdaftar.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukkan email"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition focus:border-[#262B7E] focus:outline-none focus:ring-2 focus:ring-[#262B7E]/20"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full rounded-lg bg-[#5B7CFF] py-3 text-sm font-semibold text-white transition hover:bg-[#4a6eef]"
                >
                  Kirim
                </button>

                {/* Back to Login */}
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 text-sm font-semibold text-[#262B7E] transition hover:underline"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Kembali ke Login
                </Link>
              </form>
            </>
          ) : (
            <>
              {/* Success Message */}
              <div className="space-y-6 text-center">
                {/* Success Icon */}
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <svg
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-slate-900">Email Terkirim!</h1>
                  <p className="text-slate-600">
                    Kami telah mengirimkan link reset password ke email <br />
                    <span className="font-semibold text-slate-900">{email}</span>
                  </p>
                  <p className="text-sm text-slate-500">
                    Silakan cek inbox atau folder spam Anda
                  </p>
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="w-full rounded-lg border-2 border-[#262B7E] bg-white py-3 text-sm font-semibold text-[#262B7E] transition hover:bg-slate-50"
                  >
                    Kirim Ulang Email
                  </button>

                  <Link
                    href="/login"
                    className="flex items-center justify-center gap-2 text-sm font-semibold text-[#262B7E] transition hover:underline"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Kembali ke Login
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

