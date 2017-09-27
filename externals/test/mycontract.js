var MyContract = artifacts.require("./MyContract.sol");

contract('MyContract', function(accounts) {
  it("should put 10000 MetaCoin in the first account", async function() {
    const myContract = await MyContract.deployed();
    const txReceipt = await myContract.setName("Rogers");
    console.log(`TxReceipt: ${JSON.stringify(txReceipt, null, '  ')}`)
    const name = await myContract.name();
    console.log(`Name: ${name}`);
  });
});
