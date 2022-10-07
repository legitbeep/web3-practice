// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transactions {
    uint256 transactionCount;

    // function only declaration we'll define it later
    event Transfer(address from, address to, uint amount, string message, uint256 timestamp, string keyword);

    struct TransferStruct {
        address sender;
        address to;
        uint ammount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    // type of array of transactions 
    TransferStruct[] transactions;

    // function and its visibility
    function addToBlockchain(address payable to, uint amount, string memory message, string memory keyword) public {
        transactionCount = transactions + 1;
        transactions.push(TransferStruct(msg.sender, to, amount, message, block.timestamp, keyword));

        emit Transfer(msg.sender, to, amount, message, block.timestamp, keyword);
    }

    // pre defined what it returns
    function getAllTranssactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}
