import type { IEntity, PaginatedResult, PaginationParams, Result } from '../../../types'
import type { ServiceProvider } from '../../provider'
import type { IFunctionEntity } from './capabilities/function.capability.types.ts'

export type ProviderCapability = {
    type: string
    title: string
    icon: string
    portFactory: CapabilityPortFactory
    hideInMenu?: boolean
}

export interface CapabilityPort {
    list(pagination: PaginationParams): Promise<PaginatedResult<ICapabilityEntity[]>>
    execute?(functionEntity: IFunctionEntity, inputData: Record<string, unknown>): Promise<Result<unknown>>
}

export type CapabilityPortFactory = (provider: ServiceProvider) => Result<CapabilityPort>

export interface ICapabilityEntity extends IEntity {
    id: string
    displayName: string
}
