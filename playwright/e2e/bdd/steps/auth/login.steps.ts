import { Given, When, Then, expect, test } from '@support/bdd.fixtures';
import { LoginPage } from '@ui/pages/login/login.page';
import { LoginFlow } from '@ui/flows/login.flow';

Given('I am on the login page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.expectLoaded();
});

When('I log in as an admin through the UI', async ({ page }) => {
  const loginFlow = new LoginFlow(page);
  await loginFlow.loginAsAdmin();
});

Then('I should land on the dashboard', async ({ page }) => {
  await expect(page).toHaveURL(/dashboard/);
});