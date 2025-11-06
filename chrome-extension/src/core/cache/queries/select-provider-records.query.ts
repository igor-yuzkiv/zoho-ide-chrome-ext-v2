import type { ICapabilityEntity } from '@/core/types/capability.types.ts'
import { providersCacheDb } from '@/core/cache'

export default async function <T extends ICapabilityEntity = ICapabilityEntity>(
    providerId: string,
    capabilityType?: string
): Promise<T[]> {
    const fields = capabilityType ? ['providerId', 'capability'] : ['providerId']
    const values = capabilityType ? [providerId, capabilityType] : [providerId]

    const query = providersCacheDb.records.where(fields).equals(values)

    const dbRecords = await query.toArray()

    return dbRecords.map((record) => record.data) as T[]
}
