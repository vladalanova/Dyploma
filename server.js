const express = require('express');
const bodyParser = require('body-parser');
const { ethers } = require('ethers');
const nodemailer = require('nodemailer');
const cors = require('cors');
const mssql = require('mssql/msnodesqlv8');
const app = express();
const port = 3000;
app.get('/', (req, res) => {
    res.send('Hello!');
  });
  var dbConfig = {
    server: 'DESKTOP-CSFCFTG\\SQLEXPRESS',
    database: 'MyDyploma',
    driver: 'msnodesqlv8',
    options: {
      trustedConnection: true,
    },
  };
  app.use(cors());
  app.use(cors({
    origin: '*',
    methods: 'POST, GET, OPTIONS, PUT, DELETE',
    allowedHeaders: 'Origin, application/json, X-Requested-With, Content-Type, Accept, Authorization',
  }));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../project/referrals/referrals.html'));
  });
  app.options('/saveReferral', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).send();
  });

const contractAddress = '0xa145242b8720c5Ce5c80A040cac47a8013F553fb';
const contractABI = [
    {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "availabilityData",
        "outputs": [
          {
            "internalType": "string",
            "name": "priority",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "validityPeriod",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "edrpouCode",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "serviceCode",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "confIntAvData",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "examinationNameHash",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "specialistHash",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "confIntData",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "medicalCardNumberHash",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "integrityAvailabilityData",
        "outputs": [
          {
            "internalType": "string",
            "name": "referralNumber",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "integrityData",
        "outputs": [
          {
            "internalType": "string",
            "name": "patientFullName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "referralDate",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "healthCareFacilityName",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_patientFullName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_referralDate",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_healthCareFacilityName",
            "type": "string"
          }
        ],
        "name": "addIntegrityData",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_priority",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_validityPeriod",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_edrpouCode",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_serviceCode",
            "type": "string"
          }
        ],
        "name": "addAvailabilityData",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_referralNumber",
            "type": "string"
          }
        ],
        "name": "addIntegrityAvailabilityData",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_medicalCardNumberHash",
            "type": "bytes32"
          }
        ],
        "name": "addConfIntData",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_examinationNameHash",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "_specialistHash",
            "type": "bytes32"
          }
        ],
        "name": "addConfIntAvData",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_str",
            "type": "string"
          }
        ],
        "name": "hashString",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "pure",
        "type": "function",
        "constant": true
      }
];
const provider = new ethers.providers.JsonRpcProvider('HTTP://127.0.0.1:7545');
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, contractABI, signer);

async function writeToBlockchain(data) {
    const cData = {
        patientName: data.patientFullName,
        referralDate: data.issueDate,
        medicalInstitutionName: data.healthCareFacility
    };
    
    const dData = {
        priority: data.priority,
        validityPeriod: data.expiryDate,
        edrpouCode: data.healthCareCode,
        serviceCode: data.serviceCode
        
    };
    const cdData = {
        referralNumber: data.referralNumber
    }
    const confIntDataHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(data.patientID));

    const confIntAvDataHash = {
        examinationNameHash: ethers.utils.keccak256(ethers.utils.toUtf8Bytes(data.examinationName)),
        specialistHash: ethers.utils.keccak256(ethers.utils.toUtf8Bytes(data.doctorName))
    };
        const { referralNumber } = cdData;
        const transaction = await contract.connect(signer).addIntegrityAvailabilityData(referralNumber);
        await transaction.wait();
        console.log('Transaction Hash:', transaction.hash);
        const { patientName, referralDate, medicalInstitutionName } = cData;
        await contract.connect(signer).addIntegrityData(patientName, referralDate, medicalInstitutionName);

        const { priority, validityPeriod, edrpouCode, serviceCode} = dData;
        await contract.connect(signer).addAvailabilityData( priority, validityPeriod, edrpouCode, serviceCode);

        await contract.addConfIntData(confIntDataHash);
        await contract.addConfIntAvData(confIntAvDataHash.examinationNameHash, confIntAvDataHash.specialistHash);
        return transaction.hash;
   
}
// async function writePatientsToBlockchain(data) {
//   const cardNumberHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(data.cardNumber)).toHexString();
//   const referralNumberHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(data.referralNumber)).toHexString();
//   const transaction1 = await contract.addConfIntData(cardNumberHash);
//   const transaction2 = await contract.addConfIntData(referralNumberHash);
//   return { 
//     patientID: cardNumberHash,
//     referralNumber: referralNumberHash
//   };
// }

async function saveToDatabase(data) {
  try {
      await mssql.connect(dbConfig);
      const request = new mssql.Request();
      await request.input('ReferralNumber', mssql.NVarChar, data.referralNumber) 
          .input('PatientID', mssql.NVarChar, data.patientID) 
          .input('Diagnosis', mssql.NVarChar, data.previousDiagnosis)
          .input('EDRPOUCode', mssql.NVarChar, data.healthCareCode)
          .query(`
              INSERT INTO Referrals (
                  ReferralNumber, PatientID, Diagnosis, EDRPOUCode
              ) VALUES (
                  @ReferralNumber, @PatientID, @Diagnosis, @EDRPOUCode
              )
          `);
  } catch (err) {
      console.error('Database insert error:', err);
  } finally {
      mssql.close();
  }
}

