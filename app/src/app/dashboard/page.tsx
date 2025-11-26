"use client";

import React, { useState, useEffect } from "react";
import HeaderLayout from "@/components/layout/dashboard/header";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/ui/combobox";
import { Calendar, Clock, MapPin, Star, Search, Filter, Loader2 } from "lucide-react";
import { AppointmentsView } from "@/components/layout/dashboard/appointmentsView";
import { userService } from "@/lib/api/users";
import { appointmentService } from "@/lib/api/appointments";
import type { User } from "@/lib/api/users";
import type { Appointment } from "@/lib/api/appointments";

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [user, setUser] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    upcoming: 0,
    completed: 0,
    favoriteSalons: 0,
    avgRating: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch current user
        const currentUser = await userService.getCurrent();
        setUser(currentUser);
        
        // Fetch appointments
        const appointmentsData = await appointmentService.getAll();
        setAppointments(appointmentsData);
        
        // Calculate stats
        const now = new Date();
        const upcoming = appointmentsData.filter(
          (a) => new Date(a.appointmentDate) >= now
        ).length;
        const completed = appointmentsData.filter(
          (a) => new Date(a.appointmentDate) < now
        ).length;
        
        setStats({
          upcoming,
          completed,
          favoriteSalons: 0, // TODO: Implement favorite salons
          avgRating: 0, // TODO: Calculate from salon ratings
        });
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "upcoming", label: "Upcoming" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const getUserInitials = () => {
    if (!user) return "U";
    return `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() || "U";
  };

  const getUserName = () => {
    if (!user) return "Welcome!";
    return `Welcome back, ${user.firstName} ${user.lastName}!`;
  };

  const handleProfile = () => {
    console.log("Profile clicked");
    // TODO: Navigate to profile page
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderLayout
        userName={getUserName()}
        userInitials={getUserInitials()}
        subtitle="Manage your beauty appointments"
        secondaryButtonText="Profile"
        secondaryButtonAction={handleProfile}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Upcoming</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.upcoming}</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Completed</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.completed}</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Favorite Salons</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.favoriteSalons}</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Avg Rating</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.avgRating > 0 ? stats.avgRating.toFixed(1) : "—"}
                  </p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search appointments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-0 shadow-none focus-visible:ring-0"
              />
            </div>

            <div className="hidden sm:block h-6 w-px bg-gray-200"></div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
              <Filter className="h-4 w-4 text-gray-400" />
              <Combobox
                options={statusOptions}
                value={statusFilter}
                onValueChange={setStatusFilter}
                placeholder="All Status"
                width="w-32"
              />
            </div>
          </div>
        </div>

        <AppointmentsView />
      </div>
    </div>
  );
}
