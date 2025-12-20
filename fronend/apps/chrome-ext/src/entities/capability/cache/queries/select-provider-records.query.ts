import type { IBaseCapabilityRecordEntity } from '@zoho-ide/shared'
import { providersCacheDb } from '@/entities/capability/cache'

export default async function <T extends IBaseCapabilityRecordEntity = IBaseCapabilityRecordEntity>(
    providerId: string,
    capabilityType?: string
): Promise<T[]> {
    const fields = capabilityType ? ['providerId', 'capability'] : ['providerId']
    const values = capabilityType ? [providerId, capabilityType] : [providerId]

    const query = providersCacheDb.records.where(fields).equals(values)

    const dbRecords = await query.toArray()

    return dbRecords.map((record) => record.data) as T[]
}