async function sendSMS(data) {
  try {
    const smsResponse = await fetch(
      'https://api-gateway.kyivstar.ua/sandbox/rest/v1beta/sms',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer HbtaPO4AdQCl8NQs9F8hsn96gSiJuUpmSHXzNssSRrM.nhiW3MVLs9DDpp86HWw4x-XKS0RUa76o41YK0Q-u4Z0'
        },
        body: JSON.stringify({
          "from": "messagedesk",
          "to": '+380987473339',
          "text": `Ваш № направлення: ${data.referralNumber}`,
        }),
      }
    );

    if (smsResponse.ok) {
      console.log('SMS відправлено успішно');
    } else {
      console.error('Помилка при відправленні SMS:', await smsResponse.json());
    }
  } catch (error) {
    console.error('Помилка при відправленні SMS:', error);
  }
}

app.use(bodyParser.json());


app.post('/sendData', async (req, res) => {
  const data = req.body;

  try {
    const transactionHash = await writeToBlockchain(data);
    await saveToDatabase(data, transactionHash);

      res.send('Data successfully saved to blockchain and database.');
  } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).send('Error saving data');
  }
});

app.post('/patients', (req, res) => {
  const newPatient = req.body;
  console.log('Дані нового пацієнта:', newPatient); 
  const query = `INSERT INTO Patients (PatientID, PhoneNumber, Email, Gender) 
                 VALUES ('${newPatient.cardNumber}', '${newPatient.phone}', '${newPatient.email}', '${newPatient.gender}')`;

  mssql.connect(dbConfig)
      .then(pool => {
          return pool.request().query(query);
      })
      // .then(result => {
      //     result = console.log('New patient added:', newPatient);
      //     res.status(201).json(newPatient);
      // })
      .catch(error => {
          console.error('Error adding patient:', error);
          res.status(500).json({ error: 'Error adding patient' });
      });
});

app.get('/patients', (req, res) => {
const query = 'SELECT * FROM Patients';

console.log('GET request received at /patients'); 

mssql.connect(dbConfig)
    .then(pool => {
        console.log('Connected to database');
        return pool.request().query(query);
    })
    .then(result => {
        console.log('Query executed successfully');
        res.json(result.recordset);
    })
    .catch(error => {
        console.error('Error fetching patients:', error);
        res.status(500).json({ error: 'Error fetching patients' });
    });
});

app.post('/sendEmail', async (req, res) => {
    console.log('Отримано POST-запит на маршрут /sendEmail');
    try {
        const { email, referralNumber, doctorName } = req.body;
        console.log('Дані з запиту:', { email, referralNumber, doctorName });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'lanovaia02y@gmail.com',
                pass: 'pmly cnma gxsh sdeu', 
            },
        });

        const mailOptions = {
            from: 'lanovaia02y@gmail.com',
            to: email,
            subject: 'Your Health',
            text: `Ваш № направлення: ${referralNumber} до ${doctorName}`,
        };

        console.log('Надсилаємо лист...');
        const info = await transporter.sendMail(mailOptions);
        await sendSMS({referralNumber });
        console.log('Лист успішно відправлено:', info);
        res.status(200).send('ReferralNumber sent to email.');
    } catch (err) {
        console.error('Помилка при відправленні email:', err);
        res.status(500).send('Помилка при відправленні email');
    }
});

const contract1Address = '0x424f8Ea863Db73F1371e06c0932b80A4f7200D00'; 
const contract1Abi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "edrpouCode",
        "type": "string"
      }
    ],
    "name": "EDRPOUCodeAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "facilityCode",
        "type": "string"
      }
    ],
    "name": "FacilityCodeAdded",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "facilities",
    "outputs": [
      {
        "internalType": "string",
        "name": "edrpouCode",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "facilityCode",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_edrpouCode",
        "type": "string"
      }
    ],
    "name": "addEDRPOUCode",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_facilityCode",
        "type": "string"
      }
    ],
    "name": "addFacilityCode",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
const privateKey = '2d70982e3d29eaf839e13f8b6d909a185aa074d6dcdcbf54ea904dcaa32d9fcf'; 
const wallet = new ethers.Wallet(privateKey, provider);
const contract1 = new ethers.Contract(contract1Address, contract1Abi, wallet);

app.get('/form', (req, res) => {
  res.send(`
    <form action="/submit" method="POST">
      <label for="edrpouCode">EDRPOU Code:</label>
      <input type="text" id="edrpouCode" name="edrpouCode"><br>
      <label for="facilityCode">Facility Code:</label>
      <input type="text" id="facilityCode" name="facilityCode"><br>
      <label for="address">Address:</label>
      <input type="text" id="address" name="address"><br>
      <input type="submit" value="Submit">
    </form>
  `);
});


app.post('/submit', async (req, res) => {
  const { edrpouCode, facilityCode, address } = req.body;

  try {

    const edrpouTx = await contract1.addEDRPOUCode(edrpouCode);
    const edrpouReceipt = await edrpouTx.wait();
    const edrpouHash = edrpouReceipt.transactionHash;


    const facilityTx = await contract1.addFacilityCode(facilityCode);
    const facilityReceipt = await facilityTx.wait();
    const facilityHash = facilityReceipt.transactionHash;


    await mssql.connect(dbConfig);
    await mssql.query(`
      INSERT INTO HealthcareFacility (EDRPOUCode, FacilityCode, Address)
      VALUES ('${edrpouHash}', '${facilityHash}', '${address}')
    `);

    res.send('Data submitted and hashes stored in the database.');
  } catch (err) {
    console.error('Error submitting data:', err);
    res.status(500).send('Error submitting data.');
  }
});
app.listen(port, () => {
    console.log(`Сервер запущено на порту ${port}`);
});
