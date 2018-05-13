pragma solidity ^0.4.18;

import {ConvertLib} from "./ConvertLib.sol";

contract Hexadecimal {
    function toHexa(bytes32 value) public pure returns (string) {
        return ConvertLib.toHex(value);
    }
}
