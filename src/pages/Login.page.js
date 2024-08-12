// @ts-check
import { BasePage } from './Base.page';

export class LoginPage extends BasePage {
    userNameInput = this.page.locator('#user-name');

    passwordInput = this.page.locator('#password');

    loginButton = this.page.locator('#login-button');

    /**
     * @param {string} userName
     * @param {string} password
     */
    async performLogin(userName, password) {
        await this.userNameInput.fill(userName);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}
