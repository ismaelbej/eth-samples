//var ConvertLib = artifacts.require("./ConvertLib.sol");
//var MetaCoin = artifacts.require("./MetaCoin.sol");
var A = artifacts.require('./A.sol');
var B = artifacts.require('./B.sol');
var C = artifacts.require('./C.sol');

module.exports = function(deployer) {
  deployer.deploy(A);
  deployer.deploy(B);
  deployer.deploy(C);
};
