const Hexadecimal = artifacts.require("./Hexadecimal.sol");

contract('Hexadecimal', function(accounts) {
  it("To hexadecimal", async function() {
    const hexadecimal = await Hexadecimal.deployed();
    const input = '393ebb634e9a8913f72442cc158dcd1d0d27aa86ba34f1a5c5513a7562f8dbe5';
    const result = await hexadecimal.toHexa(`0x${input}`);
    assert.equal(result, input, 'Output should match input');
  });
});
