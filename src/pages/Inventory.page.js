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
}
