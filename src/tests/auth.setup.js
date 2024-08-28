import { expect } from '@playwright/test';
import { test as setup } from '../fixtures/base';
import { users } from '../test-data/users';

const { username, password } = users.standardUser;

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async (
    /** @type {{ app: import('../pages/Application').Application }} */{ app },
) => {
    // Perform authentication steps.
    await app.login.goto('/');
    await app.login.performLogin(username, password);
    // Wait until the page receives the cookies.
    //
    // Sometimes login flow sets cookies in the process of several redirects.
    // Wait for the final URL to ensure that the cookies are actually set.
    await app.inventory.waitForURL(app.inventory.url);
    // Alternatively, you can wait until the page reaches a state where all cookies are set.
    // eslint-disable-next-line playwright/no-standalone-expect
    await expect(app.inventory.headerTitle).toBeVisible();

    // End of authentication steps.

    await app.inventory.context().storageState({ path: authFile });
});
