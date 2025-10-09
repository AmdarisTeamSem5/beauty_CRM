"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SalonProfile {
  salonName: string;
  owner: string;
  email: string;
  phone: string;
  address: string;
  description: string;
}

const mockProfile: SalonProfile = {
  salonName: "Luxe Beauty Studio",
  owner: "Sarah Martinez",
  email: "sarah@luxebeauty.com",
  phone: "(555) 123-4567",
  address: "123 Main Street, New York, NY 10001",
  description:
    "Premier beauty salon offering luxury hair, nail, and spa services",
};

export function ProfileView() {
  const handleEditProfile = () => {
    console.log("Edit profile");
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Salon Profile</h2>
      </div>

      <Card className="p-8 bg-white shadow-sm max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Salon Name
            </label>
            <p className="text-gray-900">{mockProfile.salonName}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <p className="text-gray-900">{mockProfile.address}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Owner
            </label>
            <p className="text-gray-900">{mockProfile.owner}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <p className="text-gray-900">{mockProfile.description}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <p className="text-gray-900">{mockProfile.email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <p className="text-gray-900">{mockProfile.phone}</p>
          </div>
        </div>

        <div className="mt-8">
          <Button
            onClick={handleEditProfile}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Edit Profile
          </Button>
        </div>
      </Card>
    </div>
  );
}