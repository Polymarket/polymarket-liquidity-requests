import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts } = hre;

    const { deployer } = await getNamedAccounts();

    console.log("deployer", deployer);

    await deployments.deploy("LiquidityRequestLog", {
        from: deployer,
        args: [deployer],
        log: true,
    });
};

export default func;
func.tags = ["LiquidityRequestLog"];
