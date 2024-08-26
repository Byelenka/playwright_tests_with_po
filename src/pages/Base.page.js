// @ts-check
export class BasePage {
    url = '';

    /**
     * @param {import("playwright-core").Page} page
     */
    constructor(page) {
        this.page = page;
    }

    // async below added to show the function returns a promise
    async getUrl() {
        return this.page.url();
    }

    /**
     * @param {string} url
     */
    async goto(url) {
        await this.page.goto(url);
    }

    /**
     * @param {string | RegExp | ((url: URL) => boolean)} url
     */
    async waitForURL(url) {
        await this.page.waitForURL(url);
    }

    context() {
        return this.page.context();
    }
}
