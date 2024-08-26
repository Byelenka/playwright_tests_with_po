import { expect } from '@playwright/test';
import { test } from '../fixtures/base';

const authFile = 'playwright/.auth/user.json';

test.use({ storageState: authFile });

test.describe('Tests for Shopping card', () => {
    test.beforeEach(async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app, baseURL },
    ) => {
        await app.inventory.goto(baseURL + app.inventory.url);
    });

    test('Verify that items are added correctly to the Shopping card', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        const items = await app.inventory.addRandomProductsToCart();
        const itemNames = items.map((item) => item.name);
        const itemDescriptions = items.map((item) => item.description);
        const itemPrices = items.map((item) => item.price);

        await app.inventory.clickShoppingCartButton();

        const cartItems = await app.shoppingCart.getProductNames();
        expect(cartItems).toEqual(itemNames);

        const cartItemDescriptions = await app.shoppingCart.getProductDescriptions();
        expect(cartItemDescriptions).toEqual(itemDescriptions);

        const cartItemPrices = await app.shoppingCart.getProductPrices();
        expect(cartItemPrices).toEqual(itemPrices);
    });

    test('Verify that item is removed correctly from the Shopping cart', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        const items = await app.inventory.addRandomProductsToCart();
        const itemNames = items.map((item) => item.name);

        await app.inventory.clickShoppingCartButton();

        const cartItems = await app.shoppingCart.getProductNames();
        expect(cartItems).toEqual(itemNames);

        await app.shoppingCart.removeCartItemById(0);
        const cartItemsNotRemoved = await app.shoppingCart.getProductNames();
        itemNames.shift();
        expect(cartItemsNotRemoved).toEqual(itemNames);
    });
});
