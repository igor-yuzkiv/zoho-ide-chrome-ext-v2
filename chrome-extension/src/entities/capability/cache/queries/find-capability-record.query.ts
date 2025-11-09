import type { ICapabilityEntity } from '@/entities/capability/capability.types.ts'
import { providersCacheDb } from '@/entities/capability/cache'
import { generateCacheRecordId } from '@/entities/capability/cache/cache-record.service.ts'

export default async function <T extends ICapabilityEntity = ICapabilityEntity>(
    providerId: string,
    capabilityType: string,
    id: string
): Promise<T> {
    const recordId = generateCacheRecordId(providerId, capabilityType, id)

    const query = providersCacheDb.records.where('id').equals(recordId)

    const dbRecord = await query.first()
    if (!dbRecord) {
        throw new Error(`Record with id ${recordId} not found`)
    }

    return dbRecord.data as T
}
