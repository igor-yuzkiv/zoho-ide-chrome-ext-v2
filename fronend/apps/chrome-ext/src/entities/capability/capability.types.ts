import { IFunctionEntity } from '@/capabilities/function/function.types.ts'
import type { IEntity } from '@zoho-ide/shared'
import type { PaginatedResult, PaginationParams } from '@zoho-ide/shared'
import type { Result } from '@zoho-ide/shared'
import type { ServiceProvider } from '@/entities/provider/provider.types.ts'

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
