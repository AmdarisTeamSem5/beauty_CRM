'use client';

import SalonsFilters from '../../components/ui/filter';

export default function DiscoveryPage() {
  return (
    <div className="min-h-screen w-full bg-white flex">
      <div className="p-6">
        <SalonsFilters />
      </div>
    </div>
  );
}