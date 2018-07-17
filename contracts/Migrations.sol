pragma solidity ^0.4.17;

import "plcr-revival/PLCRFactory.sol";
import "plcr-revival/PLCRVoting.sol";

import "tokens/eip20/EIP20Interface.sol";
import "tokens/eip20/EIP20.sol";

import "tcr/Parameterizer.sol";
import "tcr/ParameterizerFactory.sol";
import "tcr/Registry.sol";
import "tcr/RegistryFactory.sol";

import "zeppelin/math/SafeMath.sol";

contract Migrations {
  address public owner;
  uint public last_completed_migration;

  modifier restricted() {
    if (msg.sender == owner) _;
  }

  function Migrations() public {
    owner = msg.sender;
  }

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }

  function upgrade(address new_address) public restricted {
    Migrations upgraded = Migrations(new_address);
    upgraded.setCompleted(last_completed_migration);
  }
}
