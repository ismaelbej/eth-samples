pragma solidity ^0.4.15;

import './A.sol';

contract B {
  A public a;
  function doAnotherThing() public {
    a = new A();
    a.doSomething();
  }
  function trigger(uint i) public {
    require(i == 23);
  }
}
