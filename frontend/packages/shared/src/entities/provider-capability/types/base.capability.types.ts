import type { IEntity, Maybe, PaginatedResult, PaginationParams, Result } from '../../../types'
import type { ZohoServiceProvider } from '../../zoho-service-provider'
import type { IFunctionRecordEntity } from './function.capability.types.ts'

export type ServiceProviderCapability = {
    type: string
    title: string
    icon: string
    adapterFactory: (provider: ZohoServiceProvider) => Result<CapabilityAdapter>
    hideInMenu?: boolean
}

export interface CapabilityAdapter {
    list(pagination: PaginationParams): Promise<PaginatedResult<IBaseCapabilityRecordEntity[]>>
    execute?(functionEntity: IFunctionRecordEntity, inputData: Record<string, unknown>): Promise<Result<unknown>>
}

export type CapabilityId = string

export interface IBaseCapabilityRecordEntity extends IEntity {
    id: CapabilityId
    source_id: string
    provider_id: string
    capability_type: string
    display_name: string
    api_name?: Maybe<string>
    origin_entity: IEntity
}
