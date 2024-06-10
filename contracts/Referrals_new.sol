// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract Referrals_new {
    struct IntegrityData {
        string patientFullName;
        string referralDate;
        string healthCareFacilityName;
    }

    struct AvailabilityData {
        string priority;
        string validityPeriod;
        string edrpouCode;
        string serviceCode;
    }

    struct IntegrityAvailabilityData {
        string referralNumber;
    }

    struct ConfIntData {
        bytes32 medicalCardNumberHash;
    }

    struct ConfIntAvData {
        bytes32 examinationNameHash;
        bytes32 specialistHash;
    }

    IntegrityData[] public integrityData;
    AvailabilityData[] public availabilityData;
    IntegrityAvailabilityData[] public integrityAvailabilityData;
    ConfIntData[] public confIntData;
    ConfIntAvData[] public confIntAvData;

    function addIntegrityData(
        string memory _patientFullName,
        string memory _referralDate,
        string memory _healthCareFacilityName
    ) public {
        integrityData.push(IntegrityData(_patientFullName, _referralDate, _healthCareFacilityName));
    }

    function addAvailabilityData(
        string memory _priority,
        string memory _validityPeriod,
        string memory _edrpouCode,
        string memory _serviceCode
    ) public {
        availabilityData.push(AvailabilityData(_priority, _validityPeriod, _edrpouCode, _serviceCode));
    }

    function addIntegrityAvailabilityData(
        string memory _referralNumber
    ) public {
        integrityAvailabilityData.push(IntegrityAvailabilityData(_referralNumber));
    }

    function addConfIntData(
        bytes32 _medicalCardNumberHash
    ) public {
        confIntData.push(ConfIntData(_medicalCardNumberHash));
    }

    function addConfIntAvData(
        bytes32 _examinationNameHash,
        bytes32 _specialistHash
    ) public {
        confIntAvData.push(ConfIntAvData(_examinationNameHash, _specialistHash));
    }

    function hashString(string memory _str) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_str));
    }

}
