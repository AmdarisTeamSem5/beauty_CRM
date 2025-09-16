import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="text-center py-20 bg-neutral-50">
      <p className="text-sm text-purple-600 font-medium">⭐ Trusted by 2,500+ Salons</p>
      <h1 className="text-4xl md:text-5xl font-bold mt-4">
        <span className="text-purple-600">Discover & Book</span> <br />
        Your Beauty Experience
      </h1>
      <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
        Connect with the best beauty salons and professionals in your area. Book appointments,
        discover new services, and grow your business – all in one platform.
      </p>

      {/* Search Bar */}
      <div className="mt-8 flex items-center justify-center gap-2">
        <input
          type="text"
          placeholder="Search for salons, services, or locations..."
          className="px-4 py-3 rounded-xl w-80 border shadow-sm focus:ring-2 focus:ring-purple-500"
        />
        <Button className="bg-purple-600 hover:bg-purple-700">Search</Button>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-center gap-4">
        <Button className="bg-purple-600 hover:bg-purple-700">Join Beauty Book</Button>
        <Button variant="outline">Explore Salons</Button>
      </div>

      {/* Stats */}
      <div className="mt-10 flex justify-center gap-10 text-purple-600 font-semibold">
        <div><span className="text-xl">2,500+</span><p className="text-gray-600 text-sm">Active Salons</p></div>
        <div><span className="text-xl">150K+</span><p className="text-gray-600 text-sm">Monthly Bookings</p></div>
        <div><span className="text-xl">4.9⭐</span><p className="text-gray-600 text-sm">Customer Rating</p></div>
        <div><span className="text-xl">50+</span><p className="text-gray-600 text-sm">Cities Covered</p></div>
      </div>
    </section>
  );
}
