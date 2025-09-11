'use client';

import SalonsFilters from '../../components/layout/salons/filter';

export default function SalonsPage() {
  return (
    <div className="min-h-screen w-full bg-white flex">
      <div className="p-6">
        <SalonsFilters />
      </div>
    </div>
  );
}