import type { Page } from '@playwright/test';
import { LoginLocators } from './login.locators';

export class LoginActions {
    private readonly loc: LoginLocators;

    constructor(private readonly page: Page) {
        this.loc = new LoginLocators(page);
    }

    async goto() {
        await this.page.goto('/login');
    }

    async fillEmail(email: string) {
        await this.loc.email.fill(email);
    }

    async fillPassword(password: string) {
        await this.loc.password.fill(password);
    }

    async submit() {
        await this.loc.submit.click();
    }

    async login(email: string, password: string) {
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.submit();
    }
}
