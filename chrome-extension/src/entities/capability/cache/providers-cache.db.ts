import Dexie, { type EntityTable } from 'dexie'
import type { ICapabilityEntity } from '@/entities/capability/capability.types.ts'

type DbRecord = {
    id: string
    capability: string
    providerId: string
    data: ICapabilityEntity
}

export class ProvidersCacheDatabase extends Dexie {
    records!: EntityTable<DbRecord, 'id'>

    constructor() {
        super('providers-cache')

        this.version(1).stores({
            records: 'id, capability, providerId, [providerId+capability]',
        })
    }
}

export const providersCacheDb = new ProvidersCacheDatabase()
