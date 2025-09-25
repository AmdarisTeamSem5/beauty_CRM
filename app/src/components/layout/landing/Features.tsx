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
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4">
            Everything You Need to{" "}
            <span className="text-purple-600 relative">
              Scale
              {/* Optional decorative underline */}
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-purple-200 hidden sm:block"
                viewBox="0 0 100 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 10C20 2, 40 2, 60 6C80 10, 90 8, 98 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
            From booking to analytics, we've got your salon covered.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-0 shadow-md bg-white"
            >
              <CardHeader className="pb-4">
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors duration-300">
                    <feature.icon className="text-purple-600 w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                </div>
                <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900 leading-tight">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                  {feature.desc}
                </p>
                
                <ul className="space-y-3">
                  {feature.points.map((point, pointIndex) => (
                    <li 
                      key={point}
                      className="flex items-start gap-3 text-sm sm:text-base text-gray-700"
                    >
                      <span className="inline-flex items-center justify-center w-5 h-5 bg-green-100 rounded-full flex-shrink-0 mt-0.5">
                        <svg 
                          className="w-3 h-3 text-green-600" 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path 
                            fillRule="evenodd" 
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                            clipRule="evenodd" 
                          />
                        </svg>
                      </span>
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Optional CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <p className="text-sm sm:text-base text-gray-500 mb-4">
            Ready to transform your salon business?
          </p>
          <button className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700 transition-colors">
            Learn more about our features
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}