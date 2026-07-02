import { test, expect } from '@playwright/test';
import { UserService } from '../../services/UserService';

test.describe('Users API', () => {
  let userService: UserService;

  test.beforeEach(({ request }) => {
    userService = new UserService(request);
  });

  // ── Valid ────────────────────────────────────────────────────────────────────
  test('L-V01 @smoke — GET /users returns paginated list', async () => {
    const res = await userService.getUsers(1);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('data');
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
  });

  test('L-V02 — GET /users/:id returns correct user', async () => {
    const res = await userService.getUserById(2);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.data.id).toBe(2);
    expect(body.data).toHaveProperty('email');
    expect(body.data).toHaveProperty('first_name');
  });

  test('C-V01 @smoke — POST /users creates user and returns 201', async () => {
    const res = await userService.createUser({ name: 'John Doe', job: 'QA Engineer' });
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body).toHaveProperty('id');
    expect(body.name).toBe('John Doe');
    expect(body.job).toBe('QA Engineer');
    expect(body).toHaveProperty('createdAt');
  });

  test('U-V01 — PUT /users/:id updates user and returns 200', async () => {
    const res = await userService.updateUser(2, { name: 'Jane Doe', job: 'Senior QA' });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.name).toBe('Jane Doe');
    expect(body.job).toBe('Senior QA');
    expect(body).toHaveProperty('updatedAt');
  });

  test('D-V01 — DELETE /users/:id returns 204', async () => {
    const res = await userService.deleteUser(2);
    expect(res.status()).toBe(204);
  });

  // ── Invalid ──────────────────────────────────────────────────────────────────
  test('L-I01 — GET /users/:id with non-existent id returns 404', async () => {
    const res = await userService.getUserById(9999);
    expect(res.status()).toBe(404);
  });

  test('L-I02 — GET /users with page=0 returns empty data', async () => {
    const res = await userService.getUsers(0);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.data).toHaveLength(0);
  });

  // ── Security ─────────────────────────────────────────────────────────────────
  test('S-V01 @security — POST /register without password returns 400', async ({ request }) => {
    const res = await request.post('https://reqres.in/api/register', {
      data: { email: 'eve.holt@reqres.in' },
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body).toHaveProperty('error');
  });

  test('S-V02 @security — POST /login with wrong credentials returns 400', async ({ request }) => {
    const res = await request.post('https://reqres.in/api/login', {
      data: { email: 'wrong@test.com', password: 'wrong' },
    });
    expect(res.status()).toBe(400);
  });
});
