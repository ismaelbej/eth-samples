var A = artifacts.require("./A.sol");
var B = artifacts.require("./B.sol");
var C = artifacts.require("./C.sol");

contract('Deletegatecall', function(accounts) {
  it("Making calls", async function() {
    const [ a, b, c ] = await Promise.all([
      A.deployed(),
      B.deployed(),
      C.deployed(),
    ]);

    const [ valueA, valueB, valueC ] = await Promise.all([
      a.value.call(),
      b.value.call(),
      c.value.call(),
    ]);

    console.log(`A value: ${valueA.valueOf()}`);
    console.log(`B value: ${valueB.valueOf()}`);
    console.log(`C value: ${valueC.valueOf()}`);

    await c.foo(b.address, a.address, 42);

    const [ valueA2, valueB2, valueC2 ] = await Promise.all([
      a.value.call(),
      b.value.call(),
      c.value.call(),
    ]);

    console.log(`A value: ${valueA2.valueOf()}`);
    console.log(`B value: ${valueB2.valueOf()}`);
    console.log(`C value: ${valueC2.valueOf()}`);
  });
});
