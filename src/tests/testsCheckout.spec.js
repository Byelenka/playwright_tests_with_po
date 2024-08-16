import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { users } from '../test-data/users';
import { usersInfo } from '../test-data/usersInfo';

const { username, password } = users.standardUser;
const { firstName, lastName, zip } = usersInfo.standardUserInfo;

test.beforeEach(async (
    /** @type {{ app: import('../pages/Application').Application }} */{ app },
) => {
    await app.login.navigate();
    await app.login.performLogin(username, password);
});

test.describe('Tests for Checkout', () => {
    test('Items and total price are correct on checkout', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        const items = await app.inventory.addRandomProductsToCart();
        const itemNames = items.map((item) => item.name);
        const itemDescriptions = items.map((item) => item.description);
        const itemPrices = items.map((item) => item.price);

        await app.inventory.shoppingCart.click();

        await app.shoppingCart.cartCheckoutButton.click();
        await expect(app.checkoutStepOne.checkoutError).toBeHidden();

        await app.checkoutStepOne.checkoutContinueButton.click();
        await expect(app.checkoutStepOne.checkoutError).toBeVisible();
        await expect(app.checkoutStepOne.checkoutError).toHaveText('Error: First Name is required');

        await app.checkoutStepOne.fillFirstName(firstName);
        await app.checkoutStepOne.checkoutContinueButton.click();
        await expect(app.checkoutStepOne.checkoutError).toHaveText('Error: Last Name is required');

        await app.checkoutStepOne.fillLastName(lastName);
        await app.checkoutStepOne.checkoutContinueButton.click();
        await expect(app.checkoutStepOne.checkoutError).toHaveText('Error: Postal Code is required');

        await app.checkoutStepOne.fillZip(zip);
        await app.checkoutStepOne.checkoutContinueButton.click();

        const checkoutItems = await app.checkoutStepTwo.getProductNames();
        expect(checkoutItems).toEqual(itemNames);

        const checkoutItemDescriptions = await app.checkoutStepTwo.getProductDescriptions();
        expect(checkoutItemDescriptions).toEqual(itemDescriptions);

        const checkoutItemPrices = await app.checkoutStepTwo.getProductPrices();
        expect(checkoutItemPrices).toEqual(itemPrices);

        const subTotalPrice = await app.checkoutStepTwo.calculateSubTotalPrice();
        const subTotal = await app.checkoutStepTwo.getSubTotalPrice();
        expect(subTotal).toEqual(subTotalPrice);

        const totalPrice = await app.checkoutStepTwo.calculateTotalPrice();
        const price = await app.checkoutStepTwo.getTotalPrice();
        expect(price).toEqual(totalPrice);
    });
});
