// referrals.js
function generateReferralNumber() {
    const part1 = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const part2 = generateRandomString(4, 'К4НК');
    const part3 = generateRandomString(4, '9Т6М');
    const part4 = generateRandomString(4, '3А20');
    return `${part1}-${part2}-${part3}-${part4}`;
}

function generateRandomString(length, characters) {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = { generateReferralNumber, generateRandomString };
