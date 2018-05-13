const ConvertLib = artifacts.require("./ConvertLib.sol");
const Hexadecimal = artifacts.require("./Hexadecimal.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, Hexadecimal);
  deployer.deploy(Hexadecimal);
};
