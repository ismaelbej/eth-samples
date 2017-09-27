pragma solidity ^0.4.15;

contract B {
    address public called;
    address public sender;
    uint public value;
    function jump(address _who, uint _value) {
        _who.delegatecall(bytes4(sha3("setValue(uint256)")), _value);
    }
}

