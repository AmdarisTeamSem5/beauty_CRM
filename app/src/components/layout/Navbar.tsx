"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-screen border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 -mx-42">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        
        {/* Logo */}
        <div className="text-xl font-bold text-purple-600">✨ Beauty Book</div>

        {/* Search
        <div className="hidden md:flex items-center gap-2">
          <input
            type="text"
            placeholder="Search salons..."
            className="px-3 py-2 rounded-lg border text-sm w-64 focus:ring-2 focus:ring-purple-500"
          />
        </div> */}

        {/* Desktop Sign In */}
        <div className="hidden md:block">
          <Button variant="outline" className="text-sm">Sign In</Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <Menu className="h-6 w-6 text-purple-600" />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden border-t bg-white px-4 py-3 space-y-3">
          <input
            type="text"
            placeholder="Search salons..."
            className="px-3 py-2 rounded-lg border text-sm w-full focus:ring-2 focus:ring-purple-500"
          />
          <Button variant="outline" className="w-full text-sm">Sign In</Button>
        </div>
      )}
    </header>
  );
}
