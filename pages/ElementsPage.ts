import { expect, Locator, Page, BrowserContext } from '@playwright/test'
import path from 'path'

export class ElementsPage {

    readonly page: Page
    readonly context: BrowserContext
    readonly fullName: Locator
    readonly email: Locator
    readonly currentAddress: Locator
    readonly permanentAddress: Locator
    readonly submitButton: Locator
    readonly submittedText: Locator
    readonly collapseButton: Locator
    readonly homeCheckbox: Locator
    readonly homeCheckboxText: Locator
    readonly desktopCheckbox: Locator
    readonly downloadsCheckbox: Locator
    readonly yesRadioButton: Locator
    readonly radioButtonText: Locator
    readonly noRadioButton: Locator
    readonly webTableHeader: Locator
    readonly AddRow: Locator
    readonly RFFirstName: Locator
    readonly RFLastName: Locator
    readonly RFEmail: Locator
    readonly RFAge: Locator
    readonly RFSalary: Locator
    readonly RFDepartment: Locator
    readonly RFSubmitButton: Locator
    readonly editCierraButton: Locator
    readonly editedValue: Locator
    readonly deleteNewRow: Locator
    readonly doubleClickButton: Locator
    readonly doubleClickMessage: Locator
    readonly rightClickButton: Locator
    readonly rightClickMessage: Locator
    readonly homeLink: Locator
    readonly downloadButton: Locator
    readonly uploadButton: Locator

    constructor(page: Page, context: BrowserContext){

        this.page= page
        this.context= context
        this.fullName= page.locator('#userName')
        this.email= page.locator('#userEmail')
        this.currentAddress= page.locator('#currentAddress')
        this.permanentAddress= page.locator('#permanentAddress')
        this.submitButton= page.locator('#submit')
        this.submittedText= page.locator('#name')
        this.collapseButton= page.locator('.rct-collapse')
        // this.homeCheckbox= page.locator('.rct-checkbox')
        this.desktopCheckbox= page.locator('text=Desktop')
        this.downloadsCheckbox= page.locator('text=Downloads')
        this.homeCheckboxText= page.locator('#result')
        this.yesRadioButton= page.locator('//*[text()="Yes"]')
        this.radioButtonText=page.locator('.mt-3')
        this.noRadioButton= page.locator('//*[text()="No"]')
        this.webTableHeader= page.locator('.rt-resizable-header')
        this.AddRow= page.locator('#addNewRecordButton')
        this.RFFirstName= page.locator('#firstName')
        this.RFLastName= page.locator('#lastName')
        this.RFEmail= page.locator('#userEmail')
        this.RFAge= page.locator('#age')
        this.RFSalary= page.locator('#salary')
        this.RFDepartment= page.locator('#department') 
        this.RFSubmitButton= page.locator('#submit')
        this.editCierraButton= page.locator('#edit-record-1')
        this.editedValue= page.locator('(//*[@class="rt-td"])[1]')
        this.deleteNewRow= page.locator('#delete-record-4')
        this.doubleClickButton= page.locator('#doubleClickBtn')
        this.doubleClickMessage= page.locator('#doubleClickMessage')
        this.rightClickButton= page.locator('#rightClickBtn') 
        this.rightClickMessage= page.locator('#rightClickMessage')
        this.homeLink= page.locator('#simpleLink')
        this.downloadButton= page.locator('#downloadButton')
        this.uploadButton= page.locator('#uploadFile')
    }

    async clickByText(text: string): Promise<void> {
        await this.page.getByText(text, { exact: true }).click();  //Matches locator with exact text and clicks
    }
    async enterTextboxValues(): Promise<void> {
        await this.fullName.fill('abc')
        await this.email.fill('abc@abc.com')
        const cur_adr='100,\n abc lane,\n abc street,\n USA';
        await this.currentAddress.fill(cur_adr)
        const per_adr='101,\n def lane,\n def street,\n USA';
        await this.currentAddress.fill(per_adr)
        await this.submitButton.click()

    }

    async verifyTextEntered(): Promise<void> {
        expect(this.submittedText).toBeVisible()
    }

    async checkHomecheckbox(): Promise<void>{
        await this.collapseButton.click()
        await this.desktopCheckbox.check()
        await this.downloadsCheckbox.check()
    }

    async verifyHomeCheckboxTextVisible():Promise<void>{
        await expect(this.homeCheckboxText).toContainText('desktop')
        await expect(this.homeCheckboxText).toContainText('downloads')
    }

    async clickRadioButton(): Promise<void>{

        await this.yesRadioButton.click()
        expect(this.radioButtonText).toContainText('Yes')
    }

    async verifyNoRadioButtonisDisabled(): Promise<void>{
        expect(this.noRadioButton).toBeDisabled()
    }

    async verifyFirstColumnHeader(header: String): Promise<void>{
        const headerColumn= await this.webTableHeader.allTextContents()
        console.log(headerColumn)
        expect(headerColumn[0]==header).toBeTruthy()
    }

    async addRowtoWebTable(fn:string, ln:string, age:string, email: string, salary:string, department: string): Promise<void>{
        await this.AddRow.click()
        await this.RFFirstName.fill(fn)
        await this.RFLastName.fill(ln)
        await this.RFAge.fill(age)
        await this.RFEmail.fill(email)
        await this.RFSalary.fill(salary)
        await this.RFDepartment.fill(department)
        await this.RFSubmitButton.click()
        expect(this.deleteNewRow).toBeVisible()
    }
    async editRowWebTable():Promise<void>{
        await this.editCierraButton.click()
        await this.RFFirstName.fill('Cierraaa')
        await this.RFSubmitButton.click()
        expect(this.editedValue).toContainText('Cierraaa')
    
    }
    async deleteRow(): Promise<void>{
        await this.deleteNewRow.click()
        expect(this.deleteNewRow).not.toBeVisible()
    }

    async verifyDoubleClickButton(): Promise<void>{

        await this.doubleClickButton.dblclick()
        expect(this.doubleClickMessage).toBeVisible()
    

    }

    async verifyRightClickButton(): Promise<void>{

        await this.rightClickButton.click({button: 'right'})
        expect(this.rightClickButton).toBeVisible()
    

    }

    async clickHomeLink(): Promise<void>{
        const PagePromise= this.context.waitForEvent('page')
        await this.homeLink.click()
        const newPage=await PagePromise
        await newPage.waitForLoadState()
        const homeurl='https://demoqa.com/'
        const newURL= newPage.url()
        await expect(newURL==homeurl).toBeTruthy()
        newPage.close()
    }

    async verifyFileDownload():Promise<void>{

        const downloadPromise= this.page.waitForEvent('download')
        await this.downloadButton.click()
        const downloadFile= await downloadPromise
        await downloadFile.saveAs(path.join(__dirname,'../../downloads', downloadFile.suggestedFilename()))
    }

    async verifyUploadFile(): Promise<void>{
        const uploadFileLink= path.join(__dirname,'../../utils/utils/IMG_9645.jpeg')
        await this.uploadButton.setInputFiles(uploadFileLink)
    }






}