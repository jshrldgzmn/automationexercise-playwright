import { Page, expect } from "@playwright/test"
import { BasePage } from "./BasePage"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"

export class HomePage extends BasePage{
    readonly navBar : Navbar
    readonly footer : Footer

    constructor (page: Page) {
        super(page)
        this.navBar = new Navbar(page)
        this.footer = new Footer(page)
    }

    async goto(){
        await super.goto('/')
    }

    async expectPageLoaded() {
        await expect(this.navBar.logo).toBeVisible()
        await expect(this.page).toHaveURL('/')
    }
}