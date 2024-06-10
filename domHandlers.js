// domHandlers.js
const { generateReferralNumber } = require('./functions.js');

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
