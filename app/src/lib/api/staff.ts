const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5191/api";

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  experience: string;
  specialties: string[];
  schedule: string[];
  bio: string;
  rating: number;
  reviewCount: number;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export interface CreateStaffDto {
  name: string;
  role: string;
  email: string;
  phone: string;
  experience: string;
  specialties: string[];
  schedule: string[];
  bio: string;
}

export interface UpdateStaffDto {
  name?: string;
  role?: string;
  email?: string;
  phone?: string;
  experience?: string;
  specialties?: string[];
  schedule?: string[];
  bio?: string;
  status?: "active" | "inactive";
}

class StaffService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${API_BASE_URL}/Staff`;
  }

  async getAll(): Promise<StaffMember[]> {
    try {
      const response = await fetch(this.baseUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch staff: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching staff:", error);
      throw error;
    }
  }

  async getById(id: string): Promise<StaffMember> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch staff member: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching staff member ${id}:`, error);
      throw error;
    }
  }

  async create(data: CreateStaffDto): Promise<StaffMember> {
    try {
      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to create staff member: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating staff member:", error);
      throw error;
    }
  }

  async update(id: string, data: UpdateStaffDto): Promise<StaffMember> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to update staff member: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error updating staff member ${id}:`, error);
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
        throw new Error(`Failed to delete staff member: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error deleting staff member ${id}:`, error);
      throw error;
    }
  }

  async toggleStatus(id: string): Promise<StaffMember> {
    const staff = await this.getById(id);
    const newStatus = staff.status === "active" ? "inactive" : "active";
    return this.update(id, { status: newStatus });
  }
}

export const staffService = new StaffService();
