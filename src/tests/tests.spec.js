/* eslint-disable playwright/no-conditional-expect */
/* eslint-disable playwright/no-conditional-in-test */
import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { user } from '../test-data/users';

const { login, password } = user;

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
        await app.login.navigate();
        await app.login.performLogin(login, password);
    });

    test(`Verify that sorting works correctly for sorting ${data.sortBy}`, async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        const elements = (await app.inventory.inventoryItemNames.allInnerTexts()).map((el) => el.trim());
        const prices = (await app.inventory.itemPrices.allInnerTexts()).map((el) => parseFloat(el.replace('$', '')));

        await app.inventory.sortItems.selectOption(data.sortBy);

        if (data.sortBy === 'Name (A to Z)') {
            const elementsFromAToZ = elements.sort();
            await expect(app.inventory.inventoryItemNames).toHaveText(elementsFromAToZ);
        } else if (data.sortBy === 'Name (Z to A)') {
            const elementsFromZToA = elements.sort().reverse();
            await expect(app.inventory.inventoryItemNames).toHaveText(elementsFromZToA);
        } else if (data.sortBy === 'Price (low to high)') {
            const pricesFromLowToHigh = prices.sort((a, b) => a - b);
            const inventoryPrices = (await app.inventory.itemPrices.allInnerTexts()).map((el) => parseFloat(el.replace('$', '')));
            expect(inventoryPrices).toEqual(pricesFromLowToHigh);
        } else {
            const pricesFromHighToLow = prices.sort((a, b) => b - a);
            const inventoryPrices = (await app.inventory.itemPrices.allInnerTexts()).map((el) => parseFloat(el.replace('$', '')));
            expect(inventoryPrices).toEqual(pricesFromHighToLow);
        }
    });
});
