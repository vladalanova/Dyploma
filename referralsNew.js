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

async function sendDataToServer(data) {
    const response = await fetch('http://localhost:3000/sendData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Помилка відправки даних на сервер');
    }

    return await response.text();
}

function initForm() {
    if (typeof document !== 'undefined') {
        document.getElementById('directionForm').addEventListener('submit', async (event) => {
            event.preventDefault();

            const patientFullName = document.getElementById('patientFullName').value;
            const doctorName = document.getElementById('doctorName').value;
            const examinationName = document.getElementById('examinationName').value;
            const previousDiagnosis = document.getElementById('previousDiagnosis').value;
            const issueDate = document.getElementById('issueDate').value;
            const priority = document.getElementById('priority').value;
            const expiryDate = document.getElementById('expiryDate').value;
            const patientID = document.getElementById('patientID').value;
            const serviceCode = document.getElementById('serviceCode').value;
            const doctorID = document.getElementById('doctorID').value;
            const healthCareFacility = document.getElementById('healthCareFacility').value;
            const healthCareCode = document.getElementById('healthCareCode').value;
            const phoneNumber = document.getElementById('phoneNumber').value;
            const email = document.getElementById('email').value;

            const referralNumber = generateReferralNumber();

            const data = {
                referralNumber: referralNumber,
                patientFullName: patientFullName,
                doctorName: doctorName,
                examinationName: examinationName,
                previousDiagnosis: previousDiagnosis,
                issueDate: issueDate,
                priority: priority,
                expiryDate: expiryDate,
                patientID: patientID,
                serviceCode: serviceCode,
                doctorID: doctorID,
                healthCareFacility: healthCareFacility,
                healthCareCode: healthCareCode,
                phoneNumber: phoneNumber,
                email: email
            };

            try {
                generatePDF(data);
                sendEmail(data);
                await sendDataToServer(data);
            } catch (error) {
                console.error('Помилка при обробці форми:', error.message);
            }
        });
    }
}

module.exports = { generateReferralNumber, generateRandomString, sendDataToServer, initForm};
