import type { IEntity } from '@zoho-ide/shared'
import type { PaginatedResult, PaginationParams } from '@/shared/types/pagination.types.ts'
import type { Result } from '@/shared/types/result.types.ts'
import type { ServiceProvider } from '@/entities/provider/provider.types.ts'

export type ProviderCapability = {
    type: string
    title: string
    icon: string
    portFactory: CapabilityPortFactory
    hideInMenu?: boolean
}

export type CapabilityPort = {
    list(pagination: PaginationParams): Promise<PaginatedResult<ICapabilityEntity[]>>
}

export type CapabilityPortFactory = (provider: ServiceProvider) => Result<CapabilityPort>

export interface ICapabilityEntity extends IEntity {
    id: string
    displayName: string
}
