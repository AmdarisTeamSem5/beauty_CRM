import { salonService } from "./api/salons";

export interface SalonFilters {
  services: string[];
  priceRange: string | null;
}

export async function fetchSalons(filters: SalonFilters) {
  try {
    // Convert filters to backend query parameters
    const params: any = {};
    
    if (filters.services.length > 0) {
      // Note: Backend expects different parameter format, adjust as needed
      params.services = filters.services.join(",");
    }
    if (filters.priceRange) {
      params.priceRange = filters.priceRange;
    }

    const salons = await salonService.getAll(params);
    return { salons };
  } catch (error) {
    console.error("Failed to fetch salons:", error);
    throw error;
  }
}
  