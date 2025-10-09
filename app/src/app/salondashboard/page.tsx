
"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/salondashboard/dashboardHeader";
import { DashboardNav } from "@/components/salondashboard/dashboardNav";
import { StatsGrid } from "@/components/salondashboard/statsGrid";
import { PerformanceMetrics } from "@/components/salondashboard/performanceMetrics";
import { WeekHighlights } from "@/components/salondashboard/weekHighlights";
import { QuickStats } from "@/components/salondashboard/quickStats";
import { QuickActions } from "@/components/salondashboard/quickActions";
import { ServicesView } from "@/components/salondashboard/views/servicesView";
import { StaffView } from "@/components/salondashboard/views/staffView";
import { AppointmentsView } from "@/components/salondashboard/views/appointmentsView";
import { ProfileView } from "@/components/salondashboard/views/profileView";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "services" | "staff" | "appointments" | "profile"
  >("overview");

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
              <p className="text-sm text-gray-500">Last updated: 10/3/2025</p>
            </div>

            <StatsGrid />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <PerformanceMetrics />
              <WeekHighlights />
              <QuickStats />
            </div>

            <QuickActions />
          </>
        );
      case "services":
        return <ServicesView />;
      case "staff":
        return <StaffView />;
      case "appointments":
        return <AppointmentsView />;
      case "profile":
        return <ProfileView />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <DashboardNav activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {renderContent()}
      </div>
    </div>
  );
}