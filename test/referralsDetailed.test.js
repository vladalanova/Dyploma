const { generateReferralNumber, generateRandomString } = require('../functions.js');

describe('generateReferralNumber', () => {
    it('should generate a valid referral number with four parts', () => {
        const referralNumber = generateReferralNumber();
        const parts = referralNumber.split('-');
        expect(parts.length).toBe(4);
    });

    it('should generate a valid referral number with four digits in each part', () => {
        const referralNumber = generateReferralNumber();
        const parts = referralNumber.split('-');
        parts.forEach(part => {
            expect(part).toHaveLength(4);
        });
    });

    it('should generate a unique referral number each time', () => {
        const referralNumber1 = generateReferralNumber();
        const referralNumber2 = generateReferralNumber();
        expect(referralNumber1).not.toBe(referralNumber2);
    });
});

describe('generateRandomString', () => {
    const charactersSets = ['К4НК', '9Т6М', '3А20', 'ABCDE', '12345'];
    charactersSets.forEach((characters, index) => {
        it(`should generate a string of the specified length from the set ${characters}`, () => {
            const length = 4;
            const randomString = generateRandomString(length, characters);
            expect(randomString).toHaveLength(length);
            randomString.split('').forEach(char => {
                expect(characters).toContain(char);
            });
        });
    });
});
