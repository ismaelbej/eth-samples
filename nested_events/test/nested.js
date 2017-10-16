var B = artifacts.require("./B.sol");

contract('B', function(accounts) {
  it("Should fire event", function() {
    return B.deployed().then(function(instance) {
      return instance.doAnotherThing();
    }).then(function(tx) {
      assert.equal(tx.receipt.logs[0].topics[0], web3.sha3('Hello(uint256)'), "Event fired");
    });
  });
  it("Should trigger", function () {
    var b;
    return B.deployed().then(function(instance) {
      b = instance;
      return b.trigger(23);
    }).then(function(result) {
      return b.trigger(1).catch(function () {
        return { rejected: true };
      });
    }).then(function(result) {
      assert.ok(result.rejected, "Event fired");
    });
  });
});
