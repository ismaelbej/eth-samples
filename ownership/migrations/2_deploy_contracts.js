var A = artifacts.require("./A.sol");

module.exports = function(deployer) {
  deployer.deploy(A, {
    gas: 2000000,
    from: "0xa6d2bd7897a46eea0c1a22fa17c7c94bd9e952a4"
  });
};
