pragma solidity ^0.4.15;

contract MyContract {
    address public owner;
    bytes32[] public arr;
    uint public len;
    function MyContract(address _owner, bytes32[] _array) {
        owner = _owner;
        len = _array.length;
        for (uint8 i=0; i<_array.length; ++i) {
            arr.push(_array[i]);
        }
    }
}
