const steps = [
  { num: "1", title: "Register Your Salon", desc: "Fill in your salon details and services." },
  { num: "2", title: "Get Verified", desc: "Our team reviews your registration in 24–48h." },
  { num: "3", title: "Start Growing", desc: "Manage bookings, customers, and insights." },
];

export function Steps() {
  return (
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-purple-50 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-10 lg:mb-12">
          Get Started in <span className="text-purple-600">3 Simple Steps</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {steps.map((step) => (
            <div key={step.num} className="p-6 sm:p-8 bg-white rounded-xl shadow-md">
              <div className="text-purple-600 font-bold text-3xl sm:text-2xl mb-3 sm:mb-2">
                {step.num}
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-1">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}