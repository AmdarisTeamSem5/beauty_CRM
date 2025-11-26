"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserIcon, Mail, Phone, MapPin } from "lucide-react";
import { userService } from "@/lib/api/users";

export default function CustomerSignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!form.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const userData = {
        email: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
        phoneNumber: form.phone,
        isBlocked: false,
        password: form.password,
      };

      const userId = await userService.create(userData);
      console.log("User created successfully:", userId);

      // Show success message and redirect
      alert("Account created successfully! You can now log in.");
      router.push("/");
    } catch (error: any) {
      console.error("Registration error:", error);
      setErrors({
        submit: error.message || "Registration failed. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
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
            <UserIcon className="h-7 w-7 text-purple-600" />
          </div>
          <h1 className="mt-4 text-xl font-bold text-gray-900">
            Create Your Account
          </h1>
          <p className="text-sm text-gray-500">
            Join Beauty Book as a customer
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Name fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                placeholder="First Name"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                placeholder="Last Name"
              />
            </div>
          </div>

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
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="phone"
                type="tel"
                className="pl-10"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Phone Number"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="location"
                className="pl-10"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="City, State"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Password"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              placeholder="Confirm Password"
            />
          </div>

          {/* Error message */}
          {errors.submit && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
              {errors.submit}
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 disabled:opacity-50"
          >
            {isSubmitting ? "Creating Account..." : "Create Account →"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
