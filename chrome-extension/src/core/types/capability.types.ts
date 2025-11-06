import type { IEntity } from '@/shared/types/entitiy.types.ts'
import type { PaginatedResult, PaginationParams } from '@/shared/types/pagination.types.ts'
import type { Result } from '@/shared/types/result.types.ts'
import type { ServiceProvider } from '@/core/types/provider.types.ts'

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
