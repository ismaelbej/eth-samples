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
}
