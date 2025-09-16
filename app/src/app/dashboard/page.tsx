"use client";

import React, { useState } from 'react';
import HeaderLayout from '@/components/layout/header';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/ui/combobox";
import { Calendar, Clock, MapPin, Star, Search, Filter } from 'lucide-react';

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); 

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "upcoming", label: "Upcoming" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" }
  ];

  const handleBookAppointment = () => {
    console.log('Book appointment clicked');
  };

  const handleProfile = () => {
    console.log('Profile clicked');
  };

  return (
    <div className="min-h-screen bg-[#efede8]">
      <HeaderLayout 
        userName="Welcome back, Sarah Johnson!"
        userInitials="SJ"
        avatarSrc="/placeholder-avatar.jpg"
        subtitle="Manage your beauty appointments"
        primaryButtonText="Book Appointment"
        primaryButtonAction={handleBookAppointment}
        secondaryButtonText="Profile"
        secondaryButtonAction={handleProfile}
      />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Upcoming</p>
                  <p className="text-3xl font-bold text-gray-900">2</p>
                </div>
                <div className="p-3 bg-pink-50 rounded-lg">
                  <Calendar className="h-6 w-6 text-pink-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Completed</p>
                  <p className="text-3xl font-bold text-gray-900">3</p>
                </div>
                <div className="p-3 bg-pink-50 rounded-lg">
                  <Clock className="h-6 w-6 text-pink-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Favorite Salons</p>
                  <p className="text-3xl font-bold text-gray-900">5</p>
                </div>
                <div className="p-3 bg-pink-50 rounded-lg">
                  <MapPin className="h-6 w-6 text-pink-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Avg Rating</p>
                  <p className="text-3xl font-bold text-gray-900">4.8</p>
                </div>
                <div className="p-3 bg-pink-50 rounded-lg">
                  <Star className="h-6 w-6 text-pink-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search appointments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-0 shadow-none focus-visible:ring-0"
              />
            </div>

            <div className="h-6 w-px bg-gray-200"></div>

            <div className="flex items-center gap-2">
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
      </div>
    </div>
  );
}