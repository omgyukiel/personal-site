import { expect, test } from "@playwright/test";

test("home page keeps its visual layout", async ({ page }, testInfo) => {
  await page.goto("/");

  await expect(page).toHaveScreenshot(`home-${testInfo.project.name}.png`, {
    fullPage: true,
  });
});

test("blog index keeps its visual layout", async ({ page }, testInfo) => {
  await page.goto("/blog/");

  await expect(page).toHaveScreenshot(`blog-index-${testInfo.project.name}.png`, {
    fullPage: true,
  });
});

test("hello world post keeps its visual layout", async ({ page }, testInfo) => {
  await page.route("https://giscus.app/**", (route) => route.abort());
  await page.goto("/blog/hello-world/");

  await expect(page).toHaveScreenshot(`hello-world-${testInfo.project.name}.png`, {
    fullPage: true,
  });
});

test("removed profile route returns 404", async ({ request }) => {
  const response = await request.get("/profile/");
  expect(response.status()).toBe(404);
});

test("projects index keeps its visual layout", async ({ page }, testInfo) => {
  await page.goto("/projects/");

  await expect(page).toHaveScreenshot(`projects-${testInfo.project.name}.png`, {
    fullPage: true,
  });
});

test("archive is not part of the public site", async ({ request }) => {
  const response = await request.get("/archive/pre-minimal-redesign/");
  expect(response.status()).toBe(404);
});
