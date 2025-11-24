"use client";

import React from "react";

import { useState } from "react";
import { Scissors, User, Calendar, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const steps = [
  {
    id: 1,
    title: "Service Type",
    description: "Choose your beauty service",
    icon: Scissors,
  },
  {
    id: 2,
    title: "Specialist",
    description: "Select your preferred specialist",
    icon: User,
  },
  {
    id: 3,
    title: "Date & Time",
    description: "Pick your appointment slot",
    icon: Calendar,
  },
  {
    id: 4,
    title: "Confirmation",
    description: "Review and confirm booking",
    icon: CheckCircle,
  },
];

const serviceTypes = [
  { id: 1, name: "Hair Cut & Styling", duration: "60 min", price: "$65" },
  { id: 2, name: "Hair Color", duration: "120 min", price: "$120" },
  { id: 3, name: "Manicure", duration: "45 min", price: "$35" },
  { id: 4, name: "Pedicure", duration: "60 min", price: "$45" },
  { id: 5, name: "Facial Treatment", duration: "90 min", price: "$85" },
  { id: 6, name: "Eyebrow Shaping", duration: "30 min", price: "$25" },
];

const specialists = [
  {
    id: 1,
    name: "Maria Rodriguez",
    specialty: "Hair Specialist",
    rating: 4.9,
    image: "/specialist1.png",
  },
  {
    id: 2,
    name: "Elena Popescu",
    specialty: "Nail Artist",
    rating: 4.8,
    image: "/specialist2.png",
  },
  {
    id: 3,
    name: "Ana Ionescu",
    specialty: "Skincare Expert",
    rating: 4.9,
    image: "/specialist3.png",
  },
  {
    id: 4,
    name: "Sofia Dumitrescu",
    specialty: "Beauty Specialist",
    rating: 4.7,
    image: "/specialist4.png",
  },
];

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
];

