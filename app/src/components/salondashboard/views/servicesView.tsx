"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign, Edit, Trash2 } from "lucide-react";

interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  duration: number;
  price: number;
  status: "active" | "inactive";
}

const mockServices: Service[] = [
  {
    id: "1",
    name: "Hair Cut & Style",
    description: "Professional haircut with styling",
    category: "Hair",
    duration: 60,
    price: 75,
    status: "active",
  },
  {
    id: "2",
    name: "Hair Color",
    description: "Full hair coloring service",
    category: "Hair",
    duration: 120,
    price: 150,
    status: "active",
  },
  {
    id: "3",
    name: "Gel Manicure",
    description: "Long-lasting gel manicure",
    category: "Nails",
    duration: 45,
    price: 35,
    status: "active",
  },
  {
    id: "4",
    name: "Facial Treatment",
    description: "Deep cleansing facial treatment",
    category: "Skincare",
    duration: 75,
    price: 95,
    status: "inactive",
  },
];

export function ServicesView() {
  const [services, setServices] = useState<Service[]>(mockServices);

  const handleEdit = (serviceId: string) => {
    console.log("Edit service:", serviceId);
  };

  const handleDelete = (serviceId: string) => {
    console.log("Delete service:", serviceId);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Service Management</h2>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          + Add New Service
        </Button>
      </div>

      <Card className="p-6 bg-white shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          All Services ({services.length})
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  Service
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  Category
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
              {services.map((service) => (
                <tr key={service.id} className="border-b border-gray-100">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {service.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {service.description}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 text-gray-700 hover:bg-gray-100"
                    >
                      {service.category}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock className="w-4 h-4" />
                      <span>{service.duration} min</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1 text-gray-900 font-semibold">
                      <DollarSign className="w-4 h-4" />
                      <span>{service.price}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge
                      className={
                        service.status === "active"
                          ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-100"
                      }
                    >
                      {service.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(service.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-gray-600" />
                      </button>
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