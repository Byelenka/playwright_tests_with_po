/* eslint-disable no-restricted-syntax */
import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { users } from '../test-data/users';

const { username, password } = users.standardUser;

function getRandomLocators(locators) {
    if (locators.length < 2) {
        throw new Error('Array must contain at least two locators');
    }

    const index1 = Math.floor(Math.random() * locators.length);
    let index2;

    do {
        index2 = Math.floor(Math.random() * locators.length);
    } while (index2 === index1);

    return [locators[index1], locators[index2]];
}

test.beforeEach(async (
    /** @type {{ app: import('../pages/Application').Application }} */{ app },
) => {
    await app.login.navigate();
    await app.login.performLogin(username, password);
});

test.describe('Tests for Shopping card', () => {
    test('Verify that sorting works correctly for sorting', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        const itemsLocators = await app.inventory.inventoryItems.all();
        const chosenItems = getRandomLocators(itemsLocators);

        for await (const element of chosenItems) {
            await element.locator('[id^="add-to-cart"]').click();
        }

        const itemNames = await Promise.all(chosenItems.map(async (item) => item.locator('.inventory_item_name').innerText()));
        const itemDescriptions = await Promise.all(chosenItems.map(async (item) => item.locator('.inventory_item_desc').innerText()));
        const itemPrices = await Promise.all(chosenItems.map(async (item) => item.locator('.inventory_item_price').innerText()));

        expect(await app.inventory.getNumberOfItemsInCart()).toBe('2');

        await app.inventory.shoppingCart.click();
        const cartItems = await app.shoppingCart.getProductNames();
        expect(cartItems).toEqual(itemNames);

        const cartItemDescriptions = await app.shoppingCart.getProductDescriptions();
        expect(cartItemDescriptions).toEqual(itemDescriptions);

        const cartItemPrices = await app.shoppingCart.getProductPrices();
        expect(cartItemPrices).toEqual(itemPrices);
    });
});
