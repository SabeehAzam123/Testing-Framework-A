import type { Page, Locator } from '@playwright/test';

export class LoginLocators {
    readonly title: Locator;
    readonly email: Locator;
    readonly password: Locator;
    readonly submit: Locator;
    readonly loading: Locator;
    readonly emailError: Locator;
    readonly passError: Locator;

    constructor(private readonly page: Page) {
        this.title = page.getByTestId('login-title');
        this.email = page.getByTestId('email');
        this.password = page.getByTestId('password');
        this.submit = page.getByTestId('login-submit');
        this.loading = page.getByTestId('login-loading');
        this.emailError = page.getByTestId('email-error');
        this.passError = page.getByTestId('password-error');
    }
}
