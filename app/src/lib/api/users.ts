import { apiCall } from "./config";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  isBlocked: boolean;
}

export interface CreateUserDto {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  isBlocked: boolean;
  password?: string;
}

export interface EditUserDto {
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  isBlocked?: boolean;
}

export interface RoleDto {
  id: string;
  name: string;
}

export interface ManageUserRolesDto {
  roleIds: string[];
}

class UserService {
  private baseUrl = "User";

  async getAll(): Promise<User[]> {
    return apiCall<User[]>(this.baseUrl, {
      method: "GET",
    });
  }

  async getById(id: string): Promise<User> {
    return apiCall<User>(`${this.baseUrl}/${id}`, {
      method: "GET",
    });
  }

  async create(data: CreateUserDto): Promise<string> {
    return apiCall<string>(this.baseUrl, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async update(id: string, data: EditUserDto): Promise<void> {
    return apiCall<void>(`${this.baseUrl}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async getRoles(id: string): Promise<RoleDto[]> {
    return apiCall<RoleDto[]>(`${this.baseUrl}/${id}/roles`, {
      method: "GET",
    });
  }

  async manageRoles(id: string, data: ManageUserRolesDto): Promise<void> {
    return apiCall<void>(`${this.baseUrl}/${id}/roles`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getCurrent(): Promise<User> {
    return apiCall<User>(`${this.baseUrl}/current`, {
      method: "GET",
    });
  }
}

export const userService = new UserService();

