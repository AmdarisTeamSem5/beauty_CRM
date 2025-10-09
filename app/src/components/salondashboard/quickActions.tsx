"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scissors, UserCheck, Calendar } from "lucide-react";

export function QuickActions() {
  const handleAddService = () => {
    console.log("Add new service");
  };

  const handleManageStaff = () => {
    console.log("Manage staff");
  };

  const handleViewAppointments = () => {
    console.log("View appointments");
  };

  return (
    <Card className="p-6 bg-white shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Quick Actions
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button
          onClick={handleAddService}
          className="bg-purple-600 hover:bg-purple-700 text-white h-24 flex flex-col items-center justify-center gap-2"
        >
          <Scissors className="w-5 h-5" />
          <span className="text-sm">Add New Service</span>
        </Button>

        <Button
          onClick={handleManageStaff}
          variant="outline"
          className="border-gray-300 h-24 flex flex-col items-center justify-center gap-2"
        >
          <UserCheck className="w-5 h-5" />
          <span className="text-sm">Manage Staff</span>
        </Button>

        <Button
          onClick={handleViewAppointments}
          variant="outline"
          className="border-gray-300 h-24 flex flex-col items-center justify-center gap-2"
        >
          <Calendar className="w-5 h-5" />
          <span className="text-sm">View Appointments</span>
        </Button>
      </div>
    </Card>
  );
}