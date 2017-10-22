import toNumber from './helper';
const MetaCoin = artifacts.require("./MetaCoin.sol");

contract('MetaCoin', function(accounts) {
  before(async function () {
    this.metacoin = await MetaCoin.deployed();
  });
  it("should put 10000 MetaCoin in the first account", async function () {
    const balance = await this.metacoin.getBalance.call(accounts[0]);
    assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
  });
  it("should call a function that depends on a linked library", async function () {
    const outCoinBalance = await this.metacoin.getBalance.call(accounts[0]);
    const metaCoinBalance = outCoinBalance.toNumber();
    const outCoinBalanceEth = await this.metacoin.getBalanceInEth.call(accounts[0]);
    const metaCoinEthBalance = outCoinBalanceEth.toNumber();
    assert.equal(metaCoinEthBalance, 2 * metaCoinBalance, "Library function returned unexpected function, linkage may be broken");
  });
  it("should send coin correctly", async function () {
    const account_one = accounts[0];
    const account_two = accounts[1];

    const amount = 10;

    const account_one_starting_balance = await this.metacoin.getBalance.call(account_one).then(toNumber);
    const account_two_starting_balance = await this.metacoin.getBalance.call(account_two).then(toNumber);
    await this.metacoin.sendCoin(account_two, amount, {from: account_one});
    const account_one_ending_balance = await this.metacoin.getBalance.call(account_one).then(toNumber);
    const account_two_ending_balance = await this.metacoin.getBalance.call(account_two).then(toNumber);

    assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
    assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
  });
});
