pragma solidity ^0.5.0;


contract Child {
  event Pulse(uint a);
  function fire(uint a) public {
    emit Pulse(a);
  }
}


contract Events {
  event logTest(uint indexed id, address indexed from, uint value);

  function genEvent(uint _id, address _to, uint _value) public {
    emit logTest(_id, _to,  _value);
  }

  function pulse(uint a) public {
    Child c = new Child();
    c.fire(a);
  }
}
