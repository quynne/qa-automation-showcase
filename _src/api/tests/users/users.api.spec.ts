import { test, expect } from '@playwright/test';
import { UserService } from '../../services/UserService';

test.describe('Users API', () => {
  let userService: UserService;

  test.beforeEach(({ request }) => {
    userService = new UserService(request);
  });

  // ── Valid ────────────────────────────────────────────────────────────────────
  test('L-V01 @smoke — GET /users returns list of 10 users', async () => {
    const res = await userService.getUsers();
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBe(10);
    expect(body[0]).toHaveProperty('id');
    expect(body[0]).toHaveProperty('email');
  });

  test('L-V02 @smoke — GET /users/:id returns correct user', async () => {
    const res = await userService.getUserById(1);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.id).toBe(1);
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('email');
    expect(body).toHaveProperty('username');
  });

  test('L-V03 — GET /users/:id/posts returns user posts', async () => {
    const res = await userService.getUserPosts(1);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
    expect(body[0].userId).toBe(1);
  });

  test('C-V01 — POST /users creates user and returns 201', async () => {
    const res = await userService.createUser({
      name: 'Jane QA',
      username: 'jane_qa',
      email: 'jane@qa.com',
    });
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body).toHaveProperty('id');
    expect(body.name).toBe('Jane QA');
  });

  test('U-V01 — PUT /users/:id updates user and returns 200', async () => {
    const res = await userService.updateUser(1, { name: 'Updated Name' });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.name).toBe('Updated Name');
  });

  test('D-V01 — DELETE /users/:id returns 200', async () => {
    const res = await userService.deleteUser(1);
    expect(res.status()).toBe(200);
  });

  // ── Invalid ──────────────────────────────────────────────────────────────────
  test('L-I01 — GET /users/:id with non-existent id returns 404', async () => {
    const res = await userService.getUserById(9999);
    expect(res.status()).toBe(404);
  });

  // ── Security ─────────────────────────────────────────────────────────────────
  test('S-V01 @security — response does not expose sensitive server headers', async () => {
    const res = await userService.getUsers();
    expect(res.status()).toBe(200);
    expect(res.headers()['x-powered-by']).toBeUndefined();
  });

  test('S-V02 @security — GET /users/:id with SQL injection string returns 404', async ({ request }) => {
    const res = await request.get('/users/1%20OR%201=1');
    expect(res.status()).toBe(404);
  });
});
