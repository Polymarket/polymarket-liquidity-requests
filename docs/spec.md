# Liquidity Request Log

## Overview

It is favourable to trade in markets with liquidity than without to avoid drastic changes in price that are inherent to how AMMs function. To identify opportunities to provide liquidity openly (for any potential liquidity provider) and subsequently make any particular market more liquid for any number of traders, it is beneficial to have a liquidity request log.

Any user should be able to request liquidity and any actor desiring to provide liquidity would benefit from understanding these requests and be better informed of potential opportunities to provide liquidity, and whether or not to take on risk.

## User Flow
1. User A requests liquidity and agrees to add pseudonymous information on-chain.
2. User B is aware the Liquidity Request Log and uses it (listening to events or querying it) to decide whether or not to provide liquidity.

## Requirements

> Closely follows https://datatracker.ietf.org/doc/html/rfc2119

**Must** 
- Allow any user of Polymarket to request liquidity
- Make clear that the user is submitting identifiable information (proxy wallet address) on-chain
- Allow potential liquidity providers to see for each request:
  - the market
  - the requester's proxy wallet address
  - reason for requesting liquidity
  - time of request
- Be open source

**Should**
- Include a light sdk for easy client app integration
- Emit events for subgraph development for future accompanying tools/client apps from the community or within Polymarket.com

## Architecture / Design
This solution requires updates to the Single Market Page of Polymarket.com (`polymarket-next`) and deployment of a smart contract `LiquidityRequestLog`.

**Changes to `polymarket-next`**
1. Add button beneath trading widget on Single Market Page to "Request Liquidity".
2. Prompt User for reason, indicate that information is submitted on-chain.
3. Show success or failure of transaction

**Contract Spec: `LiquidityRequestLog`**

```solidity
contract LiquidityRequestLog is Ownable {

  struct LiquidityRequest {
    address requesterProxyWalletAddress;
    string reason;
    address marketMakerAddress;
  }
  
  event LiquidityRequestAdded(address indexed requesterProxyWalletAddress, LiquidityRequest liquidityRequest);

  constructor(address owner) {
    transferOwnership(owner);
  }
  
  function addLiquidityRequest(string reason, address marketMakerAddress, uint256 tradeAmount) public {
    LiquidityRequest liquidityRequest = LiquidityRequest(msg.sender, now, reason, marketMakerAddress, tradeAmount);
    emit LiquidityRequestAdded(msg.sender, liquidityRequest);
  }
}
```

**Client SDK**
The client SDK would be a small package including a `LiquidityRequestLog` class with the following functions:
1. submitLiquidityRequest
