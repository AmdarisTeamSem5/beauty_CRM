"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Users,
  LayoutDashboard,
  Sparkles,
  User,
  Settings,
  LogOut,
  Bell,
  Menu,
  Search,
} from "lucide-react";
import { useState } from "react";

const navigation = [
  { name: "Home", href: "/", icon: Sparkles },
  { name: "Salons", href: "/salons", icon: Users },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
];

export default function NavBar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-screen border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 -mx-42">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center space-x-3">
          <Link key="landing-redirect" href="/">
            <div className="text-xl font-bold text-purple-600 flex items-center gap-2">
              ✨ Beauty Book
            </div>
          </Link>
          <span className="hidden sm:block text-xs text-muted-foreground border-l pl-3 ml-3">
            CRM System
          </span>
        </div>

        <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search salons, appointments..."
              className="pl-10 pr-4 py-2 rounded-lg border text-sm w-full focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 text-sm",
                    isActive &&
                      "bg-purple-100 text-purple-700 hover:bg-purple-100"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Right side actions */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
            >
              3
            </Badge>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="User" />
                  <AvatarFallback>SA</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Salon Admin
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    admin@beautybook.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-6 w-6 text-purple-600" />
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white px-4 py-3 space-y-3">
          {/* Mobile Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search salons, appointments..."
              className="pl-10 pr-4 py-2 rounded-lg border text-sm w-full focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Mobile Navigation */}
          <div className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start space-x-2",
                      isActive && "bg-purple-100 text-purple-700"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Mobile User Actions */}
          <div className="pt-2 border-t space-y-2">
            <Button variant="ghost" className="w-full justify-start space-x-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
              <Badge variant="destructive" className="ml-auto">
                3
              </Badge>
            </Button>
            <Button variant="ghost" className="w-full justify-start space-x-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start space-x-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start space-x-2 text-red-600"
            >
              <LogOut className="h-4 w-4" />
              <span>Log out</span>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
