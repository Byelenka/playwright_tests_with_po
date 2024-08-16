// @ts-check
/**
 * @param {number} num
 * @param {number} precision
 */
export function roundTo(num, precision) {
    const factor = 10 ** precision;
    return Math.round(num * factor) / factor;
}
