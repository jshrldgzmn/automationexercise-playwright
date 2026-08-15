import { Locator, Page, expect } from "@playwright/test"
import { BasePage } from "./BasePage"
import { Modal } from '../components/Modal'

export class ProductsPage extends BasePage {

    readonly searchInput : Locator
    readonly searchButton : Locator
    readonly searchedProductsTitle: Locator
    readonly productsList : Locator
    readonly modal : Modal

    constructor (page: Page) {

        super(page)
        this.searchInput = page.getByRole('textbox', { name: 'Search Product' })
        this.searchButton = page.locator('#submit_search')
        this.searchedProductsTitle = page.getByRole('heading', { name: 'Searched Products' })
        this.productsList = page.locator('.productinfo')
        this.modal = new Modal(page)
    }

    async goto() {
        await super.goto('products')
    }

    async searchProduct(productName : string) {
        await this.searchInput.fill(productName)
        await this.searchButton.click()
    }

    async addFirstProductToCart() {
        await this.productsList.first().locator('a:has-text("Add to cart")').click()
    }

    async expectSearchResultsVisible() {
        await expect(this.searchedProductsTitle).toBeVisible()
        await expect(this.productsList.first()).toBeVisible()
    }

    async expectPageLoaded() {
        await expect(this.page).toHaveURL(/products/)
        await expect(this.searchInput).toBeVisible()
    }
}