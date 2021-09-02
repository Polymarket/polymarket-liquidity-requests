/* eslint-disable func-names */
import { expect } from "chai";
import { deployments, ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signers";
import { LiquidityRequest } from "@polymarket/liquidity-requests-sdk";
import { BigNumber } from "@ethersproject/bignumber";
import { LiquidityRequestLog } from "../typechain";
import { deploy } from "./helpers";

const setup = deployments.createFixture(async () => {
    const admin = await ethers.getNamedSigner("admin");
    const newAdmin = await ethers.getNamedSigner("newAdmin");
    const random = await ethers.getNamedSigner("random");

    const requestLog = await deploy<LiquidityRequestLog>("LiquidityRequestLog", {
        from: admin.address,
        args: [admin.address],
        connect: admin,
    });

    return { requestLog, admin, newAdmin, random };
});

describe("Unit tests", function () {
    describe("LiquidityRequestLog", function () {
        let requestLog: LiquidityRequestLog;
        let admin: SignerWithAddress;
        let newAdmin: SignerWithAddress;
        let random: SignerWithAddress;
        let requestOne: LiquidityRequest;
        let requestTwo: LiquidityRequest;

        beforeEach(async function () {
            const deployment = await setup();

            requestLog = deployment.requestLog;
            admin = deployment.admin;
            newAdmin = deployment.newAdmin;
            random = deployment.random;

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

        describe("Liquidity Request Log functionality", function () {
            it("owner is the admin", async () => {
                const owner = await requestLog.owner();
                expect(owner).to.equal(admin.address);
            });

            it("ownership can be transferred by owner", async () => {
                await requestLog.transferOwnership(newAdmin.address);
                const owner = await requestLog.owner();
                expect(owner).to.equal(newAdmin.address);
            });

            it("ownership can't be transferred by non-owner", async () => {
                expect(requestLog.connect(newAdmin).transferOwnership(newAdmin.address)).to.be.revertedWith(
                    "Ownable: caller is not the owner",
                );
            });

            it("emits events for each request submitted ", async function () {
                const { events: eventsOne } = await (
                    await requestLog
                        .connect(random)
                        .addLiquidityRequest(requestOne.reason, requestOne.marketMakerAddress, requestOne.tradeAmount)
                ).wait();

                const nameOne = eventsOne && eventsOne[0] && eventsOne[0].event;
                const argsOne = eventsOne && eventsOne[0] && eventsOne[0].args;

                const { events: eventsTwo } = await (
                    await requestLog
                        .connect(random)
                        .addLiquidityRequest(requestTwo.reason, requestTwo.marketMakerAddress, requestTwo.tradeAmount)
                ).wait();

                const nameTwo = eventsTwo && eventsTwo[0] && eventsTwo[0].event;
                const argsTwo = eventsTwo && eventsTwo[0] && eventsTwo[0].args;

                expect(nameOne).to.equal("LiquidityRequestAdded");
                expect(nameTwo).to.equal("LiquidityRequestAdded");
                expect(argsOne?.requesterAddress).to.equal(random.address);
                expect(argsTwo?.requesterAddress).to.equal(random.address);
                expect(argsOne?.liquidityRequest?.reason).to.equal(requestOne.reason);
                expect(argsTwo?.liquidityRequest?.reason).to.equal(requestTwo.reason);
            });
        });
    });
});
