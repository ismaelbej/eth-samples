pragma solidity ^0.4.20;

library ConvertLib{

    function toHexDigit(uint digit) public pure returns (byte) {
        require((digit & 0x0f) == digit);
        if (0 <= digit && digit <= 9) {
            return byte(uint(byte('0')) + digit);
        }
        if (10 <= digit && digit <= 15) {
            return byte(uint(byte('a')) + digit - 10);
        }
    }

    function toHex(bytes32 value) public pure returns (string) {
        bytes memory hexBytes = new bytes(64);
        for (uint i=0; i<32; ++i) {
            hexBytes[2*i] = toHexDigit(uint(value[i]) / 16);
            hexBytes[2*i + 1] = toHexDigit(uint(value[i]) % 16);
        }
        return string(hexBytes);
    }

    function fromHexDigit(byte digit) public pure returns (uint) {
        if (byte('0') <= digit && digit <= byte('9')) {
            return uint(digit) - uint(byte('0'));
        }
        if (byte('a') <= digit && digit <= byte('f')) {
            return uint(digit) - uint(byte('a')) + 10;
        }
        if (byte('A') <= digit && digit <= byte('F')) {
            return uint(digit) - uint(byte('A')) + 10;
        }
        revert('Invalid digit');
    }

    function fromHex(string value) public pure returns (bytes32) {
        bytes memory hexBytes = bytes(value);
        bytes32 result;
        for (uint i=0; i<32; ++i) {
            uint hexByte = fromHexDigit(hexBytes[2*i]) * 16 + fromHexDigit(hexBytes[2*i+1]);
            result = result | bytes32(hexByte * 256**(31-i));
        }
        return result;
    }
}
