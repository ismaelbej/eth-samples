pragma solidity ^0.4.15;

contract A {
    address public called;
    address public sender;
    uint public value;
    function setValue(uint _value) public {
        called = address(this);
        sender = msg.sender;
        value = _value;
    }
}

