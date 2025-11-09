import { providersCacheDb } from '@/shared/cache'
import { generateCacheRecordId } from '@/shared/cache/cache-record.service.ts'
import { useCapabilitiesSettings } from '@/entities/capability/composables/useCapabilitiesSettings.ts'
import { useProviderRecordsFetcher } from '@/entities/provider/composables/useProviderRecordsFetcher.ts'
import type { ICapabilityEntity } from '@/entities/capability/capability.types.ts'
import type { ServiceProvider } from '@/entities/provider/provider.types.ts'
import { saveMockData } from '@/shared/api/mock/mock.api.ts'
import { useLogger } from '@/shared/libs/logger/useLogger.ts'
import type { IModuleFieldMetadataEntity } from '@/capabilities/metadata/metadata.types.ts'

//TODO: remove mock data saving after testing

async function saveFieldsMockData(provider: ServiceProvider, records: IModuleFieldMetadataEntity[]) {
    const perModule = records.reduce<Record<string, IModuleFieldMetadataEntity[]>>((acc, record) => {
        if (!record.moduleApiName || !record.originEntity) {
            return acc
        }

        if (record.moduleApiName in acc) {
            acc[record.moduleApiName]!.push(record)
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

async function saveCapabilityMockData(provider: ServiceProvider, capabilityType: string, records: ICapabilityEntity[]) {
    if (capabilityType !== 'fields') {
        const data = records.map((r) => r?.originEntity).filter(Boolean)
        return saveMockData(`${provider.id}-${capabilityType}`, data).catch(console.error)
    }

    return saveFieldsMockData(provider, records as IModuleFieldMetadataEntity[])
}

export function useProviderCacheManager() {
    const capabilities = useCapabilitiesSettings()
    const logger = useLogger('useProviderCacheManager')
    const recordsFetcher = useProviderRecordsFetcher()

    async function hasCapabilityRecordsInCache(providerId: string, capabilityType: string): Promise<boolean> {
        const count = await providersCacheDb.records
            .where(['providerId', 'capability'])
            .equals([providerId, capabilityType])
            .count()

        return count > 0
    }

    async function upsertCapabilityRecordsInCache(
        provider: ServiceProvider,
        capabilityType: string,
        records: ICapabilityEntity[]
    ) {
        return providersCacheDb.records.bulkPut(
            records.map((record) => ({
                id: generateCacheRecordId(provider.id, capabilityType, record.id),
                capability: capabilityType,
                providerId: provider.id,
                data: record,
            }))
        )
    }

    async function bootstrap(provider: ServiceProvider) {
        const caps = capabilities.byProvider(provider)
        if (!caps.length) {
            logger.warn('No capabilities found for provider', provider.id)
            return
        }

        for (const cap of caps) {
            const hasRecords = await hasCapabilityRecordsInCache(provider.id, cap.type)
            if (hasRecords) {
                continue
            }

            const records = await recordsFetcher.fetchCapabilityRecords(provider, cap.type)
            if (!records.length) {
                logger.warn('No records fetched for capability', cap.type, 'of provider', provider.id)
                continue
            }

            await upsertCapabilityRecordsInCache(provider, cap.type, records)

            //TODO: remove mock data saving after testing
            if (import.meta.env.VITE_COLLECT_MOCK_DATA === 'true') {
                console.log('[useProviderCacheBootstrap] COLLECTING MOCK DATA FOR', {
                    provider: provider.id,
                    capability: cap.type,
                })
                await saveCapabilityMockData(provider, cap.type, records)
            }
        }
    }

    return {
        bootstrap,
    }
}
