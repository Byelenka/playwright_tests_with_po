// @ts-check
import { BaseSwagLabPage } from './BaseSwagLab.page';

export class CheckoutStepOnePage extends BaseSwagLabPage {
    url = '/checkout-step-one.html';

    checkoutFirstName = this.page.locator('#first-name');

    checkoutLastName = this.page.locator('#last-name');

    checkoutZip = this.page.locator('#postal-code');

    checkoutContinueButton = this.page.locator('#continue');

    checkoutError = this.page.locator('[data-test="error"]');

    /**
     * @param {string} firstName
     * @param {string} lastName
     * @param {string} zip
     */
    async fillYourInformation(firstName, lastName, zip) {
        await this.checkoutFirstName.fill(firstName);
        await this.checkoutLastName.fill(lastName);
        await this.checkoutZip.fill(zip);
    }

    /**
     * @param {string} firstName
     */
    async fillFirstName(firstName) {
        await this.checkoutFirstName.fill(firstName);
    }

    /**
     * @param {string} lastName
     */
    async fillLastName(lastName) {
        await this.checkoutLastName.fill(lastName);
    }

    /**
     * @param {string} zip
     */
    async fillZip(zip) {
        await this.checkoutZip.fill(zip);
    }

    async clickCheckoutContinueButton() {
        await this.checkoutContinueButton.click();
    }
}
