// @ts-check
import { BaseSwagLabPage } from './BaseSwagLab.page';

export class CheckoutStepOnePage extends BaseSwagLabPage {
    url = '/checkout-step-one.html';

    checkoutFirstName = this.page.locator('[id="first-name"]');

    checkoutLastName = this.page.locator('[id="last-name"]');

    checkoutZip = this.page.locator('[id="postal-code"]');

    checkoutContinueButton = this.page.locator('[id="continue"]');

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
}
