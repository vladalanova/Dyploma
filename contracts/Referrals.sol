// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ReferralContract {
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

    IntegrityData[] public integrityData;
    AvailabilityData[] public availabilityData;

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
}

