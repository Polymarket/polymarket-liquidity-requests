/* eslint-disable func-names */
import { expect } from "chai";
import { deployments, ethers } from "hardhat";
import { JsonRpcSigner } from "@ethersproject/providers";
import { BigNumber } from "ethers";
import { LiquidityRequest, LiquidityRequestLog as RequestLog } from "@polymarket/liquidity-requests-sdk";
import { getSignerFromWallet, deploy } from "../test/helpers";

import { LiquidityRequestLog } from "../typechain";

const setup = deployments.createFixture(async () => {
    const adminSigner = await ethers.getNamedSigner("admin");
    const admin = getSignerFromWallet(adminSigner, 31337);

    const requestLog = await deploy<LiquidityRequestLog>("LiquidityRequestLog", {
        from: adminSigner.address,
        args: [adminSigner.address],
        connect: adminSigner,
    });
    return { requestLog, admin, adminAddress: adminSigner.address };
});

describe("Unit tests", function () {
    describe("LiquidityRequestLog SDK", function () {
        let requestLog: RequestLog;
        let admin: JsonRpcSigner;
        let adminAddress: string;
        let requestOne: LiquidityRequest;
        let requestTwo: LiquidityRequest;

        beforeEach(async function () {
            const deployment = await setup();
            admin = deployment.admin;
            adminAddress = deployment.adminAddress;

            requestLog = new RequestLog(admin, 31337);

            requestLog.setContract(deployment.requestLog.address, admin);

            requestOne = {
                marketMakerAddress: "0x0000000000000000000000000000000000000001",
                tradeAmount: BigNumber.from(2002),
                reason: "trade",
            };

            requestTwo = {
                marketMakerAddress: "0x0000000000000000000000000000000000000001",
                reason: "other",
                tradeAmount: BigNumber.from(12500),
            };
        });

        describe("SDK functionality", function () {
            it("getOwner", async () => {
                const owner = await requestLog.getOwner();
                expect(owner).to.equal(adminAddress);
            });

            it("submitLiquidityRequest", async () => {
                const addLiquidityRequestTx = await requestLog.submitLiquidityRequest(requestOne);
                const result = await addLiquidityRequestTx.wait();
                expect(result.status).to.equal(1);
            });
        });
    });
});
