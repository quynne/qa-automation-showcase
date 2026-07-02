import { test as setup, expect } from '@playwright/test';

setup('api auth setup', async ({ request }) => {
  // Reqres.in uses token-based auth — verify API is reachable
  const res = await request.get('https://reqres.in/api/users?page=1');
  expect(res.status()).toBe(200);
});
