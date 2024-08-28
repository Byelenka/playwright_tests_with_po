/* eslint-disable playwright/no-conditional-expect */
/* eslint-disable playwright/no-conditional-in-test */
import { expect } from '@playwright/test';
import { test } from '../fixtures/base';

const authFile = 'playwright/.auth/user.json';

test.use({ storageState: authFile });

const testData = [
    {
        sortBy: 'Name (A to Z)',
    },
    {
        sortBy: 'Name (Z to A)',
    },
    {
        sortBy: 'Price (low to high)',
    },
    {
        sortBy: 'Price (high to low)',
    },
];

testData.forEach((data) => {
    test.beforeEach(async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        await app.inventory.goto(app.inventory.url);
    });

    test(`Verify that sorting works correctly for sorting ${data.sortBy}`, async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        await app.inventory.selectSorting(data.sortBy);

        if (data.sortBy === 'Name (A to Z)') {
            const elementsFromAToZ = (await app.inventory.getProductNames()).sort();
            await expect(app.inventory.inventoryItemNames).toHaveText(elementsFromAToZ);
        } else if (data.sortBy === 'Name (Z to A)') {
            const elementsFromZToA = (await app.inventory.getProductNames()).sort().reverse();
            await expect(app.inventory.inventoryItemNames).toHaveText(elementsFromZToA);
        } else if (data.sortBy === 'Price (low to high)') {
            const pricesFromLowToHigh = (await app.inventory.getProductPrices()).sort((a, b) => a - b);
            const inventoryPrices = await app.inventory.getProductPrices();
            expect(inventoryPrices).toEqual(pricesFromLowToHigh);
        } else {
            const pricesFromHighToLow = (await app.inventory.getProductPrices()).sort((a, b) => b - a);
            const inventoryPrices = await app.inventory.getProductPrices();
            expect(inventoryPrices).toEqual(pricesFromHighToLow);
        }
    });
});
