import type { IModuleFieldMetadataEntity } from '@/capabilities/metadata/metadata.types.ts'
import { saveMockData } from '@/shared/api/mock/mock.api.ts'
import type { ICapabilityEntity } from '@/entities/capability/capability.types.ts'
import type { ServiceProvider } from '@/entities/provider/provider.types.ts'

// TODO: remove mock data saving after testing
export function useMockDataCollector() {
    async function saveFieldsMockData(provider: ServiceProvider, records: IModuleFieldMetadataEntity[]) {
        const perModule = records.reduce<Record<string, IModuleFieldMetadataEntity[]>>((acc, record) => {
            if (!record.moduleApiName || !record.originEntity) {
                return acc
            }

            if (record.moduleApiName in acc) {
                acc[record.moduleApiName].push(record)
            } else {
                acc[record.moduleApiName] = [record]
            }

            return acc
        }, {})

        return Promise.all(
            Object.entries(perModule).map(([moduleApiName, recs]) =>
                saveMockData(`${provider.id}-fields-${moduleApiName}`, recs.map((r) => r.originEntity).filter(Boolean))
            )
        )
    }

    async function saveCapabilityMockData(
        provider: ServiceProvider,
        capabilityType: string,
        records: ICapabilityEntity[]
    ) {
        if (import.meta.env.VITE_COLLECT_MOCK_DATA !== 'true') {
            return
        }

        console.warn('--- [useMockDataCollector] COLLECTING MOCK DATA FOR', {
            provider: provider.id,
            capability: capabilityType,
        })

        if (capabilityType !== 'fields') {
            const data = records.map((r) => r?.originEntity).filter(Boolean)
            return saveMockData(`${provider.id}-${capabilityType}`, data).catch(console.error)
        }

        return saveFieldsMockData(provider, records as IModuleFieldMetadataEntity[])
    }

    return {
        saveCapabilityMockData,
    }
}
