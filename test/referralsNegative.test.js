const { generateRandomString } = require('../functions1.js');
describe('generateRandomString', () => {
    it('should throw an error when character set is empty', () => {
        expect(() => generateRandomString(4, '')).toThrow('Characters set must be a non-empty string.');
    });

    it('should throw an error when length is negative', () => {
        expect(() => generateRandomString(-1, 'ABCDE')).toThrow('Length must be a positive number.');
    });

    it('should throw an error when length is zero', () => {
        expect(() => generateRandomString(0, 'ABCDE')).toThrow('Length must be a positive number.');
    });

    it('should throw an error when character set contains invalid characters', () => {
        expect(() => generateRandomString(4, 'A B*C')).toThrow('Characters set must only contain alphanumeric characters.');
    });

    it('should throw an error when character set is not a string', () => {
        expect(() => generateRandomString(4, 12345)).toThrow('Characters set must be a non-empty string.');
    });
});