export default function BookingProcess() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<
    (typeof serviceTypes)[0] | null
  >(null);
  const [selectedSpecialist, setSelectedSpecialist] = useState<
    (typeof specialists)[0] | null
  >(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedService !== null;
      case 2:
        return selectedSpecialist !== null;
      case 3:
        return selectedDate && selectedTime;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleNewBooking = async () => {
    if (!selectedService || !selectedSpecialist || !selectedDate || !selectedTime) {
      alert("Please complete all booking steps");
      return;
    }

    try {
      const { appointmentService } = await import("@/lib/api/appointments");
      const { salonService } = await import("@/lib/api/salons");
      const { salonServiceService } = await import("@/lib/api/services");

      // Get salons to find a salon ID (in a real app, this would come from context or selection)
      const salons = await salonService.getAll();
      if (salons.length === 0) {
        alert("No salons available. Please try again later.");
        return;
      }

      // Get services to find the service ID
      const services = await salonServiceService.getAll();
      const matchingService = services.find(
        (s: { name: string; id: string }) => s.name.toLowerCase().includes(selectedService.name.toLowerCase())
      );

      if (!matchingService) {
        alert("Service not found. Please try again.");
        return;
      }

      // Combine date and time
      const [datePart] = selectedDate.split("T");
      const [time, period] = selectedTime.split(" ");
      const [hours, minutes] = time.split(":");
      let hour24 = parseInt(hours);
      if (period === "PM" && hour24 !== 12) hour24 += 12;
      if (period === "AM" && hour24 === 12) hour24 = 0;

      const appointmentDateTime = new Date(
        `${datePart}T${hour24.toString().padStart(2, "0")}:${minutes}:00`
      );

      // Create appointment
      const appointmentData = {
        clientId: "00000000-0000-0000-0000-000000000000", // TODO: Get from authenticated user
        salonServiceId: matchingService.id,
        salonId: salons[0].id, // Use first available salon
        appointmentDate: appointmentDateTime.toISOString(),
        confirmed: false,
        specialistId: String(selectedSpecialist.id), // Convert to string
      };

      const appointmentId = await appointmentService.create(appointmentData);
      console.log("Appointment created:", appointmentId);

      alert("Appointment booked successfully!");
      router.push("/dashboard");

    } catch (error) {
      console.error("Failed to create booking:", error);
    }
  }

  return (
    <section className="py-20 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-2 mb-12">
          <h3 className="text-purple-600 font-semibold text-3xl">Book Your Appointment</h3>
          <p className="text-md text-gray-600 max-w-2xl mx-auto">
            Follow these simple steps to schedule your beauty appointment
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = currentStep > step.id;
              const isCurrent = currentStep === step.id;

              return (
                <div key={step.id} className="flex items-center w-full ml-14">
                  <div className="flex flex-col items-center">
                    <div
                      className={`
                      w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300
                      ${
                        isCompleted
                          ? "bg-purple-600 border-purple-600 text-white"
                          : isCurrent
                          ? "border-purple-600 text-purple-600 bg-white"
                          : "border-gray-300 text-gray-400 bg-white"
                      }
                    `}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-center mt-3">
                      <div
                        className={`text-sm font-medium ${
                          isCurrent ? "text-purple-600" : "text-gray-600"
                        }`}
                      >
                        {step.title}
                      </div>
                      <div className="text-xs text-gray-600 mt-1 max-w-24">
                        {step.description}
                      </div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`
                      flex-1 h-0.5 mx-4 transition-all duration-300
                      ${isCompleted ? "bg-purple-600" : "bg-gray-300"}
                    `}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {React.createElement(steps[currentStep - 1].icon, {
                  className: "h-5 w-5 text-purple-600",
                })}
                {steps[currentStep - 1].title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Service Type Selection */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h4 className="font-medium">Choose your service:</h4>
                  <div className="grid gap-3">
                    {serviceTypes.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => setSelectedService(service)}
                        className={`
                          p-4 rounded-lg text-left transition-all duration-200 border
                          ${
                            selectedService?.id === service.id
                              ? "bg-purple-50 border-purple-600 text-purple-600"
                              : "bg-white hover:bg-purple-50 border-gray-200"
                          }
                        `}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{service.name}</div>
                            <div className="text-sm text-gray-600">
                              {service.duration}
                            </div>
                          </div>
                          <div className="font-semibold">{service.price}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Specialist Selection */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h4 className="font-medium">Select your specialist:</h4>
                  <div className="grid gap-3">
                    {specialists.map((specialist) => (
                      <button
                        key={specialist.id}
                        onClick={() => setSelectedSpecialist(specialist)}
                        className={`
                          p-4 rounded-lg text-left transition-all duration-200 border
                          ${
                            selectedSpecialist?.id === specialist.id
                              ? "bg-purple-50 border-purple-600"
                              : "bg-white hover:bg-purple-50 border-gray-200"
                          }
                        `}
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={specialist.image || "/placeholder.svg"}
                            alt={specialist.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="font-medium">{specialist.name}</div>
                            <div className="text-sm text-gray-600">
                              {specialist.specialty}
                            </div>
                          </div>
                          <div className="text-sm">⭐ {specialist.rating}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Date & Time Selection */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  {/* Date Selection */}
                  <div>
                    <h4 className="font-medium mb-3">Choose Date</h4>
                    <div className="grid grid-cols-7 gap-2">
                      {Array.from({ length: 14 }, (_, i) => {
                        const date = new Date();
                        date.setDate(date.getDate() + i);
                        const dateStr = date.toISOString().split("T")[0];
                        const dayName = date.toLocaleDateString("en-US", {
                          weekday: "short",
                        });
                        const dayNum = date.getDate();

                        return (
                          <button
                            key={dateStr}
                            onClick={() => setSelectedDate(dateStr)}
                            className={`
                              p-3 rounded-lg text-center transition-all duration-200 border
                              ${
                                selectedDate === dateStr
                                  ? "bg-purple-600 text-white border-purple-600"
                                  : "bg-white hover:bg-purple-50 border-gray-200"
                              }
                            `}
                          >
                            <div className="text-xs font-medium">{dayName}</div>
                            <div className="text-sm">{dayNum}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Selection */}
                  {selectedDate && (
                    <div>
                      <h4 className="font-medium mb-3">Available Times</h4>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`
                              p-3 rounded-lg text-sm font-medium transition-all duration-200 border
                              ${
                                selectedTime === time
                                  ? "bg-purple-600 text-white border-purple-600"
                                  : "bg-white hover:bg-purple-50 border-gray-200"
                              }
                            `}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Confirmation */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h4 className="font-medium">Booking Summary</h4>
                  <div className="p-6 bg-purple-50 rounded-lg space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service:</span>
                      <span className="font-medium">
                        {selectedService?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Specialist:</span>
                      <span className="font-medium">
                        {selectedSpecialist?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">
                        {selectedDate &&
                          new Date(selectedDate).toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                          })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">
                        {selectedService?.duration}
                      </span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total:</span>
                        <span>{selectedService?.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-3 pt-4">
                {currentStep > 1 && (
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="flex-1 bg-transparent"
                  >
                    Back
                  </Button>
                )}
                {currentStep < 4 ? (
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                  >
                    {currentStep === 3 ? "Review Booking" : "Next"}
                  </Button>
                ) : (
                  <Button
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                    size="lg"
                    onClick={handleNewBooking}
                  >
                    Confirm Booking
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
