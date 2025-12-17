import type { IModuleFieldMetadataRecordEntity } from '@zoho-ide/shared'
import type { IBaseCapabilityRecordEntity } from '@zoho-ide/shared'
import type { ServiceProvider } from '@zoho-ide/shared'
import { saveMockData } from '@/shared/api/mock/mock.api.ts'

// TODO: remove mock data saving after testing
export function useMockDataCollector() {
    async function saveFieldsMockData(provider: ServiceProvider, records: IModuleFieldMetadataRecordEntity[]) {
        const perModule = records.reduce<Record<string, IModuleFieldMetadataRecordEntity[]>>((acc, record) => {
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

    function saveCapabilityMockData(
        provider: ServiceProvider,
        capabilityType: string,
        records: IBaseCapabilityRecordEntity[]
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

        return saveFieldsMockData(provider, records as IModuleFieldMetadataRecordEntity[])
    }

    return {
        saveCapabilityMockData,
    }
}
