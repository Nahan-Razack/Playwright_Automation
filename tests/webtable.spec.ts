import { test, expect } from '@playwright/test';

test('test for webtable',async({page})=> {

await page.goto('https://testautomationpractice.blogspot.com/')
const table= page.locator('#productTable')
const columns = await table.locator('thead tr th')
console.log('number of columns', await columns.count())
const rows = await table.locator('tbody tr')
console.log('number of rows', await rows.count())

// await selectProduct(page,rows,'Product 4')
// await selectProduct(page,rows,'Product 2')
// await selectProduct(page,rows,'Product 1')
//  await page.waitForTimeout(5000)

for( let i=0; i< await rows.count();i++){
 
    const row=rows.nth(i)
    const tds=row.locator('td')

    for(let j=0; j< await tds.count()-1; j++){
        console.log( await tds.nth(j).textContent())

    }


}

})

// async function selectProduct(page,rows,name){

//     const matchedRow=rows.filter({
//         has: page.locator('td'),
//         hasText: name
//     })
//     await matchedRow.locator('input').check()
// }