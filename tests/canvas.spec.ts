import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Clear localStorage so each test starts fresh
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test('loads with Level 1 Library scenario', async ({ page }) => {
  await expect(page.getByText('Level 1')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Library' })).toBeVisible();
  await expect(page.getByText('Members can borrow books')).toBeVisible();
});

test('empty canvas check shows missing entities', async ({ page }) => {
  await page.getByRole('button', { name: 'Check Answer' }).click();
  await expect(page.getByText('Not quite yet')).toBeVisible();
  await expect(page.getByText('Missing entity: loans')).toBeVisible();
  await expect(page.getByText('Missing entity: books')).toBeVisible();
  await expect(page.getByText('Missing entity: members')).toBeVisible();
});

test('correct answer shows success and Next Level advances to Level 2', async ({ page }) => {
  // Mock /api/grade to return a correct result
  await page.route('/api/grade', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        correct: true,
        missingNodes: [],
        extraNodes: [],
        missingEdges: [],
        extraEdges: [],
      }),
    })
  );

  await page.getByRole('button', { name: 'Check Answer' }).click();
  await expect(page.getByText('Correct!')).toBeVisible();

  const nextBtn = page.getByRole('button', { name: 'Next Level →' });
  await expect(nextBtn).toBeVisible();
  await nextBtn.click();

  await expect(page.getByText('Level 2')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Blog' })).toBeVisible();
});
