"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SalonCard = () => {
  return (
    <Card className="w-full min-h-72">
      <CardHeader>
        <CardTitle>{/* Card Title */}</CardTitle>
        <CardDescription>{/* Card Description */}</CardDescription>
      </CardHeader>
      <CardContent>{/* <p>Card Content</p> */}</CardContent>
      <CardFooter>{/* <p>Card Footer</p> */}</CardFooter>
    </Card>
  );
};

export default SalonCard;
