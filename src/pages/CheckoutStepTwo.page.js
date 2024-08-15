// @ts-check
import { BaseSwagLabPage } from './BaseSwagLab.page';
import { roundTo } from '../roundTo.helper';

export class CheckoutStepTwoPage extends BaseSwagLabPage {
    url = '/checkout-step-two.html';

    checkoutItemNames = this.page.locator('.inventory_item_name');

    checkoutItemDescription = this.page.locator('.inventory_item_desc');

    checkoutItemPrice = this.page.locator('.inventory_item_price');

    checkoutTotal = this.page.locator('.summary_total_label');

    async getProductNames() {
        const productNames = await this.checkoutItemNames.allInnerTexts();
        return productNames.map((el) => el.trim());
    }

    async getProductDescriptions() {
        const productDescriptions = await this.checkoutItemDescription.allInnerTexts();
        return productDescriptions.map((el) => el.trim());
    }

    async getProductPrices() {
        const productPrices = await this.checkoutItemPrice.allInnerTexts();
        return productPrices.map((el) => el.trim());
    }

    async calculateTotalPrice() {
        const productPrices = await this.getProductPrices();
        const arrayOfPrices = productPrices.map((el) => parseFloat(el.replace('$', '')));
        const sum = arrayOfPrices.reduce((a, b) => a + b);
        return roundTo(sum * 1.08, 2);
    }

    async getTotalPrice() {
        const totalPrice = await this.checkoutTotal.textContent();
        // @ts-ignore
        return parseFloat(totalPrice.match(/[\d,]+\.\d{2}/));
    }
}
