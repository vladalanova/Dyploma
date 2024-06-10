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
        // await sendEmail(data);
        // generatePDF(data);
    } catch (error) {
        console.error('Помилка при обробці форми:', error.message);
    }
});

async function sendDataToServer(data) {
    try {
        const response = await fetch('http://localhost:3000/sendData', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Помилка відправки даних на сервер');
        }

        const responseData = await response.text();
        console.log('Відповідь сервера:', responseData);
    } catch (error) {
        console.error('Помилка:', error.message);
        throw error;
    }
}

async function sendEmail(data) {
    try {
        const response = await fetch("http://localhost:3000/sendEmail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Помилка при відправці листа');
        }

        const responseData = await response.json();
        console.log('Відповідь сервера при відправці листа:', responseData);
    } catch (error) {
        console.error("Помилка під час взаємодії з сервером (sendEmail):", error);
        throw error;
    }
}
function generatePDF(data) {
    const pdfData = {
        content: [
            { text: "Електронне направлення", style: "header" },
            { text: `№ направлення: ${data.referralNumber}`, fontSize: 14, margin: [0, 0, 0, 10] },
            { text: `Лікар: ${data.doctorName}`, fontSize: 14, margin: [0, 0, 0, 10] },
            { text: `Назва обстеження: ${data.examinationName}`, fontSize: 14, margin: [0, 0, 0, 10] },
            { text: `ПІБ пацієнта: ${data.patientFullName}`, fontSize: 14, margin: [0, 0, 0, 10] },
            { text: `Попередній діагноз: ${data.previousDiagnosis}`, fontSize: 14, margin: [0, 0, 0, 10] },
            { text: `Дата виписування направлення: ${data.issueDate}`, fontSize: 14, margin: [0, 0, 0, 10] },
            { text: `Пріоритет: ${data.priority}`, fontSize: 14, margin: [0, 0, 0, 10] },
            { text: `Термін придатності: ${data.expiryDate}`, fontSize: 14, margin: [0, 0, 0, 10] },
            { text: `№ медичної картки пацієнта: ${data.patientID}`, fontSize: 14, margin: [0, 0, 0, 10] },
            { text: `Код послуги: ${data.serviceCode}`, fontSize: 14, margin: [0, 0, 0, 10] },
            { text: `№ ліцензії лікаря: ${data.doctorID}`, fontSize: 14, margin: [0, 0, 0, 10] },
            { text: `Найменування закладу охорони здоров’я: ${data.healthCareFacility}`, fontSize: 14, margin: [0, 0, 0, 10] },
            { text: `Код за ЄДРПОУ/РНОКПП: ${data.healthCareCode}`, fontSize: 14, margin: [0, 0, 0, 10] },
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                alignment: "center",
                margin: [0, 0, 0, 20],
            },
        },
    };

    console.log("Дані для PDF сформовані");

    pdfMake.createPdf(pdfData).getBlob((blob) => {
        const pdfUrl = URL.createObjectURL(blob);
        const pdfViewer = document.getElementById('pdfViewer'); 
        const downloadLink = document.getElementById('downloadLink'); 
        pdfViewer.src = pdfUrl;
        downloadLink.style.display = "block";
        downloadLink.href = pdfUrl;
        downloadLink.download = "referral_information.pdf";
        console.log("PDF збережено та відображено");
    });
}
