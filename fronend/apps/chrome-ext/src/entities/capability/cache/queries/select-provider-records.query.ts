import type { ICapabilityEntity } from '@/entities/capability/capability.types.ts'
import { providersCacheDb } from '@/entities/capability/cache'

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
