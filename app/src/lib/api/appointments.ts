import { apiCall } from "./config";

export interface Appointment {
  id: string;
  clientId: string;
  salonServiceId: string;
  specialistId: string;
  salonId: string;
  appointmentDate: string;
  confirmed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateAppointmentDto {
  clientId: string;
  salonServiceId: string;
  salonId: string;
  appointmentDate: string;
  confirmed: boolean;
  specialistId?: string;
}

export interface UpdateAppointmentDto {
  appointmentDate?: string;
  confirmed?: boolean;
}

class AppointmentService {
  private baseUrl = "Appointment";

  async getAll(): Promise<Appointment[]> {
    return apiCall<Appointment[]>(this.baseUrl, {
      method: "GET",
    });
  }

  async getById(id: string): Promise<Appointment> {
    return apiCall<Appointment>(`${this.baseUrl}/${id}`, {
      method: "GET",
    });
  }

  async create(data: CreateAppointmentDto): Promise<string> {
    return apiCall<string>(this.baseUrl, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async update(id: string, data: UpdateAppointmentDto): Promise<void> {
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

export const appointmentService = new AppointmentService();