pragma solidity ^0.5.0;


library HexaLib {
    function toHexDigit(uint8 digit) internal pure returns (bytes1) {
        require((digit & 0x0f) == digit, "Invalid digit");
        if (0 <= digit && digit <= 9) {
            return bytes1(uint8(bytes1('0')) + digit);
        }
        if (10 <= digit && digit <= 15) {
            return bytes1(uint8(bytes1('a')) + digit - 10);
        }
    }

    function toHex(bytes32 value) internal pure returns (string memory) {
        bytes memory hexBytes = new bytes(64);
        for (uint256 i = 0; i < 32; ++i) {
            hexBytes[2*i] = toHexDigit(uint8(value[i]) / 16);
            hexBytes[2*i + 1] = toHexDigit(uint8(value[i]) % 16);
        }
        return string(hexBytes);
    }

    function fromHexDigit(bytes1 digit) internal pure returns (uint8) {
        if (bytes1('0') <= digit && digit <= bytes1('9')) {
            return uint8(digit) - uint8(bytes1('0'));
        }
        if (bytes1('a') <= digit && digit <= bytes1('f')) {
            return uint8(digit) - uint8(bytes1('a')) + 10;
        }
        if (bytes1('A') <= digit && digit <= bytes1('F')) {
            return uint8(digit) - uint8(bytes1('A')) + 10;
        }
        revert("Invalid digit");
    }

    function fromHex(string memory value) internal pure returns (bytes32) {
        bytes memory hexBytes = bytes(value);
        require(hexBytes.length == 64, "Invalid length");
        bytes32 result;
        for (uint256 i = 0; i < 32; ++i) {
            uint8 hexByte = fromHexDigit(hexBytes[2*i]) * 16 + fromHexDigit(hexBytes[2*i+1]);
            result = result | bytes32(uint256(hexByte) << 8*(31-i));
        }
        return result;
    }
}


contract Hexadecimal {
    function toHexa(bytes32 value) public pure returns (string memory) {
        return HexaLib.toHex(value);
    }

    function fromHexa(string memory value) public pure returns (bytes32) {
        return HexaLib.fromHex(value);
    }
}
