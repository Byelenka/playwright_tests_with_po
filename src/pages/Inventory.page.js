/* eslint-disable no-restricted-syntax */
// @ts-check
import { BaseSwagLabPage } from './BaseSwagLab.page';
import { getRandomLocators } from '../getRandomLocators.helper';

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    headerTitle = this.page.locator('.title');

    inventoryItems = this.page.locator('.inventory_item');

    inventoryItemNames = this.page.locator('.inventory_item_name');

    inventoryItemDescription = this.page.locator('.inventory_item_desc');

    addItemToCartButton = this.page.locator('[id^="add-to-cart"]');

    removeItemFromCartButton = this.page.locator('[id^="remove"]');

    sortItems = this.page.locator('.product_sort_container');

    itemPrices = this.page.locator('.inventory_item_price');

    async addItemToCartById(id) {
        await this.addItemToCartButton.nth(id).click();
    }

    async AddItemToCart(index) {
        await this.page.locator('.inventory_item [id^="add-to-cart"]').nth(index).click();
    }

    async getProductNames() {
        const productNames = await this.inventoryItemNames.allInnerTexts();
        return productNames.map((el) => el.trim());
    }

    async getProductPrices() {
        const productPrices = await this.itemPrices.allInnerTexts();
        return productPrices.map((el) => parseFloat(el.replace('$', '')));
    }

    /**
     * @param {string | import("playwright-core").ElementHandle<Node> | readonly string[] | { value?: string; label?: string; index?: number; } | readonly import("playwright-core").ElementHandle<Node>[] | readonly { value?: string; label?: string; index?: number; }[] | null} option
     */
    async selectSorting(option) {
        await this.sortItems.selectOption(option);
    }

    async addRandomProductsToCart() {
        const itemsLocators = await this.inventoryItems.all();
        const chosenItems = getRandomLocators(itemsLocators);

        const result = [];

        for await (const element of chosenItems) {
            await element.locator('[id^="add-to-cart"]').click();

            const name = (await element.locator('.inventory_item_name').innerText()).trim();
            const description = (await element.locator('.inventory_item_desc').innerText()).trim();
            const price = (await element.locator('.inventory_item_price').innerText()).trim();

            result.push({ name, description, price });
        }

        return result;
    }
}
