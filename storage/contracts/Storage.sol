pragma solidity ^0.4.15;

contract Storage {
  mapping (uint => bytes32) public users;
  bytes32[] public allData;

  event SetUserData(uint userId, bytes32 data);

  function setUserData(uint userId, bytes32 data) public {
    if (users[userId] != bytes32(0)) return;
    users[userId] = data;
    allData.push(bytes32(userId));
    SetUserData(userId, data);
  }

  function getUserData(uint userId) constant returns (bytes32[] data) {
    if (users[userId] != bytes32(0)) {
      allData.length = 0;
      allData.push(users[userId]);
      data = allData;
      return data;
    } else {
      return data;
    }
  }

  function getUserData2(uint userId) constant returns (bytes32[] data) {
    if (users[userId] != bytes32(0)) {
      // allData.length = 0;
      allData.push(users[userId]);
      return allData;
    } else {
      return data;
    }
  }
}
