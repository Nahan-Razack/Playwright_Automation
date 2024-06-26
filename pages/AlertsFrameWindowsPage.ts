import { expect, Locator, Page, BrowserContext } from '@playwright/test'

export class AlertsFrameWindowsPage {

    readonly page: Page
    readonly context: BrowserContext
    readonly newTab: Locator
    readonly newWindow: Locator
    readonly newWindowMessage: Locator
    readonly alertButton: Locator
    readonly confirmButton: Locator
    readonly promptButton: Locator
    readonly frame: Locator

constructor(page: Page, context: BrowserContext){

    this.page = page
    this.context = context
    this.newTab = page.locator('#tabButton')
    this.newWindow = page.locator('#windowButton')
    this.newWindowMessage = page.locator('#messageWindowButton')
    this.alertButton = page.locator('#alertButton')
    this.confirmButton = page.locator('#confirmButton')
    this.promptButton = page.locator('#promtButton')
    this.frame = page.locator('#frame1')

}

async clickNewTab(expectedURL) {
    const pagePromise= this.context.waitForEvent('page') 
    await this.newTab.click()
    const newTab= await pagePromise
    await newTab.waitForLoadState()
    const newURL=newTab.url()
    expect(newURL==expectedURL).toBeTruthy()
    await newTab.waitForTimeout(5000)
    expect(newTab.locator('#sampleHeading')).toContainText('This is a sample page')
    newTab.close()

}








}