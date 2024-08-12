// @ts-check
import { BaseSwagLabPage } from './BaseSwagLab.page';

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    headerTitle = this.page.locator('.title');

    inventoryItems = this.page.locator('.inventory_item');

    inventoryItemNames = this.page.locator('.inventory_item_name');

    addItemToCartButton = this.page.locator('[id^="add-to-cart"]');

    sortItems = this.page.locator('.product_sort_container');

    itemPrices = this.page.locator('.inventory_item_price');

    async addItemToCartById(id) {
        await this.addItemToCartButton.nth(id).click();
    }

    async getProductNames() {
        return (await this.inventoryItemNames.allInnerTexts()).map((el) => el.trim());
    }

    async getProductPrices() {
        return (await this.itemPrices.allInnerTexts()).map((el) => parseFloat(el.replace('$', '')));
    }

    /**
     * @param {string | import("playwright-core").ElementHandle<Node> | readonly string[] | { value?: string; label?: string; index?: number; } | readonly import("playwright-core").ElementHandle<Node>[] | readonly { value?: string; label?: string; index?: number; }[] | null} option
     */
    async selectSorting(option) {
        await this.sortItems.selectOption(option);
    }
}
