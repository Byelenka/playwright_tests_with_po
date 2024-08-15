// @ts-check
import { BaseSwagLabPage } from './BaseSwagLab.page';

export class ShoppingCartPage extends BaseSwagLabPage {
    url = '/cart.html';

    cartItemSelector = '.cart_item';

    removeItemSelector = '[id^="remove"]';

    headerTitle = this.page.locator('.title');

    cartItemNames = this.page.locator('.inventory_item_name');

    cartItemDescription = this.page.locator('.inventory_item_desc');

    cartItemPrice = this.page.locator('.inventory_item_price');

    cartItems = this.page.locator(this.cartItemSelector);

    cartCheckoutButton = this.page.locator('[id="checkout"]');

    // async below added to show the function returns a promise
    async getCartItemByName(name) {
        return this.page.locator(this.cartItemSelector, { hasText: name });
    }

    async removeCartItemByName(name) {
        const item = await this.getCartItemByName(name);
        return item.locator(this.removeItemSelector);
    }

    async removeCartItemById(id) {
        await this.cartItems.nth(id).locator(this.removeItemSelector).click();
    }

    async getProductNames() {
        const productNames = await this.cartItemNames.allInnerTexts();
        return productNames.map((el) => el.trim());
    }

    async getProductDescriptions() {
        const productDescriptions = await this.cartItemDescription.allInnerTexts();
        return productDescriptions.map((el) => el.trim());
    }

    async getProductPrices() {
        const productPrices = await this.cartItemPrice.allInnerTexts();
        return productPrices.map((el) => el.trim());
    }
}
