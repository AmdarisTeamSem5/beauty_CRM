import { apiCall } from "./config";

export interface ServiceType {
  id: number;
  name: string;
}

class MiscService {
  async getServiceTypes(): Promise<ServiceType[]> {
    return apiCall<ServiceType[]>("Misc/ServiceTypes", {
      method: "GET",
    });
  }
}

export const miscService = new MiscService();

