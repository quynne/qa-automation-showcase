# /impl — Implement Test Cases

Implement approved test cases from test_plan.md.

## Pre-conditions
- /tc output exists and is approved via /review-tc
- Folder structure is ready

## Steps
1. Create service/page objects if not existing
2. Implement each test case from the plan
3. Run `npm run typecheck` — fix all type errors
4. Do NOT run tests yet

## UI Tests (Page Object Model)
```typescript
// pages/FeaturePage.ts
export class FeaturePage {
  constructor(private page: Page) {}
  async doAction() { ... }
  locator() { return this.page.getByRole(...); }
}

// tests/feature/feature.ui.spec.ts
test('F-V01 @smoke — description', async ({ page }) => {
  const featurePage = new FeaturePage(page);
  // arrange → act → assert
});
```

## API Tests (Service Object)
```typescript
// services/FeatureService.ts
export class FeatureService {
  constructor(private request: APIRequestContext) {}
  async create(payload: CreatePayload) {
    return this.request.post('/api/feature', { data: payload });
  }
}

// tests/feature/feature.api.spec.ts
test('C-V01 @smoke — description', async ({ request }) => {
  const service = new FeatureService(request);
  const res = await service.create({ ... });
  expect(res.status()).toBe(201);
});
```
