const Storage = artifacts.require("./Storage.sol");

contract('Storage', function(accounts) {
  let storage;
  before(async () => {
    storage = await Storage.deployed();
  });
  it("Set user data", async () => {
    await storage.setUserData(1, "0x00112233445566778899aabbccddeeff00112233445566778899aabbccddeeff");
    const data = await storage.getUserData.call(1);
    //assert.equal(data, "0x00112233445566778899aabbccddeeff00112233445566778899aabbccddeeff", "Can retrieve user data");
    console.log(`${JSON.stringify(data, null, '  ')}`)
    const data2 = await storage.getUserData2.call(1);
    console.log(`${JSON.stringify(data2, null, '  ')}`)
    const allData = await storage.allData.call(0);
    console.log(`${JSON.stringify(allData, null, '  ')}`);
  });
});
