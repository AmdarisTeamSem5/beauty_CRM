import { apiCall } from "./config";

export interface Specialist {
  id: string;
  salonId: string;
  fullName: string;
  description: string;
  imageString64: string;
}

export interface CreateSpecialistDto {
  id?: string;
  salonId: string;
  fullName: string;
  description: string;
  imageString64: string;
}

export interface UpdateSpecialistDto {
  salonId?: string;
  fullName?: string;
  description?: string;
  imageString64?: string;
}

class SpecialistService {
  private baseUrl = "Specialist";

  async getAll(): Promise<Specialist[]> {
    return apiCall<Specialist[]>(this.baseUrl, {
      method: "GET",
    });
  }

  async getById(id: string): Promise<Specialist> {
    return apiCall<Specialist>(`${this.baseUrl}/${id}`, {
      method: "GET",
    });
  }

  async create(data: CreateSpecialistDto): Promise<string> {
    return apiCall<string>(this.baseUrl, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async delete(id: string): Promise<void> {
    return apiCall<void>(`${this.baseUrl}/${id}`, {
      method: "DELETE",
    });
  }
}

export const specialistService = new SpecialistService();

