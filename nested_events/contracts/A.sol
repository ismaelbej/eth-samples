pragma solidity ^0.4.15;

contract A {
  event Hello(uint id);
  function doSomething() public {
    Hello(1);
  }
}
