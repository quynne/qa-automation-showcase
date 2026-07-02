import { APIRequestContext } from '@playwright/test';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface CreateUserPayload {
  name: string;
  job: string;
}

export interface CreateUserResponse {
  id: string;
  name: string;
  job: string;
  createdAt: string;
}

export class UserService {
  constructor(private request: APIRequestContext) {}

  async getUsers(page = 1) {
    return this.request.get(`/api/users?page=${page}`);
  }

  async getUserById(id: number) {
    return this.request.get(`/api/users/${id}`);
  }

  async createUser(payload: CreateUserPayload) {
    return this.request.post('/api/users', { data: payload });
  }

  async updateUser(id: number, payload: Partial<CreateUserPayload>) {
    return this.request.put(`/api/users/${id}`, { data: payload });
  }

  async deleteUser(id: number) {
    return this.request.delete(`/api/users/${id}`);
  }
}
