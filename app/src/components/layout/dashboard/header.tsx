"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings, Plus } from "lucide-react";
import Link from "next/link";

interface HeaderLayoutProps {
  userName?: string;
  userInitials?: string;
  avatarSrc?: string;
  subtitle?: string;
  secondaryButtonText?: string;
  secondaryButtonAction?: () => void;
}

export default function HeaderLayout({
  userName = "",
  userInitials = "",
  avatarSrc,
  subtitle = "",
  secondaryButtonText = "",
  secondaryButtonAction,
}: HeaderLayoutProps) {
  return (
    <div className="w-full bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12 ring-2 ring-purple-100">
              {avatarSrc && <AvatarImage src={avatarSrc} alt={userName} />}
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-purple-600 text-white font-semibold">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {userName}
              </h1>
              <p className="text-sm text-gray-500">{subtitle}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Link href="/book">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg hover:cursor-pointer"
              >
                <Plus className="h-4 w-4 mr-2" /> Book Appointment
              </Button>
            </Link>

            {secondaryButtonText && (
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600"
                onClick={secondaryButtonAction}
              >
                <Settings className="h-4 w-4 mr-2" />
                {secondaryButtonText}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
