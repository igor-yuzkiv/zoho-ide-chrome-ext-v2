import type { IBaseCapabilityRecordEntity } from '@zoho-ide/shared'
import Dexie, { type EntityTable } from 'dexie'

type DbRecord = {
    id: string
    capability: string
    providerId: string
    data: IBaseCapabilityRecordEntity
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
