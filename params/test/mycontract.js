var MyContract = artifacts.require("./MyContract.sol");

contract('MyContract', async function (accounts) {
  const testParams = {
    _owner: accounts[0],
    _array: ["first", "second", "third"],
  };
  let testMyContract;
  describe('New contract', async function () {
    before(async function () {
      //testMyContract = await MyContract.new(testParams._owner, testParams._array);
      testMyContract = await MyContract.new(...Object.values(testParams));
    });

    it('Initial params', async function() {
      let owner = await testMyContract.owner.call();
      assert.equal(owner, accounts[0], 'Owner');
      let len = await testMyContract.len.call();
      assert.equal(len.valueOf(), 3, 'Params');
    });
  });
});
