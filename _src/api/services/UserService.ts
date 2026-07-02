import { APIRequestContext } from '@playwright/test';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface CreateUserPayload {
  name: string;
  username: string;
  email: string;
}

export class UserService {
  constructor(private request: APIRequestContext) {}

  async getUsers() {
    return this.request.get('/users');
  }

  async getUserById(id: number) {
    return this.request.get(`/users/${id}`);
  }

  async getUserPosts(id: number) {
    return this.request.get(`/users/${id}/posts`);
  }

  async createUser(payload: CreateUserPayload) {
    return this.request.post('/users', { data: payload });
  }

  async updateUser(id: number, payload: Partial<CreateUserPayload>) {
    return this.request.put(`/users/${id}`, { data: payload });
  }

  async deleteUser(id: number) {
    return this.request.delete(`/users/${id}`);
  }
}
