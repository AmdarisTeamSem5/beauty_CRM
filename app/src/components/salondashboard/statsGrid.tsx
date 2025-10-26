"use client";

import { Card } from "@/components/ui/card";
import {
  Calendar,
  DollarSign,
  Users,
  Star,
  TrendingUp,
  Scissors,
  UserCheck,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: React.ElementType;
}

function StatCard({ title, value, change, icon: Icon }: StatCardProps) {
  return (
    <Card className="p-6 bg-white shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
          <div className="flex items-center gap-1 text-sm text-green-600">
            <span>↗</span>
            <span>{change} from last week</span>
          </div>
        </div>
        <div className="p-3 bg-purple-50 rounded-lg">
          <Icon className="w-6 h-6 text-purple-600" />
        </div>
      </div>
    </Card>
  );
}

export function StatsGrid() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Today's Appointments"
          value="12"
          change="+8.5%"
          icon={Calendar}
        />
        <StatCard
          title="Weekly Revenue"
          value="$3,450"
          change="+12.5%"
          icon={DollarSign}
        />
        <StatCard
          title="Total Customers"
          value="156"
          change="+5.2%"
          icon={Users}
        />
        <StatCard
          title="Average Rating"
          value="4.8/5"
          change="+2.1%"
          icon={Star}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Monthly Revenue"
          value="$14,200"
          change="+15.3%"
          icon={TrendingUp}
        />
        <StatCard
          title="Completed Services"
          value="89"
          change="+7.8%"
          icon={Scissors}
        />
        <Card className="p-6 bg-white shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Active Services</p>
              <p className="text-3xl font-bold text-gray-900">24</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Scissors className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-white shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Staff Members</p>
              <p className="text-3xl font-bold text-gray-900">6</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <UserCheck className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}