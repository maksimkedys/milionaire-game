import { formatMoney } from './formatters';

describe('formatMoney', () => {
    it('should format numbers with dollar sign and commas', () => {
        expect(formatMoney(1000)).toBe('$1,000');
        expect(formatMoney(1000000)).toBe('$1,000,000');
        expect(formatMoney(500)).toBe('$500');
    });

    it('should handle zero', () => {
        expect(formatMoney(0)).toBe('$0');
    });

    it('should handle large numbers', () => {
        expect(formatMoney(1234567890)).toBe('$1,234,567,890');
    });

    it('should handle small numbers', () => {
        expect(formatMoney(1)).toBe('$1');
        expect(formatMoney(99)).toBe('$99');
    });

    it('should handle decimal numbers by rounding', () => {
        // Assuming the function rounds or truncates decimals
        const result = formatMoney(1000.99);
        expect(result).toMatch(/^\$1,000/);
    });

    it('should handle negative numbers', () => {
        const result = formatMoney(-1000);
        expect(result).toContain('-');
        expect(result).toContain('1,000');
    });
});
