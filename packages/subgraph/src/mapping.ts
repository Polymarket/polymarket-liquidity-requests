import {LiquidityRequestAdded} from "../generated/LiquidityRequestLog/LiquidityRequestLog"
import { LiquidityRequest } from '../generated/schema'

export function handleLiquidityRequestAdded(event: LiquidityRequestAdded): void {

  let liquidityRequest = {...event.params};

  liquidityRequest.save()
}
