"use client";

interface DashboardNavProps {
  activeTab: "overview" | "services" | "staff" | "appointments" | "profile";
  setActiveTab: (
    tab: "overview" | "services" | "staff" | "appointments" | "profile"
  ) => void;
}

export function DashboardNav({ activeTab, setActiveTab }: DashboardNavProps) {
  const tabs = [
    { id: "overview", label: " Overview" },
    { id: "services", label: " Services" },
    { id: "staff", label: " Staff" },
    { id: "appointments", label: " Appointments" },
    { id: "profile", label: " Profile" },
  ] as const;

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}