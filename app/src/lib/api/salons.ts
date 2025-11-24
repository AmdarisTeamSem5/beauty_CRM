import { apiCall, getApiUrl } from "./config";

export interface Salon {
  id: string;
  ownerId: string;
  name: string;
  rating: number;
  band: number;
  description: string;
  address: string;
  region: number;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSalonDto {
  ownerId: string;
  name: string;
  rating: number;
  description: string;
  address: string;
  region: number;
  phone: string;
  email: string;
  dateTime: string;
  ratingCount: number;
}

export interface SalonQueryParams {
  orderBy?: string;
  ownerId?: string;
  band?: number; // 1-3
  excludeSalonsWithNoService?: boolean;
  desc?: boolean;
}

class SalonService {
  private baseUrl = "Salon";

  async getAll(params?: SalonQueryParams): Promise<Salon[]> {
    const queryString = params
      ? "?" +
        new URLSearchParams(
          Object.entries(params).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== null) {
              acc[key] = String(value);
            }
            return acc;
          }, {} as Record<string, string>)
        ).toString()
      : "";

    return apiCall<Salon[]>(`${this.baseUrl}${queryString}`, {
      method: "GET",
    });
  }

  async getById(id: string): Promise<Salon> {
    return apiCall<Salon>(`${this.baseUrl}/${id}`, {
      method: "GET",
    });
  }

  async create(data: CreateSalonDto): Promise<string> {
    return apiCall<string>(this.baseUrl, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}

export const salonService = new SalonService();

