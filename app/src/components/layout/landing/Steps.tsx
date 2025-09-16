const steps = [
    { num: "1", title: "Register Your Salon", desc: "Fill in your salon details and services." },
    { num: "2", title: "Get Verified", desc: "Our team reviews your registration in 24–48h." },
    { num: "3", title: "Start Growing", desc: "Manage bookings, customers, and insights." },
  ];
  
  export function Steps() {
    return (
      <section className="py-20 bg-purple-50 text-center">
        <h2 className="text-3xl font-bold">Get Started in <span className="text-purple-600">3 Simple Steps</span></h2>
        <div className="grid md:grid-cols-3 gap-6 mt-10 max-w-4xl mx-auto">
          {steps.map((s) => (
            <div key={s.num} className="p-6 bg-white rounded-xl shadow-md">
              <div className="text-purple-600 font-bold text-2xl">{s.num}</div>
              <h3 className="font-semibold mt-2">{s.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  