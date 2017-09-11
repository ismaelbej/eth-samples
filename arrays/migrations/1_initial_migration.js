var Migrations = artifacts.require("./Migrations.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations, { from: "0x7fe01972a2bf4840ba358ce516defa9b20ad92d3" });
};
