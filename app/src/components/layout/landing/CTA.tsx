import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
          Ready to <span className="text-purple-600">Transform</span> Your Salon?
        </h2>
        
        <p className="text-gray-600 text-base sm:text-lg mt-4 sm:mt-6 max-w-2xl mx-auto leading-relaxed">
          Join thousands of salons using SalonCRM to streamline operations and grow their business.
        </p>
        
        <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
          <Button 
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Start Your Free Trial
          </Button>
          
          <p className="text-xs sm:text-sm text-gray-500">
            Get approved in 24–48 hours
          </p>
        </div>
      </div>
    </section>
  );
}