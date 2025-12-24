import type { ZohoServiceProvider } from '../../zoho-service-provider/types'
import { IBaseCapabilityRecordEntity } from '../types'

export interface ICapabilityRecordsStorage {
    countByProviderId(providerId: string): Promise<number>

    countByProviderIdAndCapabilityType(providerId: string, capabilityType: string): Promise<number>

    bulkUpsert(serviceProvider: ZohoServiceProvider, records: IBaseCapabilityRecordEntity[]): Promise<void>
}
