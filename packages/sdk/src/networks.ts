type LiquidityRequestLogContracts = {
  liquidityRequestLog: string;
};

export const MATIC_CONTRACTS: LiquidityRequestLogContracts = {
  liquidityRequestLog: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
};

export const MUMBAI_CONTRACTS: LiquidityRequestLogContracts = {
  liquidityRequestLog: "0xDd3f3B054285F627682A9f69D753D468F6a6865d",
};

export const getContracts = (network: number): LiquidityRequestLogContracts => {
  switch (network) {
    case 137:
      return MATIC_CONTRACTS;
    case 80001:
      return MUMBAI_CONTRACTS;
    default:
      console.log(
        `WARNING: running on network id ${network} with matic contract addresses. Ignore this warning if you are testing.`
      );
      return MATIC_CONTRACTS;
  }
};
