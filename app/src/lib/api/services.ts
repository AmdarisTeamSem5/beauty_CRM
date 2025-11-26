import { apiCall } from "./config";

export interface SalonService {
  id: string;
  salonId: string;
  specialistId: string;
  type: number;
  name: string;
  description: string;
  durationMinutes: number;
  priceMDL: number;
}

export interface CreateSalonServiceDto {
  type: number;
  name: string;
  description: string;
  salonId: string;
  specialistId: string;
  durationMinutes: number;
  priceMDL: number;
}

export interface UpdateSalonServiceDto {
  type?: number;
  name?: string;
  description?: string;
  salonId?: string;
  specialistId?: string;
  durationMinutes?: number;
  priceMDL?: number;
}

class SalonServiceService {
  private baseUrl = "SalonService";

  async getAll(): Promise<SalonService[]> {
    return apiCall<SalonService[]>(this.baseUrl, {
      method: "GET",
    });
  }

  async getById(id: string): Promise<SalonService> {
    return apiCall<SalonService>(`${this.baseUrl}/${id}`, {
      method: "GET",
    });
  }

  async create(id: string, data: CreateSalonServiceDto): Promise<string> {
    return apiCall<string>(`${this.baseUrl}/${id}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async update(id: string, data: UpdateSalonServiceDto): Promise<void> {
    return apiCall<void>(`${this.baseUrl}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async delete(id: string): Promise<void> {
    return apiCall<void>(`${this.baseUrl}/${id}`, {
      method: "DELETE",
    });
  }
}

export const salonServiceService = new SalonServiceService();
