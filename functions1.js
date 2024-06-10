function generateReferralNumber() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-';
    return generateRandomString(10, characters);
}
function generateRandomString(length, characters) {
    if (typeof characters !== 'string' || characters.length === 0) {
        throw new Error('Characters set must be a non-empty string.');
    }
    if (length <= 0) {
        throw new Error('Length must be a positive number.');
    }
    if (/[^A-Za-z0-9]/.test(characters)) {
        throw new Error('Characters set must only contain alphanumeric characters.');
    }

    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
module.exports = { generateReferralNumber, generateRandomString };