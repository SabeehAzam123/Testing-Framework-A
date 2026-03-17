import type { Page } from '@playwright/test';
import { UsersLocators } from './users.locators';

export class UsersActions {
    private readonly loc: UsersLocators;

    constructor(private readonly page: Page) {
        this.loc = new UsersLocators(page);
    }

    async goto() {
        await this.page.goto('/users');
    }

    async search(email: string) {
        await this.loc.searchInput.fill(email);
        await this.loc.searchBtn.click();
    }

    async clearSearch() {
        await this.loc.clearSearchBtn.click();
    }

    async setRoleFilter(role: '' | 'Admin' | 'Staff') {
        await this.loc.roleFilter.selectOption(role);
    }

    async setPageSize(size: 5 | 10 | 20) {
        await this.loc.pageSize.selectOption(String(size));
    }

    async openCreateModal() {
        await this.loc.createUserBtn.click();
    }

    async fillCreateForm(input: { email: string; password: string; role: 'Admin' | 'Staff' }) {
        await this.loc.createEmail.fill(input.email);
        await this.loc.createPassword.fill(input.password);
        await this.loc.createRole.selectOption(input.role);
    }

    async submitCreate() {
        await this.loc.createSubmit.click();
    }

      async clickEditForRowId(id: string) {
        await this.loc.editBtnById(id).click();
      }

      async clickDeleteForRowId(id: string) {
        await this.loc.deleteBtnById(id).click();
      }

      async fillEditForm(input: { email: string; role: 'Admin' | 'Staff' }) {
        await this.loc.editEmail.fill(input.email);
        await this.loc.editRole.selectOption(input.role);
      }

      async submitEdit() {
        await this.loc.editSubmit.click();
      }

      async confirmDelete() {
        await this.loc.deleteConfirm.click();
      }
}
