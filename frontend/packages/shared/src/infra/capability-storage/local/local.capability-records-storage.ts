import type { IBaseCapabilityRecordEntity, ICapabilityRecordsStorage } from '../../../contracts/capability'
import { capabilityDexieDb } from './capability.dexie-db.ts'

export class LocalCapabilityRecordsStorage implements ICapabilityRecordsStorage {
    async bulkUpsert(records: IBaseCapabilityRecordEntity[]): Promise<boolean> {
        if (!records?.length) {
            return false
        }

        await capabilityDexieDb.records.bulkPut(
            records.map((i) => ({
                id: i.id,
                source_id: i.source_id,
                provider_id: i.provider_id,
                capability_type: i.capability_type,
                display_name: i.display_name,
                api_name: i?.api_name,
                data: i,
            }))
        )

        return true
    }

    async countByProviderId(providerId: string): Promise<number> {
        return capabilityDexieDb.records.where('provider_id').equals(providerId).count()
    }

    async countByProviderIdAndCapabilityType(providerId: string, capabilityType: string): Promise<number> {
        return capabilityDexieDb.records
            .where(['provider_id', 'capability_type'])
            .equals([providerId, capabilityType])
            .count()
    }

    async deleteByProviderId(providerId: string): Promise<number> {
        return capabilityDexieDb.records.where('provider_id').equals(providerId).delete()
    }

    async findById<T extends IBaseCapabilityRecordEntity = IBaseCapabilityRecordEntity>(id: string): Promise<T> {
        console.log('LocalCapabilityRecordsStorage.findById', id)
        const dbRecord = await capabilityDexieDb.records.where('id').equals(id).first()

        if (!dbRecord || !dbRecord.data) {
            throw new Error(`Record with id ${id} not found`)
        }

        return dbRecord.data as T
    }

    async findByProviderIdAndCapabilityType<T extends IBaseCapabilityRecordEntity = IBaseCapabilityRecordEntity>(
        providerId: string,
        capabilityType: string
    ): Promise<T[]> {
        const dbRecords = await capabilityDexieDb.records
            .where(['provider_id', 'capability_type'])
            .equals([providerId, capabilityType])
            .toArray()

        return dbRecords.map((record) => record.data as T)
    }
}
