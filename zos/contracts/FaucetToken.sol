pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "zos-lib/contracts/migrations/Migratable.sol";

contract FaucetToken is StandardToken, Migratable {
    using SafeMath for uint;

    string constant _name = "FaucetTokenX";
    string constant _symbol = "FCTX";
    uint8 constant _decimals = 18;

    uint lastTime;

    function initialize() isInitializer("FaucetToken", "0") public {
        lastTime = block.timestamp;
    }

    function name() external pure returns (string) {
        return _name;
    }

    function symbol() external pure returns (string) {
        return _symbol;
    }

    function decimals() external pure returns (uint8) {
        return _decimals;
    }

    function dripFaucet() external {
        uint elapsed = block.timestamp - lastTime;
        uint amount = elapsed.mul(10**uint256(_decimals)).div(uint(1 days));
        lastTime = block.timestamp;
        _mint(msg.sender, amount);
    }

    function dripFaucet(uint _amount) external {
        uint elapsed = block.timestamp - lastTime;
        uint amount = elapsed.mul(10**uint256(_decimals)).div(uint(1 days));
        if (_amount < amount) {
            amount = _amount;
        }
        lastTime = block.timestamp;
        _mint(msg.sender, amount);
    }

    function _mint(address _to, uint _amount) internal {
        totalSupply_ = totalSupply_.add(_amount);
        balances[_to] = balances[_to].add(_amount);
        emit Transfer(0x0, _to, _amount);
    }
}
