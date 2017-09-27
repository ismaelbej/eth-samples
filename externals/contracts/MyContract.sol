pragma solidity ^0.4.15;

contract MyContract {

    string public name;

    event NewName(string _name);

    function MyContract() {
    }

    function setName(string _name) returns (bool success) {
        name = _name;
        NewName(_name);
        return true;
    }

}
