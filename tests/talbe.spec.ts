import { expect, test } from '@playwright/test'

test('demo login', async({ page }) => {


   
        // Navigate to the webpage with the table
        await page.goto("https://ticker.finology.in/market/top-gainers");

        // Wait for the table to be available
        await page.waitForSelector("//table[@class='table table-sm tickertable table-hover' and @data-toggle='table']");

        // Extract data from the table
        const data = await page.$$eval("//table[@class='table table-sm tickertable table-hover' and @data-toggle='table']", rows => {
            // Initialize an array to store the extracted data
            const extractedData: string[] = [];

            // Iterate through the table rows
            for (const row of rows) {
                // Find all cells in the row
                const cells = row.querySelectorAll("td");

                // Iterate through the cells
                for (const cell of cells) {
                    // Extract text from the cell
                    const cellText = cell.textContent.trim();

                    // Convert text to number (assuming it's numeric data)
                    const value = parseFloat(cellText);

                    // Check if value is greater than 10
                    if (!isNaN(value) && value > 10) {
                        // Push the value to the extracted data array
                        extractedData.push(cellText);
                    }
                }
            }

            // Return the extracted data array
            return extractedData;
        });
        expect(data).toHaveLength(3);

});


