var MetaCoin = artifacts.require("./MetaCoin.sol");

contract('MetaCoin', function(accounts) {
  it("Pass array as parameter", async function() {
    const mc = await MetaCoin.deployed();
    await mc.init([1, 2, 3, 4]);
    const res = await mc.test.call(2);
    assert.equal(res.toNumber(), 3, "Should be true");
  });
});
