import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class ToastComponent {
    constructor(private readonly page: Page) {}

    // Preferred: add data-testid="toast" in your app Toast component.
    private toast() {
        return this.page.getByTestId('toast');
    }

    async expectMessage(message: string) {
        // Try stable selector first
        const toast = this.toast();
        if (await toast.count().catch(() => 0)) {
            await expect(toast).toContainText(message, { timeout: 10_000 });
            return;
        }

        // Fallback: search for message anywhere (not ideal but works until testid exists)
        await expect(this.page.locator('body')).toContainText(message, { timeout: 10_000 });
    }
}
