
async function sendDataToServer(data) {
    try {
        const response = await fetch('http://localhost:3000/sendData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Помилка відправки даних на сервер');
        }

        const responseData = await response.text();
        console.log(responseData);
    } catch (error) {
        console.error('Помилка:', error.message);
    }
}


document.getElementById('directionForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const patientFullName = document.getElementById('patientFullName').value;
    const familyDoctorName = document.getElementById('doctorName').value;
    const issueDate = document.getElementById('issueDate').value;
    const healthCareFacility = document.getElementById('healthCareFacility').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const priority = document.getElementById('priority').value;
    const validityPeriod = document.getElementById('expiryDate').value;
    const serviceCode = document.getElementById('serviceCode').value;
    const edrpouCode = document.getElementById('healthCareCode').value;
    let type;
if (familyDoctorName) {
        type = 'Ц';
    } else {
        type = 'Д';
    }
    const data = {
        type: type,
        patientFullName: patientFullName,
        familyDoctorName: familyDoctorName,
        issueDate: issueDate,
        healthCareFacility: healthCareFacility,
        phoneNumber: phoneNumber,
        priority: priority,
        validityPeriod: validityPeriod,
        serviceCode: serviceCode,
        edrpouCode: edrpouCode
    };
    await sendDataToServer(data);
});
