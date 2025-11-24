import { apiCall } from "./config";

export interface LoginRequest {
  email: string;
  password: string;
  securityCode?: string;
}

// Matches backend TokenDto { Value: string }
export interface LoginResponse {
  value: string;
}

export interface SendTwoFactorCodeRequest {
  email: string;
  password: string;
}

export interface ResetPasswordRequest {
  securityCode: string;
  newPassword: string;
}

class AuthenticationService {
  private baseUrl = "Authentication";

  async sendTwoFactorCode(data: SendTwoFactorCodeRequest): Promise<void> {
    return apiCall<void>(`${this.baseUrl}/send-two-factor-code`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    return apiCall<LoginResponse>(`${this.baseUrl}/log-in`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async logout(): Promise<void> {
    return apiCall<void>(`${this.baseUrl}/log-out`, {
      method: "GET",
    });
  }

  async resetPasswordRequest(email: string): Promise<void> {
    return apiCall<void>(`${this.baseUrl}/reset-password-request`, {
      method: "POST",
      body: JSON.stringify(email),
    });
  }

  async checkSecurityCode(securityCode: string): Promise<boolean> {
    return apiCall<boolean>(
      `${this.baseUrl}/security-code/${securityCode}`,
      {
        method: "GET",
      }
    );
  }

  async resetPassword(data: ResetPasswordRequest): Promise<void> {
    return apiCall<void>(`${this.baseUrl}/reset-password`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}

export const authenticationService = new AuthenticationService();

