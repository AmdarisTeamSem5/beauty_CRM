"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface Salon {
  id: string;
  name?: string;
  description?: string;
}

interface SalonCardProps {
  salon: Salon;
}

const SalonCard = ({ salon }: SalonCardProps) => {
  // Optional: extra safeguard
  if (!salon) return null;

  return (
    <Card className="w-full min-h-72">
      <CardHeader>
        <CardTitle>{salon.name ?? "Unnamed Salon"}</CardTitle>
        <CardDescription>{salon.description ?? "No description available"}</CardDescription>
      </CardHeader>
      <CardContent>{/* Additional content */}</CardContent>
      <CardFooter>{/* Footer content */}</CardFooter>
    </Card>
  );
};

export default SalonCard;
