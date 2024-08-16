import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { users } from '../test-data/users';

const { username, password } = users.standardUser;

test.beforeEach(async (
    /** @type {{ app: import('../pages/Application').Application }} */{ app },
) => {
    await app.login.navigate();
    await app.login.performLogin(username, password);
});

test.describe('Tests for Shopping card', () => {
    test('Verify that items are added correctly to the Shopping card', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        const items = await app.inventory.addRandomProductsToCart();
        const itemNames = items.map((item) => item.name);
        const itemDescriptions = items.map((item) => item.description);
        const itemPrices = items.map((item) => item.price);

        await app.inventory.shoppingCart.click();

        const cartItems = await app.shoppingCart.getProductNames();
        expect(cartItems).toEqual(itemNames);

        const cartItemDescriptions = await app.shoppingCart.getProductDescriptions();
        expect(cartItemDescriptions).toEqual(itemDescriptions);

        const cartItemPrices = await app.shoppingCart.getProductPrices();
        expect(cartItemPrices).toEqual(itemPrices);

        await app.shoppingCart.removeCartItemById(0);
        const cartItemsNotRemoved = await app.shoppingCart.getProductNames();
        itemNames.shift();
        expect(cartItemsNotRemoved).toEqual(itemNames);
    });
});
