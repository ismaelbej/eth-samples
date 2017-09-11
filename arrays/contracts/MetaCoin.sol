pragma solidity ^0.4.4;

contract MetaCoin {
    bytes32[] public test;

    function init(bytes32[] _test) public returns (bool) {
        for (uint i=0; i<_test.length; ++i) {
            if (i >= test.length) {
                test.push(_test[i]);
            } else {
                test[i] = _test[i];
            }
        }
        return true;
    }
}
