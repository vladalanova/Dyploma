// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicalData {

    // Структура для даних категорії ЦД (цілісність і доступність)
    struct IntegrityAndAvailability {
        uint referralNumber;
    }

    // Структура для даних категорії Ц (цілісність)
    struct Integrity {
        string patientName;
        string familyDoctorName;
        string referralDate;
        string medicalInstitutionName;
        string medicalInstitutionAddress;
    }

    // Структура для даних категорії Д (доступність)
    struct Availability {
        string birthDate;
        string phoneNumber;
        string priority;
        string validityPeriod;
        string serviceCode;
        string edrpouCode;
    }

    // Мапінги для зберігання даних
    mapping(uint => IntegrityAndAvailability) public integrityAndAvailabilityData;
    mapping(uint => Integrity) public integrityData;
    mapping(uint => Availability) public availabilityData;

    // Функція для додавання даних категорії ЦД
    function addIntegrityAndAvailabilityData(uint _key, uint _referralNumber) public {
        integrityAndAvailabilityData[_key] = IntegrityAndAvailability(_referralNumber);
    }

    // Функція для додавання даних категорії Ц
    function addIntegrityData(
        uint _key,
        string memory _patientName,
        string memory _familyDoctorName,
        string memory _referralDate,
        string memory _medicalInstitutionName,
        string memory _medicalInstitutionAddress
    ) public {
        integrityData[_key] = Integrity({
            patientName: _patientName,
            familyDoctorName: _familyDoctorName,
            referralDate: _referralDate,
            medicalInstitutionName: _medicalInstitutionName,
            medicalInstitutionAddress: _medicalInstitutionAddress
        });
    }

    // Функція для додавання даних категорії Д
    function addAvailabilityData(
        uint _key,
        string memory _birthDate,
        string memory _phoneNumber,
        string memory _priority,
        string memory _validityPeriod,
        string memory _serviceCode,
        string memory _edrpouCode
    ) public {
        availabilityData[_key] = Availability({
            birthDate: _birthDate,
            phoneNumber: _phoneNumber,
            priority: _priority,
            validityPeriod: _validityPeriod,
            serviceCode: _serviceCode,
            edrpouCode: _edrpouCode
        });
    }
}
