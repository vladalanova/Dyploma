const express = require('express');
const bodyParser = require('body-parser');
const { ethers } = require('ethers');
const mssql = require('mssql/msnodesqlv8');
const cors = require('cors');
const app = express();
const port = 8080;

var dbConfig = {
    server: 'DESKTOP-CSFCFTG\\SQLEXPRESS',
    database: 'MyDyploma',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true,
    },
};

app.use(cors());
app.use(bodyParser.json());

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

const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545');
const privateKey = '2d70982e3d29eaf839e13f8b6d909a185aa074d6dcdcbf54ea904dcaa32d9fcf'; // Замініть на приватний ключ вашого аккаунту
const wallet = new ethers.Wallet(privateKey, provider);
const contract1 = new ethers.Contract(contract1Address, contract1Abi, wallet);

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

        res.json({ message: 'Data submitted and hashes stored in the database.' });
    } catch (err) {
        console.error('Error submitting data:', err);
        res.status(500).send('Error submitting data.');
    }
});

app.listen(port, () => {
    console.log(`Сервер запущено на порту ${port}`);
});
