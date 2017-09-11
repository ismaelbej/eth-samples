//var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");

module.exports = function(deployer) {
  //deployer.deploy(ConvertLib);
  //deployer.link(ConvertLib, MetaCoin);
  //deployer.deploy(MetaCoin, { from: "0x9bc62fa8c8925a18441506e4d2407e78fae369b4" });
  deployer.deploy(MetaCoin, { from: "0x7fe01972a2bf4840ba358ce516defa9b20ad92d3" });
};
