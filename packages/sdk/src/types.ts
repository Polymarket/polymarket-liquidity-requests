import {BigNumber} from "ethers";

export type LiquidityRequest = {
  marketMakerAddress: string;
  reason: string;
  tradeAmount: BigNumber;
};
