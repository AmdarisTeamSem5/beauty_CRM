export async function fetchSalons(filters: {
    services: string[];
    priceRange: string | null;
  }) {
    const params = new URLSearchParams();
  
    if (filters.services.length > 0) {
      params.append("services", filters.services.join(","));
    }
    if (filters.priceRange) {
      params.append("priceRange", filters.priceRange);
    }
  
    const res = await fetch(`/api/salons?${params.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch salons");
  
    return res.json();
  }
  