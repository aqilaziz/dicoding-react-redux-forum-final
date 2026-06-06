import { expect, test } from '@playwright/test'

test('skenario: pengguna yang sudah terdaftar dapat login dan diarahkan ke halaman daftar thread', async ({ page }) => {
  const user = {
    id: 'user-playwright',
    name: 'Playwright User',
    email: 'playwright@example.com',
    password: 'password123',
    avatar: 'https://ui-avatars.com/api/?name=Playwright+User&background=random'
  }

  await page.route('https://forum-api.dicoding.dev/v1/login', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 'success',
        message: 'login success',
        data: {
          token: 'token-playwright'
        }
      })
    })
  })

  await page.route('https://forum-api.dicoding.dev/v1/users/me', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 'success',
        message: 'user retrieved',
        data: {
          user
        }
      })
    })
  })

  await page.route('https://forum-api.dicoding.dev/v1/threads', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 'success',
        message: 'threads retrieved',
        data: {
          threads: []
        }
      })
    })
  })

  await page.route('https://forum-api.dicoding.dev/v1/users', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 'success',
        message: 'users retrieved',
        data: {
          users: [user]
        }
      })
    })
  })

  await page.goto('/login')
  await page.getByLabel('Email').fill(user.email)
  await page.getByLabel('Password').fill(user.password)
  await page.getByRole('button', { name: /^Masuk$/ }).click()

  await expect(page).toHaveURL('/')
  await expect(page.getByText(user.name)).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Diskusi React dan Redux' })).toBeVisible()
})
