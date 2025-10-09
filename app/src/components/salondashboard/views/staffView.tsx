"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Clock, Star } from "lucide-react";

interface StaffMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  rating: number;
  reviewCount: number;
  email: string;
  phone: string;
  experience: string;
  specialties: string[];
  schedule: string[];
  bio: string;
  status: "active" | "inactive";
}

const mockStaff: StaffMember[] = [
  {
    id: "1",
    name: "Emma Wilson",
    role: "Hair Stylist",
    initials: "EW",
    rating: 4.9,
    reviewCount: 156,
    email: "emma@luxebeauty.com",
    phone: "(555) 234-5678",
    experience: "8 years experience",
    specialties: ["Hair Cut", "Hair Color", "Styling"],
    schedule: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    bio: "Expert hair stylist with 8 years of experience specializing in modern cuts and color techniques.",
    status: "active",
  },
  {
    id: "2",
    name: "Maria Garcia",
    role: "Nail Technician",
    initials: "MG",
    rating: 4.8,
    reviewCount: 98,
    email: "maria@luxebeauty.com",
    phone: "(555) 345-6789",
    experience: "5 years experience",
    specialties: ["Gel Manicure", "Nail Art", "Pedicure"],
    schedule: ["Tue", "Wed", "Thu", "Fri", "Sat"],
    bio: "Professional nail technician with a passion for creative nail art and perfect finishes.",
    status: "active",
  },
  {
    id: "3",
    name: "David Chen",
    role: "Massage Therapist",
    initials: "DC",
    rating: 4.7,
    reviewCount: 87,
    email: "david@luxebeauty.com",
    phone: "(555) 456-7890",
    experience: "6 years experience",
    specialties: ["Deep Tissue", "Swedish", "Hot Stone"],
    schedule: ["Mon", "Wed", "Fri", "Sat", "Sun"],
    bio: "Licensed massage therapist specializing in therapeutic and relaxation techniques.",
    status: "active",
  },
];

export function StaffView() {
  const [staff, setStaff] = useState<StaffMember[]>(mockStaff);

  const handleEdit = (staffId: string) => {
    console.log("Edit staff:", staffId);
  };

  const handleDeactivate = (staffId: string) => {
    console.log("Deactivate staff:", staffId);
  };

  const handleDelete = (staffId: string) => {
    console.log("Delete staff:", staffId);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Staff Management</h2>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          + Add Staff Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map((member) => (
          <Card key={member.id} className="p-6 bg-white shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xl font-semibold text-gray-600">
                    {member.initials}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(member.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-xs text-gray-600 ml-1">
                      ({member.rating})
                    </span>
                  </div>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                {member.status}
              </Badge>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{member.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{member.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{member.experience}</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Specialties:
              </p>
              <div className="flex flex-wrap gap-2">
                {member.specialties.map((specialty, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-gray-100 text-gray-700 text-xs hover:bg-gray-100"
                  >
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Schedule:
              </p>
              <div className="flex gap-2">
                {member.schedule.map((day, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-purple-100 text-purple-700 text-xs hover:bg-purple-100"
                  >
                    {day}
                  </Badge>
                ))}
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">{member.bio}</p>

            <div className="flex items-center gap-2">
              <Button
                onClick={() => handleEdit(member.id)}
                variant="outline"
                size="sm"
                className="flex-1 border-gray-300"
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDeactivate(member.id)}
                variant="outline"
                size="sm"
                className="flex-1 border-gray-300"
              >
                Deactivate
              </Button>
              <button
                onClick={() => handleDelete(member.id)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                🗑️
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}