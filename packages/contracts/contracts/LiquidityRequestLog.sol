// SPDX-License-Identifier: MIT

pragma solidity 0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract LiquidityRequestLog is Ownable {

    struct LiquidityRequest {
        address requesterAddress;
        uint256 requestDate;
        string reason;
        address marketMakerAddress;
        uint256 tradeAmount;
    }

    event LiquidityRequestAdded(address indexed requesterAddress, LiquidityRequest liquidityRequest);

    constructor(address owner) {
        transferOwnership(owner);
        emit OwnershipTransferred(address(0), owner);
    }

    function addLiquidityRequest(string memory reason, address marketMakerAddress, uint256 tradeAmount) public {
        LiquidityRequest memory liquidityRequest = LiquidityRequest(msg.sender, block.timestamp, reason, marketMakerAddress, tradeAmount);
        emit LiquidityRequestAdded(msg.sender, liquidityRequest);
    }
}
