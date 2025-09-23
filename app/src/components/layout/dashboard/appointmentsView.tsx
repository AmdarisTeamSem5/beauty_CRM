"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";

interface Appointment {
  id: string;
  businessName: string;
  service: string;
  address: string;
  date: string;
  time: string;
  duration: string;
  clientName: string;
  price: number;
  status: "confirmed" | "pending" | "cancelled";
}

const mockAppointments: Appointment[] = [
  {
    id: "1",
    businessName: "Luxe Beauty Studio",
    service: "Hair Cut & Color",
    address: "123 Main St, NYC",
    date: "2024-01-15",
    time: "2:00 PM",
    duration: "2 hours",
    clientName: "Emma Wilson",
    price: 150,
    status: "confirmed",
  },
  {
    id: "2",
    businessName: "Glamour Nails",
    service: "Gel Manicure",
    address: "456 Broadway, NYC",
    date: "2024-01-18",
    time: "11:00 AM",
    duration: "1 hour",
    clientName: "Maria Garcia",
    price: 45,
    status: "confirmed",
  },
];

export function AppointmentsView() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "history" | "all">(
    "upcoming"
  );

  const handleReschedule = (appointmentId: string) => {
    console.log("Reschedule appointment:", appointmentId);
  };

  const handleCancel = (appointmentId: string) => {
    console.log("Cancel appointment:", appointmentId);
  };

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex items-center gap-8 mb-8 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`pb-4 px-1 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "upcoming"
              ? "border-gray-900 text-gray-900"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Upcoming (2)
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`pb-4 px-1 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "history"
              ? "border-gray-900 text-gray-900"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          History (3)
        </button>
        <button
          onClick={() => setActiveTab("all")}
          className={`pb-4 px-1 text-sm font-medium border-b-2 transition-colors ml-auto ${
            activeTab === "all"
              ? "border-gray-900 text-gray-900"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          All Appointments
        </button>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {mockAppointments.map((appointment) => (
          <Card key={appointment.id} className="p-6 bg-white shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {appointment.businessName}
                    </h3>
                    <p className="text-purple-600 font-medium mb-1">
                      {appointment.service}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {appointment.address}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800 hover:bg-green-100"
                    >
                      {appointment.status}
                    </Badge>
                    <div className="text-right">
                      <p className="text-xl font-semibold text-gray-900">
                        ${appointment.price}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{appointment.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>
                      {appointment.time} ({appointment.duration})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{appointment.clientName}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReschedule(appointment.id)}
                    className="text-gray-700 border-gray-300 hover:bg-gray-50"
                  >
                    Reschedule
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleCancel(appointment.id)}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}