import { expect, test, BrowserContext as context } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { AlertsFrameWindowsPage } from '../pages/AlertsFrameWindowsPage'
import { ElementsPage } from '../pages/ElementsPage'
test('demo login', async ({ page, context }) => {

    const loginpage= new LoginPage(page,context)
    const AlertsPage= new AlertsFrameWindowsPage(page, context)
    const elementsPage= new ElementsPage(page, context)

    await page.goto('https://demoqa.com/')

    // await loginpage.gotToSite()
    // await loginpage.login('tau-playwright', 'TestingWithR3n@t@')
    // await page.waitForTimeout(5000)
    // await loginpage.verifyLoginStatus()
    // await page.locator('//*[text()="Alerts, Frame & Windows"]').click()
    // await page.locator('//*[text()="Browser Windows"]').click()
    // await AlertsPage.clickNewTab('https://demoqa.com/sample')
    await page.waitForSelector('//*[text()="Elements"]')
    await page.locator('//*[text()="Elements"]').click()
    await page.locator('//*[text()="Text Box"]').click()
    //await elementsPage.clickByText('Text Box')
    await elementsPage.enterTextboxValues()
    await elementsPage.verifyTextEntered()
    await elementsPage.clickByText('Check Box')
    await elementsPage.checkHomecheckbox()
    await elementsPage.verifyHomeCheckboxTextVisible()
    await elementsPage.clickByText('Radio Button')
    await elementsPage.clickRadioButton()
    await elementsPage.verifyNoRadioButtonisDisabled()
    await elementsPage.clickByText('Web Tables')
    await elementsPage.verifyFirstColumnHeader('First Name')
    await elementsPage.addRowtoWebTable('abc','abc','30','abc@gm.cm','1111111','abc')
    await elementsPage.editRowWebTable()
    await elementsPage.deleteRow()
    await elementsPage.clickByText('Buttons')
    await elementsPage.verifyDoubleClickButton()
    await elementsPage.verifyRightClickButton()
    await elementsPage.clickByText('Links')
    await elementsPage.clickHomeLink()
    await elementsPage.clickByText('Upload and Download')
    await elementsPage.verifyFileDownload()
    await elementsPage.verifyUploadFile()


})