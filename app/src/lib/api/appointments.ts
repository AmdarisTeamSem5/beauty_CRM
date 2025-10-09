const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5191/api";

export interface Appointment {
  id: string;
  customerId: string;
  serviceId: string;
  staffId: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: "confirmed" | "pending" | "completed" | "cancelled";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAppointmentDto {
  customerId: string;
  serviceId: string;
  staffId: string;
  date: string;
  time: string;
  notes?: string;
}

export interface UpdateAppointmentDto {
  date?: string;
  time?: string;
  status?: "confirmed" | "pending" | "completed" | "cancelled";
  notes?: string;
}

class AppointmentService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${API_BASE_URL}/Appointment`;
  }

  async getAll(): Promise<Appointment[]> {
    try {
      const response = await fetch(this.baseUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch appointments: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching appointments:", error);
      throw error;
    }
  }

  async getById(id: string): Promise<Appointment> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch appointment: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching appointment ${id}:`, error);
      throw error;
    }
  }

  async create(data: CreateAppointmentDto): Promise<Appointment> {
    try {
      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to create appointment: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating appointment:", error);
      throw error;
    }
  }

  async update(id: string, data: UpdateAppointmentDto): Promise<Appointment> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to update appointment: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error updating appointment ${id}:`, error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete appointment: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error deleting appointment ${id}:`, error);
      throw error;
    }
  }

  async updateStatus(
    id: string,
    status: "confirmed" | "pending" | "completed" | "cancelled"
  ): Promise<Appointment> {
    return this.update(id, { status });
  }

  async reschedule(id: string, date: string, time: string): Promise<Appointment> {
    return this.update(id, { date, time });
  }
}

export const appointmentService = new AppointmentService();