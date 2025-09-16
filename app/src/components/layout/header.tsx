"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings, Plus } from "lucide-react";

interface HeaderLayoutProps {
  userName?: string;
  userInitials?: string;
  avatarSrc?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonAction?: () => void;
  secondaryButtonText?: string;
  secondaryButtonAction?: () => void;
}

export default function HeaderLayout({
  userName = "",
  userInitials = "",
  avatarSrc,
  subtitle = "",
  primaryButtonText = "",
  primaryButtonAction,
  secondaryButtonText = "",
  secondaryButtonAction
}: HeaderLayoutProps) {
  return (
    <div className="w-full bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={avatarSrc} alt={userName} />
              <AvatarFallback className="bg-gray-200 text-gray-600">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {userName}
              </h1>
              <p className="text-sm text-gray-500">
                {subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {primaryButtonText && (
              <Button 
                className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg"
                onClick={primaryButtonAction}
              >
                <Plus className="h-4 w-4 mr-2" />
                {primaryButtonText}
              </Button>
            )}
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