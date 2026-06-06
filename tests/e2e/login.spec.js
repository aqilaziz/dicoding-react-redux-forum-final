import { expect, test } from '@playwright/test'

test('skenario: pengguna yang sudah terdaftar dapat login dan diarahkan ke halaman daftar thread', async ({ page, request }) => {
  const timestamp = Date.now()
  const user = {
    name: `Playwright User ${timestamp}`,
    email: `playwright-${timestamp}@example.com`,
    password: 'password123',
  }

  await request.post('https://forum-api.dicoding.dev/v1/register', {
    data: user,
  })

  await page.goto('/login')
  await page.getByLabel('Email').fill(user.email)
  await page.getByLabel('Password').fill(user.password)
  await page.getByRole('button', { name: /^Masuk$/ }).click()

  await expect(page).toHaveURL('/')
  await expect(page.getByText(user.name)).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Diskusi React dan Redux' })).toBeVisible()
})
