import { useMockDataCollector } from './useMockDataCollector.ts'
import { CapabilityQueryKeys } from '@/config/capabilities.config.ts'
import { PROVIDER_CACHE_TTL_MS } from '@/config/providers.config.ts'
import { useQueryClient } from '@tanstack/vue-query'
import { ref } from 'vue'
import { useLogger } from '@/shared/libs/logger/useLogger.ts'
import { providersCacheDb } from '@/entities/capability/cache'
import { generateCacheRecordId } from '@/entities/capability/cache/cache-record.service.ts'
import type { ICapabilityEntity } from '@/entities/capability/capability.types.ts'
import { useCapabilitiesConfig } from '@/entities/capability/composables/useCapabilitiesConfig.ts'
import { useProviderRecordsFetcher } from '@/entities/provider/composables/useProviderRecordsFetcher.ts'
import type { ServiceProvider } from '@/entities/provider/provider.types.ts'
import { useProvidersStore } from '@/entities/provider/store/useProvidersStore.ts'

export function useCapabilitiesCacheManager() {
    const capabilities = useCapabilitiesConfig()
    const logger = useLogger('useProviderCacheManager')
    const recordsFetcher = useProviderRecordsFetcher()
    const providersStore = useProvidersStore()
    const mockDataCollector = useMockDataCollector() // TODO: remove mock data saving after testing
    const isSynchronizing = ref(false)
    const queryClient = useQueryClient()

    async function hasCapabilityRecordsInCache(providerId: string, capabilityType: string): Promise<boolean> {
        const count = await providersCacheDb.records
            .where(['providerId', 'capability'])
            .equals([providerId, capabilityType])
            .count()

        return count > 0
    }

    async function isProviderHasCache(provider: ServiceProvider): Promise<boolean> {
        const count = await providersCacheDb.records.where('providerId').equals(provider.id).count()

        return count > 0
    }

    function isProviderCacheStale(provider: ServiceProvider) {
        if (!provider.lastSyncedAt) return true

        const ttl = provider.cacheTtlMs ?? PROVIDER_CACHE_TTL_MS
        return Date.now() - provider.lastSyncedAt > ttl
    }

    async function shouldSyncProvider(provider: ServiceProvider) {
        const isHasCache = await isProviderHasCache(provider)
        const isCacheStale = isProviderCacheStale(provider)

        return !isHasCache || isCacheStale
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

    async function syncProviderCapabilityRecords(provider: ServiceProvider, capabilityType: string): Promise<boolean> {
        try {
            const records = await recordsFetcher.fetchCapabilityRecords(provider, capabilityType)
            if (!records.length) {
                logger.warn('No records fetched for capability', capabilityType, 'of provider', provider.id)
                return false
            }

            await upsertCapabilityRecordsInCache(provider, capabilityType, records)

            //TODO: remove mock data saving after testing
            await mockDataCollector.saveCapabilityMockData(provider, capabilityType, records).catch(console.error)

            return true
        } catch (error) {
            logger.error(
                `Failed to sync capability records for provider ${provider.id} and capability ${capabilityType}:`,
                error
            )

            return false
        }
    }

    async function bootstrap(provider: ServiceProvider) {
        try {
            const shouldSync = await shouldSyncProvider(provider)
            if (!shouldSync) {
                return
            }

            const caps = capabilities.byProvider(provider)
            if (!caps.length) {
                logger.warn('No capabilities found for provider', provider.id)
                return
            }

            isSynchronizing.value = true

            let isSomeSynced = false
            for (const cap of caps) {
                const res = await syncProviderCapabilityRecords(provider, cap.type)
                if (res) {
                    isSomeSynced = true
                }
            }

            if (!isSomeSynced) {
                console.warn('No capability records were synced for provider', provider.id)
                return
            }

            providersStore.updateProvider(provider.id, { lastSyncedAt: Date.now() })

            await queryClient
                .invalidateQueries({ queryKey: CapabilityQueryKeys.forProvider(provider.id) })
                .catch(console.error)
        } finally {
            isSynchronizing.value = false
        }
    }

    async function clearProviderCache(providerId: string) {
        if (!providersStore.isProviderOnline(providerId)) {
            logger.warn('Cannot clear cache for offline provider', providerId)
            return
        }

        await providersCacheDb.records.where('providerId').equals(providerId).delete()

        await queryClient
            .invalidateQueries({ queryKey: CapabilityQueryKeys.forProvider(providerId) })
            .catch(console.error)

        providersStore.updateProvider(providerId, { lastSyncedAt: undefined })
    }

    return {
        isSynchronizing,
        bootstrap,
        hasCapabilityRecordsInCache,
        isProviderHasCache,
        isProviderCacheStale,
        clearProviderCache,
    }
}
