import type { Page, Locator } from '@playwright/test';

export class UsersLocators {
    readonly title: Locator;

    readonly searchInput: Locator;
    readonly searchBtn: Locator;
    readonly clearSearchBtn: Locator;

    readonly roleFilter: Locator;
    readonly pageSize: Locator;

    readonly createUserBtn: Locator;
    readonly rbacHint: Locator;

    readonly table: Locator;
    readonly loading: Locator;
    readonly empty: Locator;

    readonly prevPage: Locator;
    readonly nextPage: Locator;
    readonly pageIndicator: Locator;

    // Modals
    readonly createModal: Locator;
    readonly editModal: Locator;
    readonly deleteModal: Locator;

    // Create modal fields
    readonly createEmail: Locator;
    readonly createPassword: Locator;
    readonly createRole: Locator;
    readonly createCancel: Locator;
    readonly createSubmit: Locator;

    readonly createEmailError: Locator;
    readonly createPasswordError: Locator;

    // Edit modal fields
    readonly editEmail: Locator;
    readonly editRole: Locator;
    readonly editCancel: Locator;
    readonly editSubmit: Locator;
    readonly editEmailError: Locator;

    // Delete modal fields
    readonly deleteConfirmText: Locator;
    readonly deleteCancel: Locator;
    readonly deleteConfirm: Locator;


    constructor(private readonly page: Page) {
        this.title = page.getByTestId('users-title');

        this.searchInput = page.getByTestId('users-search');
        this.searchBtn = page.getByTestId('users-search-btn');
        this.clearSearchBtn = page.getByTestId('users-clear-search-btn');

        this.roleFilter = page.getByTestId('role-filter');
        this.pageSize = page.getByTestId('page-size');

        this.createUserBtn = page.getByTestId('create-user-btn');
        this.rbacHint = page.getByTestId('rbac-hint');

        this.table = page.getByTestId('users-table');
        this.loading = page.getByTestId('users-loading');
        this.empty = page.getByTestId('users-empty');

        this.prevPage = page.getByTestId('prev-page');
        this.nextPage = page.getByTestId('next-page');
        this.pageIndicator = page.getByTestId('page-indicator');

        this.createModal = page.getByTestId('create-user-modal');
        this.editModal = page.getByTestId('edit-user-modal');
        this.deleteModal = page.getByTestId('delete-user-modal');

        // Create modal fields
        this.createEmail = page.getByTestId('create-email');
        this.createPassword = page.getByTestId('create-password');
        this.createRole = page.getByTestId('create-role');
        this.createCancel = page.getByTestId('create-cancel');
        this.createSubmit = page.getByTestId('create-submit');

        this.createEmailError = page.getByTestId('create-email-error');
        this.createPasswordError = page.getByTestId('create-password-error');

        // Edit modal fields
        this.editEmail = page.getByTestId('edit-email');
        this.editRole = page.getByTestId('edit-role');
        this.editCancel = page.getByTestId('edit-cancel');
        this.editSubmit = page.getByTestId('edit-submit');
        this.editEmailError = page.getByTestId('edit-email-error');

        // Delete modal fields
        this.deleteConfirmText = page.getByTestId('delete-confirm-text');
        this.deleteCancel = page.getByTestId('delete-cancel');
        this.deleteConfirm = page.getByTestId('delete-confirm');
    }

    rowById(id: string) {
        return this.page.getByTestId(`user-row-${id}`);
    }

    // row actions (based on your testids)
    editBtnById(id: string) {
        return this.page.getByTestId(`edit-user-btn-${id}`);
    }

    deleteBtnById(id: string) {
        return this.page.getByTestId(`delete-user-btn-${id}`);
    }
}
