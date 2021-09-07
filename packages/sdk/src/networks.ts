type LiquidityRequestLogContracts = {
  liquidityRequestLog: string;
};

export const MATIC_CONTRACTS: LiquidityRequestLogContracts = {
  liquidityRequestLog: "0x5A3Deb79F213F5d4C2702fC75eDfa41F46B5E271",
};

export const MUMBAI_CONTRACTS: LiquidityRequestLogContracts = {
  liquidityRequestLog: "0x9d3EF6A5D9ae42AA53A1EA2b60A81768D09B1E44",
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
