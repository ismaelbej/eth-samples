pragma solidity ^0.4.4;

contract MetaCoin {
    uint[] public test;

    function init(uint[] _test) public returns (bool) {
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
