import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, BarChart3 } from "lucide-react";

const features = [
  {
    title: "Smart Salon Management",
    desc: "Comprehensive profiles with service management, staff scheduling, and availability tracking.",
    icon: Users,
    points: ["Service & pricing management", "Staff & schedule coordination", "Customer profile management"],
  },
  {
    title: "Advanced Booking System",
    desc: "Streamlined appointment scheduling with reminders and waitlist management.",
    icon: Calendar,
    points: ["Real-time availability sync", "Automated SMS & email reminders", "Waitlist & cancellation management"],
  },
  {
    title: "Business Analytics",
    desc: "Detailed insights and performance metrics to grow your business.",
    icon: BarChart3,
    points: ["Revenue & booking analytics", "Customer retention insights", "Performance benchmarking"],
  },
];

export function Features() {
  return (
    <section className="py-20 bg-white text-center">
      <h2 className="text-3xl font-bold">
        Everything You Need to <span className="text-purple-600">Scale</span>
      </h2>
      <p className="text-gray-600 mt-2">From booking to analytics, we’ve got your salon covered.</p>

      <div className="grid md:grid-cols-3 gap-6 mt-10 max-w-6xl mx-auto">
        {features.map((f) => (
          <Card key={f.title} className="p-6 text-left shadow-md">
            <CardHeader>
              <f.icon className="text-purple-600 w-8 h-8 mb-2" />
              <CardTitle>{f.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">{f.desc}</p>
              <ul className="mt-4 space-y-1 text-sm text-gray-700">
                {f.points.map((p) => (
                  <li key={p}>✅ {p}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
