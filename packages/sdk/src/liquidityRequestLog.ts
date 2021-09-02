import {JsonRpcSigner} from "@ethersproject/providers";
import {getContracts} from "./networks";
import {ethers} from "ethers";
import abi from "./abi/LiquidityRequestLog.json";
import {LiquidityRequest} from "./types";

export class LiquidityRequestLog {
    readonly signer: JsonRpcSigner;

    liquidityRequestLog: ethers.Contract;

    constructor(signer: JsonRpcSigner, chainID: number) {
        if (!signer.provider) {
            throw new Error("Signer must be connected to a provider.");
        }
        this.signer = signer;
        this.setContract(getContracts(chainID).liquidityRequestLog, this.signer);
    }

    public setContract(address: string, signer: JsonRpcSigner) {
        if (!signer.provider) {
            throw new Error("Signer must be connected to a provider.");
        }
        this.liquidityRequestLog = new ethers.Contract(address, abi, signer);
    }

    public async getOwner(): Promise<string> {
        const owner = await this.liquidityRequestLog.owner();
        return owner;
    }

    public async changeOwner(
        newAddress: string
    ): Promise<ethers.providers.TransactionResponse> {
        const tx = await this.liquidityRequestLog.transferOwnership(newAddress);
        return tx;
    }

    public async submitLiquidityRequest(liquidityRequest: LiquidityRequest): Promise<ethers.providers.TransactionResponse> {
        const tx = await this.liquidityRequestLog.addLiquidityRequest(liquidityRequest.reason, liquidityRequest.marketMakerAddress, liquidityRequest.marketMakerAddress);
        return tx;
    }
}
