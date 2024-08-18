// @ts-check
import { BaseSwagLabPage } from './BaseSwagLab.page';
import { roundTo } from '../helpers/roundTo.helper';

export class CheckoutStepTwoPage extends BaseSwagLabPage {
    url = '/checkout-step-two.html';

    checkoutItemNames = this.page.locator('.inventory_item_name');

    checkoutItemDescription = this.page.locator('.inventory_item_desc');

    checkoutItemPrice = this.page.locator('.inventory_item_price');

    checkoutSubTotalPrice = this.page.locator('.summary_subtotal_label');

    checkoutTotalPrice = this.page.locator('.summary_total_label');

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

    async calculateSubTotalPrice() {
        const productPrices = await this.getProductPrices();
        const arrayOfPrices = productPrices.map((el) => parseFloat(el.replace('$', '')));
        const sum = arrayOfPrices.reduce((a, b) => a + b);
        return sum;
    }

    async getSubTotalPrice() {
        const subTotalPrice = await this.checkoutSubTotalPrice.textContent();
        // @ts-ignore
        return parseFloat(subTotalPrice.match(/[\d.]+/));
    }

    async calculateTotalPrice() {
        const productPrices = await this.getProductPrices();
        const arrayOfPrices = productPrices.map((el) => parseFloat(el.replace('$', '')));
        const sum = arrayOfPrices.reduce((a, b) => a + b);
        return roundTo(sum * 1.08, 2);
    }

    async getTotalPrice() {
        const totalPrice = await this.checkoutTotalPrice.textContent();
        // @ts-ignore
        return parseFloat(totalPrice.match(/[\d.]+/));
    }
}
