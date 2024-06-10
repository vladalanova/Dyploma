// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HealthcareData {
    struct Facility {
        string edrpouCode;
        string facilityCode;
    }

    mapping(address => Facility) public facilities;

    event EDRPOUCodeAdded(address indexed sender, string edrpouCode);
    event FacilityCodeAdded(address indexed sender, string facilityCode);

    function addEDRPOUCode(string memory _edrpouCode) public {
        facilities[msg.sender].edrpouCode = _edrpouCode;
        emit EDRPOUCodeAdded(msg.sender, _edrpouCode);
    }

    function addFacilityCode(string memory _facilityCode) public {
        facilities[msg.sender].facilityCode = _facilityCode;
        emit FacilityCodeAdded(msg.sender, _facilityCode);
    }
}
