import { Page } from '@playwright/test'

export class BasePage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async goto(path: string) {
        await this.page.goto(path, {waitUntil: 'domcontentloaded'})
    }

    async getTitle(): Promise<string> {
        return await this.page.title()
    }

    async getCurrentUrl(): Promise<string> {
        return this.page.url()
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('domcontentloaded')
    }
}