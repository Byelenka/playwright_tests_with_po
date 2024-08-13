// @ts-check
export function getRandomLocators(locators) {
    if (locators.length < 2) {
        throw new Error('Array must contain at least two locators');
    }

    const index1 = Math.floor(Math.random() * locators.length);
    let index2;

    do {
        index2 = Math.floor(Math.random() * locators.length);
    } while (index2 === index1);

    return [locators[index1], locators[index2]];
}
