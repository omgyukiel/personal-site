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
  await page.goto("/blog/hello-world.html");

  await expect(page).toHaveScreenshot(`hello-world-${testInfo.project.name}.png`, {
    fullPage: true,
  });
});

test("profile tabs keep their visual layouts", async ({ page }, testInfo) => {
  await page.goto("/profile.html");
  await expect(page).toHaveScreenshot(`profile-${testInfo.project.name}.png`, {
    fullPage: true,
  });

  await page.getByText("Match History", { exact: true }).click();
  await expect(page).toHaveScreenshot(`profile-match-${testInfo.project.name}.png`, {
    fullPage: true,
  });

  await page.getByText("Servers", { exact: true }).click();
  await expect(page).toHaveScreenshot(`profile-servers-${testInfo.project.name}.png`, {
    fullPage: true,
  });
});
