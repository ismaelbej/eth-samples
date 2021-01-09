pragma solidity ^0.7.0;


abstract contract Base {
    address public called;
    address public sender;
    uint public value;
}

contract A is Base {
    function setValue(uint _value) public {
        called = address(this);
        sender = msg.sender;
        value = _value;
    }
}

contract B is Base {
    function jump(address _who, uint _value) public {
        (bool success, ) = _who.delegatecall(abi.encodeWithSignature("setValue(uint256)", _value));
        require(success, "C delgatecall failed");
    }
}

contract C is Base {
    function setValue(uint _value) public {
        called = address(this);
        sender = msg.sender;
        value = _value;
    }
    function foo(address _who, address _what, uint _value) public {
        (bool success, ) = _who.delegatecall(abi.encodeWithSignature("jump(address,uint256)", _what, _value));
        require(success, "C delgatecall failed");
    }
}
