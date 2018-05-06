pragma solidity ^0.4.11;

contract EthUpVoting {

  struct Question {
    bytes32 ipfsHash;
    uint upvotes;
    address user;
  }

  uint private questionId;
  mapping (uint => Question) public questionList;

  event AddedQuestion(bytes32 ipfs_hash, uint qId);

  function EthUpVoting() public {
    questionId = 1;
    questionList[questionId] = Question({
        ipfsHash: "Hello, World!",
        upvotes: 0,
        user: msg.sender
    });
  }

  function addNewQuestion(bytes32 questionHash) public {
      questionId += 1;
      questionList[questionId] = Question({
          ipfsHash: questionHash,
          upvotes: 0,
          user: msg.sender
      });
      AddedQuestion(questionHash, questionId);
  }

  function voteForQuestion(uint qId) public {
    questionList[qId].upvotes += 1;
    questionId += 1;
  }

  function getQuestionTextAtIndex(uint qId) public constant returns (bytes32 ipfsHashReturn) {
      return questionList[qId].ipfsHash;
  }

   function getQuestionListSize() public constant returns (uint size) {
      return questionId;
  }

}
