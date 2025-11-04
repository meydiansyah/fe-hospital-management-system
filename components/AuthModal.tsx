"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleLogin = () => {
    // Replace this with your backend Google OAuth route
    window.location.href = "/auth/google";
  };

  const handleLogin = () => {
    onOpenChange(false);
    router.push("profile");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("authentication") ?? "Authentication"}</DialogTitle>
          <DialogDescription>
            {t("please_login_or_register") ??
              "Please login or register to continue."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* 🔹 Google login */}
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 cursor-pointer"
            onClick={handleGoogleLogin}
          >
            {/* ✅ Inline Google SVG icon (no library needed) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 48 48"
              className="mr-2"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.84-6.84C35.63 2.54 30.12 0 24 0 14.62 0 6.34 5.38 2.54 13.22l7.93 6.15C12.34 13.13 17.74 9.5 24 9.5z"
              />
              <path
                fill="#34A853"
                d="M46.1 24.55c0-1.56-.14-3.06-.39-4.55H24v9.02h12.45c-.56 2.88-2.24 5.33-4.78 6.98l7.35 5.71C43.71 37.04 46.1 31.24 46.1 24.55z"
              />
              <path
                fill="#4A90E2"
                d="M10.47 28.64A14.5 14.5 0 0 1 9.5 24c0-1.61.26-3.17.74-4.64L2.54 13.22A23.87 23.87 0 0 0 0 24c0 3.9.93 7.6 2.54 10.78l7.93-6.14z"
              />
              <path
                fill="#FBBC05"
                d="M24 48c6.12 0 11.27-2.02 15.03-5.48l-7.35-5.71C29.45 38.34 26.88 39 24 39c-6.26 0-11.66-3.63-13.93-8.71l-7.93 6.14C6.34 42.62 14.62 48 24 48z"
              />
            </svg>
            {t("login_with_google") ?? "Login with Google"}
          </Button>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <span>{t("or") ?? "or"}</span>
          </div>

          {/* 🔹 Email */}
          <Input placeholder={t("email") ?? "Email"} type="email" />

          {/* 🔹 Password with toggle */}
          <div className="relative">
            <Input
              placeholder={t("password") ?? "Password"}
              type={showPassword ? "text" : "password"}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>

          <Button onClick={handleLogin} className="w-full cursor-pointer">
            {t("login") ?? "Login"}
          </Button>

          <div className="mt-2 text-center text-sm">
            {t("no_account") ?? "Don't have an account?"}{" "}
            <Button
              variant="link"
              className="cursor-pointer"
              onClick={() => alert("Switch to Register form")}
            >
              {t("register") ?? "Register"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
