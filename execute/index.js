const Web3 = require('web3');
const abi = require('ethereumjs-abi');
const solc = require('solc');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

function compileContract() {
  const recipientCode = `
pragma solidity ^0.4.11;
contract Recipient {
  uint public id;
  function deposit(uint _id) public payable {
    id = _id;
  }
}`;

  const recipientBytecode = '6060604052341561000f57600080fd5b5b60c08061001e6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063af640d0f146047578063b6b55f2514606d575b600080fd5b3415605157600080fd5b60576083565b6040518082815260200191505060405180910390f35b608160048080359060200190919050506089565b005b60005481565b806000819055505b505600a165627a7a72305820e82f8f3c1affab54b4f14fe28542262f309f1662fa2068ba59ab4454e53918140029';

  const recipientAbi = [{"constant":true,"inputs":[],"name":"id","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"}],"name":"deposit","outputs":[],"payable":true,"type":"function"}];

  const recipientAddress = '0xa4d6ad227cde3ff0c7dcc7490710f8626cfab2b7';

  const walletCode = `
pragma solidity ^0.4.11;

contract Wallet {
    address public to;
    uint public value;
    bytes public data;
    event ExecutionFailed(address _to, uint _value);
    event ExecutionSucceeded(address _to, uint _value);
    function () public payable {
    }
    function propose(address _to, uint _value, bytes _data) public {
      to = _to;
      value = _value;
      data = _data;
    }
    function execute() public {
      if (to.call.value(value)(data)) {
         ExecutionSucceeded(to, value);
      } else {
         ExecutionFailed(to, value);
      }
    }
}
`;

  const walletBytecode = '6060604052341561000f57600080fd5b5b6105fa8061001f6000396000f3006060604052361561006b576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063131519811461006f5780633fa4f245146100c457806361461954146100ed57806373d4a13a1461010257806393ba3f1514610191575b5b5b005b341561007a57600080fd5b610082610216565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156100cf57600080fd5b6100d761023b565b6040518082815260200191505060405180910390f35b34156100f857600080fd5b610100610241565b005b341561010d57600080fd5b610115610427565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101565780820151818401525b60208101905061013a565b50505050905090810190601f1680156101835780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561019c57600080fd5b610214600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919050506104c5565b005b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60015481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600154600260405180828054600181600116156101000203166002900480156102e35780601f106102b8576101008083540402835291602001916102e3565b820191906000526020600020905b8154815290600101906020018083116102c657829003601f168201915b505091505060006040518083038185876187965a03f19250505015610395577f737efb47ab7b8cee3a5229fe854efc6f1cbfa652fe43e10f967f709062f46a926000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600154604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a1610424565b7fa2bd93be155d3bc3e3f43d3b4ac0e02cbeb3fe35ca79384a7a18ff308d5a59c86000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600154604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a15b5b565b60028054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104bd5780601f10610492576101008083540402835291602001916104bd565b820191906000526020600020905b8154815290600101906020018083116104a057829003601f168201915b505050505081565b826000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550816001819055508060029080519060200190610522929190610529565b505b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061056a57805160ff1916838001178555610598565b82800160010185558215610598579182015b8281111561059757825182559160200191906001019061057c565b5b5090506105a591906105a9565b5090565b6105cb91905b808211156105c75760008160009055506001016105af565b5090565b905600a165627a7a723058209eca6e13ef675afac305e48dbc3f93e11c6f38d78464ad576b9402c83e276e510029';

  const walletAbi = [{"constant":true,"inputs":[],"name":"to","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"value","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"execute","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"data","outputs":[{"name":"","type":"bytes"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"propose","outputs":[],"payable":false,"type":"function"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"ExecutionFailed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"ExecutionSucceeded","type":"event"}];

  const walletAddress = '0x65be9164cb4775511534796da049d3eb2065b618';

  //const recipientResult = solc.compile(recipientContract, 1);
  //console.log(`${JSON.stringify(result, null, '  ')}`);
  //const recipientCompiled = recipientResult.contracts[':Recipient'];
  //console.log(`Bytecode: ${recipientCompiled.bytecode}`);
  //console.log(`Interface: ${recipientCompiled.interface}`);

  //const walletResult = solc.compile(walletContract, 1);
  //console.log(`${JSON.stringify(walletResult, null, '  ')}`);
  //const walletCompiled = walletResult.contracts[':Wallet'];
  //console.log(`Bytecode: ${walletCompiled.bytecode}`);
  //console.log(`Interface: ${walletCompiled.interface}`);

  const recipientContract = eth.contract(recipientAbi);
  const recipient = recipientContract.at(recipientAddress);

  const walletContract = eth.contract(walletAbi);
  const wallet = walletContract.at(walletAddress);

  wallet.propose(eth.accounts[0], web3.toWei(1, 'szabo'), "0x0", { from: eth.accounts[0], gas: 100000 });
  wallet.execute({ from: eth.accounts[0], gas: 100000 });
  wallet.propose(recipient.address, web3.toWei(1, 'szabo'), recipient.deposit.getData(12345679), { from: eth.accounts[0], gas: 1000000 });
  wallet.execute({ from: eth.accounts[0], gas: 1000000 });
  wallet.propose(recipient.address, web3.toWei(1, 'szabo'), "0x0", { from: eth.accounts[0], gas: 1000000 });
  wallet.execute({ from: eth.accounts[0], gas: 1000000 });
}

function decodeTx() {
  const data = Buffer.from([
    '000000000000000000000000b56d622ddf60ec532b5f43b4ff9b0e7b1ff92db3',
    '0000000000000000000000000000000000000000000000015af1d78b58c40000',
    '0000000000000000000000000000000000000000000000000000000000000060',
    '0000000000000000000000000000000000000000000000000000000000000000'
  ].join(''), 'hex');

  const decoded = abi.rawDecode(['address', 'uint256', 'bytes'], data);

  console.log(`Decoded: ${JSON.stringify(decoded, null, '  ')}`);

  const params = [
    '0xb56d622ddf60ec532b5f43b4ff9b0e7b1ff92db3',
    '0x15af1d78b58c40000',
    []
  ];

  const encoded = abi.rawEncode(['address', 'uint256', 'bytes'], params);

  console.log(`Encoded: ${encoded.toString('hex')}`);
}

compileContract();
