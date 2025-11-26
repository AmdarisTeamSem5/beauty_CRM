"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Loader2 } from "lucide-react";
import { appointmentService } from "@/lib/api/appointments";
import { salonService } from "@/lib/api/salons";
import { salonServiceService } from "@/lib/api/services";
import { userService } from "@/lib/api/users";
import type { Appointment } from "@/lib/api/appointments";
import type { Salon } from "@/lib/api/salons";
import type { SalonService } from "@/lib/api/services";

interface AppointmentWithDetails extends Appointment {
  salon?: Salon;
  service?: SalonService;
}

export function AppointmentsView() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "history" | "all">(
    "upcoming"
  );
  const [appointments, setAppointments] = useState<AppointmentWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get current user to filter appointments
        const currentUser = await userService.getCurrent();
        
        // Fetch all appointments
        const appointmentsData = await appointmentService.getAll();
        
        // Filter appointments for current user
        const userAppointments = appointmentsData.filter(
          (a) => a.clientId === currentUser.id
        );
        
        // Fetch salon and service details for each appointment
        const appointmentsWithDetails = await Promise.all(
          userAppointments.map(async (appointment) => {
            try {
              const [salon, service] = await Promise.all([
                salonService.getById(appointment.salonId).catch(() => null),
                salonServiceService.getById(appointment.salonServiceId).catch(() => null),
              ]);
              
              return {
                ...appointment,
                salon: salon || undefined,
                service: service || undefined,
              };
            } catch (err) {
              console.error(`Failed to fetch details for appointment ${appointment.id}:`, err);
              return appointment;
            }
          })
        );
        
        setAppointments(appointmentsWithDetails);
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
        setError("Failed to load appointments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleReschedule = (appointmentId: string) => {
    console.log("Reschedule appointment:", appointmentId);
    // TODO: Implement reschedule functionality
  };

  const handleCancel = async (appointmentId: string) => {
    if (!confirm("Are you sure you want to cancel this appointment?")) {
      return;
    }
    
    try {
      await appointmentService.delete(appointmentId);
      setAppointments(appointments.filter(a => a.id !== appointmentId));
    } catch (err) {
      console.error("Failed to cancel appointment:", err);
      alert("Failed to cancel appointment. Please try again.");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (confirmed: boolean) => {
    if (confirmed) {
      return (
        <Badge
          variant="secondary"
          className="bg-green-100 text-green-800 hover:bg-green-100"
        >
          Confirmed
        </Badge>
      );
    }
    return (
      <Badge
        variant="secondary"
        className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      >
        Pending
      </Badge>
    );
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.appointmentDate);
    const now = new Date();
    
    if (activeTab === "upcoming") {
      return appointmentDate >= now;
    } else if (activeTab === "history") {
      return appointmentDate < now;
    }
    return true; // "all"
  });

  const upcomingCount = appointments.filter(
    (a) => new Date(a.appointmentDate) >= new Date()
  ).length;
  
  const historyCount = appointments.filter(
    (a) => new Date(a.appointmentDate) < new Date()
  ).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
        <span className="ml-3 text-gray-600">Loading appointments...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex items-center gap-8 mb-8 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`pb-4 px-1 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "upcoming"
              ? "border-purple-600 text-purple-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Upcoming ({upcomingCount})
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`pb-4 px-1 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "history"
              ? "border-purple-600 text-purple-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          History ({historyCount})
        </button>
        <button
          onClick={() => setActiveTab("all")}
          className={`pb-4 px-1 text-sm font-medium border-b-2 transition-colors ml-auto ${
            activeTab === "all"
              ? "border-purple-600 text-purple-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          All Appointments ({appointments.length})
        </button>
      </div>

      {/* Appointments List */}
      {filteredAppointments.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {activeTab === "upcoming"
              ? "No upcoming appointments"
              : activeTab === "history"
              ? "No past appointments"
              : "No appointments found"}
          </p>
          <p className="text-gray-400 text-sm mt-2">
            {activeTab === "upcoming" && "Book your first appointment to get started!"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <Card
              key={appointment.id}
              className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {appointment.salon?.name || "Salon Name"}
                      </h3>
                      <p className="text-purple-600 font-medium mb-1">
                        {appointment.service?.name || "Service"}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {appointment.salon?.address || "Address"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(appointment.confirmed)}
                      <div className="text-right">
                        <p className="text-xl font-semibold text-gray-900">
                          {appointment.service?.priceMDL
                            ? `${appointment.service.priceMDL} MDL`
                            : "—"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-gray-600 mb-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(appointment.appointmentDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>
                        {formatTime(appointment.appointmentDate)}
                        {appointment.service?.durationMinutes &&
                          ` (${appointment.service.durationMinutes} min)`}
                      </span>
                    </div>
                    {appointment.service?.description && (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span className="max-w-xs truncate">
                          {appointment.service.description}
                        </span>
                      </div>
                    )}
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
      )}
    </div>
  );
}
