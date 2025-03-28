import { AUTH_CONFIG } from "@/configs/auth";
import Application from "@/interfaces/Application";
import User from "@/interfaces/User";

class AuthService {
  private static instance: AuthService;

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private async fetchWithAuth(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<Response> {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error("Authentication failed.");
    }

    return response;
  }

  async login(email: string, password: string): Promise<{ user: User }> {
    const response = await this.fetchWithAuth(AUTH_CONFIG.endpoints.login, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  }

  async logout(): Promise<void> {
    await this.fetchWithAuth(AUTH_CONFIG.endpoints.logout, {
      method: "POST",
    });
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await this.fetchWithAuth(AUTH_CONFIG.endpoints.me);
      const data = await response.json();
      return data.user;
    } catch (error) {
      return null;
    }
  }

  async getApplications(postingId: string): Promise<Application[]> {
    const response = await this.fetchWithAuth(
      `/api/postings/${postingId}/applications`,
    );
    return response.json();
  }
}

export const authService = AuthService.getInstance();
