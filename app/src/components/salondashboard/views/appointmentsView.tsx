
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Download, Filter } from "lucide-react";

interface Appointment {
  id: string;
  customerName: string;
  customerPhone: string;
  service: string;
  employee: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: "confirmed" | "pending" | "completed" | "cancelled";
}

const mockAppointments: Appointment[] = [
  {
    id: "1",
    customerName: "Jessica Smith",
    customerPhone: "(555) 111-2222",
    service: "Hair Cut & Style",
    employee: "Emma Wilson",
    date: "2024-01-15",
    time: "10:00 AM",
    duration: 60,
    price: 75,
    status: "confirmed",
  },
  {
    id: "2",
    customerName: "Mike Johnson",
    customerPhone: "(555) 333-4444",
    service: "Hair Color",
    employee: "Emma Wilson",
    date: "2024-01-15",
    time: "2:00 PM",
    duration: 120,
    price: 150,
    status: "confirmed",
  },
  {
    id: "3",
    customerName: "Sarah Davis",
    customerPhone: "(555) 555-6666",
    service: "Gel Manicure",
    employee: "Maria Garcia",
    date: "2024-01-15",
    time: "11:00 AM",
    duration: 45,
    price: 35,
    status: "pending",
  },
  {
    id: "4",
    customerName: "Tom Wilson",
    customerPhone: "(555) 777-8888",
    service: "Deep Tissue Massage",
    employee: "David Chen",
    date: "2024-01-15",
    time: "3:00 PM",
    duration: 75,
    price: 95,
    status: "confirmed",
  },
  {
    id: "5",
    customerName: "Lisa Brown",
    customerPhone: "(555) 999-0000",
    service: "Hair Cut & Style",
    employee: "Emma Wilson",
    date: "2024-01-14",
    time: "1:00 PM",
    duration: 60,
    price: 75,
    status: "completed",
  },
];

export function AppointmentsView() {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [staffFilter, setStaffFilter] = useState<string>("all");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { appointmentService } = await import("@/lib/api/appointments");
        const data = await appointmentService.getAll();
        setAppointments(data);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
        // Keep using mock data on error
      }
    };

    fetchAppointments();
  }, []);

  const handleComplete = (appointmentId: string) => {
    console.log("Complete appointment:", appointmentId);
    // Update appointment status to completed
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === appointmentId ? { ...apt, status: "completed" } : apt
      )
    );
  };

  const handleCancel = (appointmentId: string) => {
    console.log("Cancel appointment:", appointmentId);
    // Update appointment status to cancelled
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === appointmentId ? { ...apt, status: "cancelled" } : apt
      )
    );
  };

  const handleConfirm = (appointmentId: string) => {
    console.log("Confirm appointment:", appointmentId);
    // Update appointment status to confirmed
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === appointmentId ? { ...apt, status: "confirmed" } : apt
      )
    );
  };

  const handleExport = () => {
    console.log("Export appointments");
    // Implement export functionality
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setDateFilter("");
    setStatusFilter("all");
    setStaffFilter("all");
  };

  const filteredAppointments = appointments.filter((apt) => {
    // Status filter
    if (statusFilter !== "all" && apt.status !== statusFilter) return false;
    
    // Staff filter
    if (staffFilter !== "all" && apt.employee !== staffFilter) return false;
    
    // Date filter
    if (dateFilter && apt.date !== dateFilter) return false;
    
    // Search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const matchesCustomer = apt.customerName.toLowerCase().includes(searchLower);
      const matchesService = apt.service.toLowerCase().includes(searchLower);
      if (!matchesCustomer && !matchesService) return false;
    }
    
    return true;
  });

  const stats = {
    today: appointments.filter((a) => a.date === new Date().toISOString().split("T")[0]).length,
    confirmed: appointments.filter((a) => a.status === "confirmed").length,
    pending: appointments.filter((a) => a.status === "pending").length,
    completed: appointments.filter((a) => a.status === "completed").length,
    total: appointments.length,
    revenue: appointments.reduce((sum, a) => sum + a.price, 0),
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Appointment Management
        </h2>
        <div className="flex items-center gap-3">
          <Button
            onClick={handleExport}
            variant="outline"
            className="border-gray-300"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Today's Schedule
          </Button>
          <Button 
            onClick={handleExport}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Filtered Data
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <Card className="p-4 bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Today</p>
              <p className="text-2xl font-bold text-gray-900">{stats.today}</p>
            </div>
            <Calendar className="w-8 h-8 text-purple-600" />
          </div>
        </Card>

        <Card className="p-4 bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Confirmed</p>
              <p className="text-2xl font-bold text-gray-900">{stats.confirmed}</p>
            </div>
            <Clock className="w-8 h-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-4 bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </Card>

        <Card className="p-4 bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
            </div>
            <User className="w-8 h-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-4 bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <Calendar className="w-8 h-8 text-purple-600" />
          </div>
        </Card>

        <Card className="p-4 bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${stats.revenue}</p>
            </div>
            <Download className="w-8 h-8 text-green-600" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 bg-white shadow-sm mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search customers, services"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select 
            value={staffFilter}
            onChange={(e) => setStaffFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <option value="all">All Staff</option>
            <option value="Emma Wilson">Emma Wilson</option>
            <option value="Maria Garcia">Maria Garcia</option>
            <option value="David Chen">David Chen</option>
          </select>
          <Button 
            onClick={handleClearFilters}
            variant="outline" 
            className="border-gray-300"
          >
            Clear Filters
          </Button>
        </div>
      </Card>

      {/* Appointments Table */}
      <Card className="p-6 bg-white shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Appointments ({filteredAppointments.length})
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  Customer
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  Service
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  Employee
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  Date & Time
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  Duration
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  Price
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="border-b border-gray-100">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {appointment.customerName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {appointment.customerPhone}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-gray-900">{appointment.service}</p>
                    <p className="text-sm text-gray-500">First time customer</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-gray-900">{appointment.employee}</p>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-900">{appointment.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-900">{appointment.time}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-gray-900">{appointment.duration} min</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-gray-900 font-semibold">${appointment.price}</p>
                  </td>
                  <td className="py-4 px-4">
                    <Badge
                      className={
                        appointment.status === "confirmed"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : appointment.status === "pending"
                          ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                          : appointment.status === "completed"
                          ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                      }
                    >
                      {appointment.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {appointment.status === "pending" && (
                        <Button
                          onClick={() => handleConfirm(appointment.id)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          Confirm
                        </Button>
                      )}
                      {(appointment.status === "confirmed" || appointment.status === "pending") && (
                        <Button
                          onClick={() => handleComplete(appointment.id)}
                          size="sm"
                          variant="outline"
                          className="border-gray-300"
                        >
                          Complete
                        </Button>
                      )}
                      <Button
                        onClick={() => handleCancel(appointment.id)}
                        size="sm"
                        variant="outline"
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        Cancel
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}