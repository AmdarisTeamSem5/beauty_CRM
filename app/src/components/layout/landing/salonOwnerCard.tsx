"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Store } from "lucide-react";
import { useRouter } from "next/navigation";

export function SalonOwnerCard() {
  const router = useRouter();

  return (
    <Card className="p-4 text-center border">
      <CardHeader>
        <Store className="mx-auto text-purple-600 w-10 h-10 mb-2" />
        <CardTitle>I’m a Salon Owner</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">
          Grow your business, manage bookings, and reach new customers.
        </p>
        <ul className="text-sm text-gray-700 mb-4 space-y-1 text-left">
          <li>📅 Advanced booking management</li>
          <li>👥 Customer management tools</li>
          <li>📊 Business analytics</li>
        </ul>
        <Button
          className="w-full bg-purple-600 hover:bg-purple-700"
          onClick={() => router.push("/signup/salon")}
        >
          Sign Up as Salon
        </Button>
      </CardContent>
    </Card>
  );
}
