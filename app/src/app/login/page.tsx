"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Mail, Lock, Shield } from "lucide-react";
import { authenticationService } from "@/lib/api/authentication";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    securityCode: "",
  });
  const [securityCodeRequested, setSecurityCodeRequested] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!form.password) {
      newErrors.password = "Password is required";
    }
    if (securityCodeRequested && !form.securityCode) {
      newErrors.securityCode = "Security code is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRequestTwoFactorCode = async () => {
    if (!form.email || !form.password) {
      setErrors({ submit: "Please enter email and password first" });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await authenticationService.sendTwoFactorCode({
        email: form.email,
        password: form.password,
      });
      setSecurityCodeRequested(true);
      setCountdown(59);
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error: any) {
      console.error("Two-factor code request error:", error);
      
      let errorMessage = "Failed to send security code. Please try again.";
      
      if (error.isNetworkError) {
        errorMessage = "Unable to connect to the server. Please check if the backend is running.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setErrors({
        submit: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!securityCodeRequested) {
      await handleRequestTwoFactorCode();
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await authenticationService.login({
        email: form.email,
        password: form.password,
        securityCode: form.securityCode,
      });

      // Backend sets the token in HTTP-only cookie automatically
      // Just redirect to dashboard on success; the presence of a response means login worked
      if (response && response.value) {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error: any) {
      console.error("Login error:", error);
      
      let errorMessage = "Login failed. Please check your credentials and security code.";
      
      if (error.isNetworkError) {
        errorMessage = "Unable to connect to the server. Please check if the backend is running.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setErrors({
        submit: errorMessage,
      });
      // Reset security code on error
      setForm({ ...form, securityCode: "" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Back link */}
      <div className="w-full max-w-md mb-4">
        <Link href="/" className="text-sm text-gray-600 hover:underline">
          ← Back to Home
        </Link>
      </div>

      {/* Form Card */}
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center">
            <Shield className="h-7 w-7 text-purple-600" />
          </div>
          <h1 className="mt-4 text-xl font-bold text-gray-900">Login</h1>
          <p className="text-sm text-gray-500">
            Sign in to your Beauty Book account
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  className="pl-10"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Email"
                  disabled={securityCodeRequested || isSubmitting}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  className="pl-10"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  placeholder="Password"
                  disabled={securityCodeRequested || isSubmitting}
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Security Code */}
            {securityCodeRequested && (
              <div>
                <Label htmlFor="securityCode">Security Code</Label>
                <Input
                  id="securityCode"
                  type="text"
                  value={form.securityCode}
                  onChange={(e) =>
                    setForm({ ...form, securityCode: e.target.value })
                  }
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  disabled={isSubmitting}
                />
                {errors.securityCode && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.securityCode}
                  </p>
                )}
                {countdown > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    Resend code in {countdown}s
                  </p>
                )}
                {countdown === 0 && (
                  <button
                    type="button"
                    onClick={handleRequestTwoFactorCode}
                    className="text-sm text-purple-600 hover:underline mt-1"
                  >
                    Resend code
                  </button>
                )}
              </div>
            )}

            {/* Error message */}
            {errors.submit && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                {errors.submit}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 disabled:opacity-50"
            >
              {isSubmitting
                ? "Processing..."
                : securityCodeRequested
                ? "Login"
                : "Request Security Code"}
            </Button>

            {/* Links */}
            <div className="text-center space-y-2">
              <Link
                href="/signup/customer"
                className="text-sm text-purple-600 hover:underline block"
              >
                Don't have an account? Sign up
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-600 hover:underline block"
              >
                Forgot password?
              </Link>
            </div>

            {/* Info Note */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-xs text-blue-800">
                <strong>Note:</strong> If you just created an account, make sure to use the exact email and password you registered with. 
                The default admin account is: <code className="bg-blue-100 px-1 rounded">claudiugeanta@gmail.com</code> / <code className="bg-blue-100 px-1 rounded">Parola11a#</code>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

