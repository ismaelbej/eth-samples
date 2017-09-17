var Migrations = artifacts.require("./Migrations.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations, {
    gas: 2000000,
    from: "0xa6d2bd7897a46eea0c1a22fa17c7c94bd9e952a4"
  });
};
