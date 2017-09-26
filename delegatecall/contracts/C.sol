pragma solidity ^0.4.15;

contract C {
    address public called;
    address public sender;
    uint public value;
    function setValue(uint _value) {
        called = address(this);
        sender = msg.sender;
        value = _value;
    }
    function foo(address _who, address _what, uint _value) {
        _who.delegatecall(bytes4(sha3("jump(address,uint256)")), _what, _value);
    }
}

