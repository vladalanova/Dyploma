document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("patientForm");
    const pdfViewer = document.getElementById("pdfViewer");
    const downloadLink = document.getElementById("downloadLink");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      console.log("Форма була відправлена.");
  
      const referralNumber = document.getElementById("referralNumber").value;
      const medicalCardNumber = document.getElementById("medicalCardNumber").value;
      const age = document.getElementById("age").value;
      const gender = document.getElementById("gender").value;
      const birthDate = document.getElementById("birthDate").value;
      const previousDiagnosis = document.getElementById("previousDiagnosis").value;
      const allergies = document.getElementById("allergies").value;
      const additionalExaminations = document.getElementById("additionalExaminations").value;
      const conclusion = document.getElementById("conclusion").value;
      const diagnosis = document.getElementById("diagnosis").value;
      const prescription = document.getElementById("prescriptions").value;
  
      console.log("Дані з форми отримані.");
  
      const pdfData = {
        content: [
          { text: "Медична інформація", style: "header" },
          { text: "№ медичної картки пацієнта: " + medicalCardNumber },
          { text: "Номер направлення: " + referralNumber },
          { text: "Вік: " + age },
          { text: "Стать: " + gender },
          { text: "Дата народження: " + birthDate },
          { text: "Попередній діагноз: " + previousDiagnosis },
          { text: "Алергії: " + allergies },
          { text: "Додаткові обстеження: " + additionalExaminations },
          { text: "Заключення: " + conclusion },
          { text: "Діагноз: " + diagnosis },
          { text: "Призначення: " + prescription },
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            alignment: "center",
          },
        },
      };
  
      console.log("Дані для PDF сформовані.");
  
      pdfMake.createPdf(pdfData).getBlob((blob) => {
        const pdfUrl = URL.createObjectURL(blob);
        pdfViewer.src = pdfUrl;
        downloadLink.style.display = "block";
        downloadLink.href = pdfUrl;
        downloadLink.download = "patient_information.pdf";
        console.log("PDF збережено та відображено.");
        console.log("Операція завершена.");
        
      });
    });
  });