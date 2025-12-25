import { IBaseCapabilityRecordEntity } from '../types'

export type CapabilityRecordsStorageStrategyType = 'local' // remote in future

export interface ICapabilityRecordsStorage {
    bulkUpsert(records: IBaseCapabilityRecordEntity[]): Promise<boolean>

    countByProviderId(providerId: string): Promise<number>

    countByProviderIdAndCapabilityType(providerId: string, capabilityType: string): Promise<number>

    deleteByProviderId(providerId: string): Promise<number>

    findById<T extends IBaseCapabilityRecordEntity = IBaseCapabilityRecordEntity>(id: string): Promise<T>

    findByProviderIdAndCapabilityType<T extends IBaseCapabilityRecordEntity = IBaseCapabilityRecordEntity>(
        providerId: string,
        capabilityType: string
    ): Promise<T[]>
}
