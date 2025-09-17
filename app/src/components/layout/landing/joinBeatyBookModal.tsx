"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CustomerCard } from "@/components/layout/landing/customerCard";
import { SalonOwnerCard } from "@/components/layout/landing/salonOwnerCard";

export function JoinBeautyBookModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 hover:bg-purple-700">
          Join Beauty Book
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            Join Beauty Book
          </DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-6">
          <CustomerCard />
          <SalonOwnerCard />
        </div>
      </DialogContent>
    </Dialog>
  );
}
