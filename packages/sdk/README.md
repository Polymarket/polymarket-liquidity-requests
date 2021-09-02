# Liquidity Requests SDK ![npm](https://img.shields.io/npm/v/@polymarket/liquidity-requests-sdk)

The Polymarket Liquidity Requests sdk (`@polymarket/liquidity-requests-sdk`) provides an easy-to-use, lightweight wrapper around the `LiquidityRequestLog` contract.

## Installation

The sdk can be easily installed using yarn with the following command:

```bash
yarn add @polymarket/liquidity-requests-sdk
```

## Usage

The sdk provides importable types.

```typescript
import { LiquidityRequest } from "@polymarket/liquidity-requests-sdk";
```

Primarily though, the sdk allows a `LiquidityRequestLog` object to be initialized with a `signer` (`JsonRpcSigner`) and a `chainID` (`number`). This object provides a simple interface to various registry contract functions and utilities.

```typescript
import { LiquidityRequestLog, LiquidityRequest } from "@polymarket/liquidity-requests-sdk";

const liquidityRequestLog = new LiquidityRequestLog(signer, 137); // deployed to Polygon and Mumbai

const liquidityRequest: LiquidityRequest = {
    marketMakerAddress: "0x0000000000000000000000000000000000000001",
    reason: "trade",
    tradeAmount: 2000000000000000000000,
};

await liquidityRequestLog.submitLiquidityRequest(liquidityRequest);
```

You can refer to the liquidity requests sdk source code for available [functions](https://github.com/Polymarket/polymarket-liquidity-requests/blob/main/packages/sdk/src/liquidityRequestLog.ts) and [types](https://github.com/Polymarket/polymarket-liquidity-requests/blob/main/packages/sdk/src/types.ts).
