"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";

export function CustomerCard() {
  const router = useRouter();

  return (
    <Card className="p-4 text-center border">
      <CardHeader>
        <User className="mx-auto text-purple-600 w-10 h-10 mb-2" />
        <CardTitle>I’m a Customer</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">
          Book appointments, discover new salons, and manage your beauty routine.
        </p>
        <ul className="text-sm text-gray-700 mb-4 space-y-1 text-left">
          <li>📅 Easy appointment booking</li>
          <li>⭐ Discover top-rated salons</li>
          <li>📖 Manage booking history</li>
        </ul>
        <Button
          className="w-full bg-purple-600 hover:bg-purple-700"
          onClick={() => router.push("/signup/customer")}
        >
          Sign Up as Customer
        </Button>
      </CardContent>
    </Card>
  );
}
