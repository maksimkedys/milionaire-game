import { getAnswerLetter } from './getAnswerLetter';

describe('getAnswerLetter', () => {
    it('should return A for index 0', () => {
        expect(getAnswerLetter(0)).toBe('A');
    });

    it('should return B for index 1', () => {
        expect(getAnswerLetter(1)).toBe('B');
    });

    it('should return C for index 2', () => {
        expect(getAnswerLetter(2)).toBe('C');
    });

    it('should return D for index 3', () => {
        expect(getAnswerLetter(3)).toBe('D');
    });

    it('should return Z for index 25', () => {
        expect(getAnswerLetter(25)).toBe('Z');
    });

    it('should return consecutive letters', () => {
        expect(getAnswerLetter(4)).toBe('E');
        expect(getAnswerLetter(5)).toBe('F');
        expect(getAnswerLetter(6)).toBe('G');
    });

    it('should return a string for any index', () => {
        const result = getAnswerLetter(10);
        expect(typeof result).toBe('string');
        expect(result.length).toBe(1);
    });
});
