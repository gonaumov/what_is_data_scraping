import puppeteer from 'puppeteer';
import { writeFile } from 'fs/promises';

(async () => {
    const resultFileName = 'result-data.json';
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
        headless: 'new'
    });

    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://gonaumov.github.io/what_is_data_scraping/');


    // Wait for cards
    const cardsSelector = 'div.card.mb-3';

    await page.waitForSelector(cardsSelector);

    const dataItems = await page.evaluate((selector) => {
        const data = Array.from(document.querySelectorAll(selector)).map((item) => {
            const name = item.querySelector("div.card-body div.ms-3 > h5").textContent;
            const description = item.querySelector("div.card-body div.ms-3 > p").textContent;
            const qty = item.querySelector("div.card-body h5.fw-normal.mb-0").textContent;
            const price = item.querySelector("div.card-body h5:not(.fw-normal).mb-0").textContent;
            return {
                name,
                description,
                qty,
                price
            }
        });

        return JSON.stringify(data, null, ' ');
    }, cardsSelector);

    try {
        await writeFile(resultFileName, dataItems);
        console.log(`File has been written successfully. Please check ${resultFileName}`);
    } catch (err) {
        console.error('There was an error writing the file.', err);
    }

    await page.close();
    await browser.close();
})();