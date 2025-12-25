import type { Maybe } from '../../../../types'
import type { IBaseCapabilityRecordEntity } from '../../types'
import Dexie, { type EntityTable } from 'dexie'

export type CapabilityDexieDbDbRecord = {
    id: string
    source_id: string
    provider_id: string
    capability_type: string
    display_name: string
    api_name?: Maybe<string>
    data: IBaseCapabilityRecordEntity
}

export class CapabilityDexieDb extends Dexie {
    records!: EntityTable<CapabilityDexieDbDbRecord, 'id'>

    constructor() {
        super('capabilities-records-storage')

        this.version(1).stores({
            records: '&id, capability_type, provider_id, display_name, api_name, [provider_id+capability_type]',
        })
    }
}

export const capabilityDexieDb = new CapabilityDexieDb()
