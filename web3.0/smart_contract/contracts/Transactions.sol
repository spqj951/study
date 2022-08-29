//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transactions  {
    uint256 transactionCount;

    //나중에 emit 되거나 call 되는 것
    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword); 
    struct TransferStruct {
//  객체와 비슷하다. 객체 자체를 선언하는 것이 아니라 객체가 가질 속성과 속성의 타입등을 정한다.
        address sender;
        address receiver;
        uint256 amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransferStruct[] transactions; //[] array임을 얘기함

    function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public{ //class라서 visibility설정이 필요하다 memory : 뒤에 나오는 것이 그 transaction의 memory에 저장된 데이터임을 의미
        transactionCount+=1;
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));
        //특정한 blockchain을 call하면 msg가 바로 생긴다.block역시 마찬가지로 blockchain에서 생성되는 것

        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }
    function getAllTransactions() public view returns (TransferStruct[] memory){ //return타입을 정함
        return transactions;

    }
    function getTransactionCount() public view returns (uint256){ 
        return transactionCount;
    }
}