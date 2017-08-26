pragma solidity ^0.4.13;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/A.sol";
import "../contracts/B.sol";

contract TestB {
  B testB;
  A testA;

  function beforeEach() {
    testA = A(DeployedAddresses.A());
    testB = B(testA.createB("test"));
  }

  function testIsOwnerIsSet() {
    address aOwner = testA.owner();
    address bOwner = testB.owner();
    Assert.equal(aOwner, bOwner, "Owner's address does not match");
  }
}
