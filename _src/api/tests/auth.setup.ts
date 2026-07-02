import { test as setup, expect } from '@playwright/test';

setup('api auth setup', async ({ request }) => {
  const res = await request.get('https://jsonplaceholder.typicode.com/users');
  expect(res.status()).toBe(200);
});
