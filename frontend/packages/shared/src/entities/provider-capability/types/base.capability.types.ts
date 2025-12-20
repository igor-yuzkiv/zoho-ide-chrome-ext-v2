import type { IEntity, PaginatedResult, PaginationParams, Result } from '../../../types'
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

export interface IBaseCapabilityRecordEntity extends IEntity {
    id: string
    sourceId: string
    displayName: string
}
