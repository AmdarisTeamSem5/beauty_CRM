import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-20 bg-white text-center">
      <h2 className="text-3xl font-bold">
        Ready to <span className="text-purple-600">Transform</span> Your Salon?
      </h2>
      <p className="text-gray-600 mt-2">
        Join thousands of salons using SalonCRM to streamline operations and grow their business.
      </p>
      <Button className="mt-6 bg-purple-600 hover:bg-purple-700">
        Start Your Free Trial
      </Button>
      <p className="text-xs text-gray-500 mt-2">Get approved in 24–48 hours</p>
    </section>
  );
}
