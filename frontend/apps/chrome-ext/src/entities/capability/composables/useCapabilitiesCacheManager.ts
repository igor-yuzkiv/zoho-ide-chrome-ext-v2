import { useMockDataCollector } from './useMockDataCollector.ts'
import { PROVIDER_CACHE_TTL_MS } from '@/config/providers.config.ts'
import { useQueryClient } from '@tanstack/vue-query'
import { capabilityRecordsStorageFactory, ProviderCapabilityQueryKeys } from '@zoho-ide/shared'
import type { ZohoServiceProvider } from '@zoho-ide/shared'
import { ref } from 'vue'
import { useLogger } from '@/shared/libs/logger/useLogger.ts'
import { useCapabilitiesConfig } from '@/entities/capability/composables/useCapabilitiesConfig.ts'
import { useProviderRecordsFetcher } from '@/entities/provider/composables/useProviderRecordsFetcher.ts'
import { useProvidersStore } from '@/entities/provider/store/useProvidersStore.ts'

const localCapabilityStorage = capabilityRecordsStorageFactory('local')

export function useCapabilitiesCacheManager() {
    const mockDataCollector = useMockDataCollector() // TODO: remove mock data saving after testing

    const capabilities = useCapabilitiesConfig()
    const logger = useLogger('useProviderCacheManager')
    const recordsFetcher = useProviderRecordsFetcher()
    const providersStore = useProvidersStore()
    const isCachingInProgress = ref(false)
    const queryClient = useQueryClient()

    async function hasCapabilityRecordsInCache(providerId: string, capabilityType: string): Promise<boolean> {
        return localCapabilityStorage.countByProviderIdAndCapabilityType(providerId, capabilityType).then((c) => c > 0)
    }

    async function hasProviderCache(provider: ZohoServiceProvider): Promise<boolean> {
        return localCapabilityStorage.countByProviderId(provider.id).then((count) => count > 0)
    }

    function isProviderCacheStale(provider: ZohoServiceProvider) {
        if (!provider.lastSyncedAt) return true

        const ttl = provider.cacheTtlMs ?? PROVIDER_CACHE_TTL_MS
        return Date.now() - provider.lastSyncedAt > ttl
    }

    async function shouldSyncProvider(provider: ZohoServiceProvider) {
        const isHasCache = await hasProviderCache(provider)
        const isCacheStale = isProviderCacheStale(provider)

        return !isHasCache || isCacheStale
    }

    async function syncProviderCapabilityRecords(
        provider: ZohoServiceProvider,
        capabilityType: string
    ): Promise<boolean> {
        try {
            const records = await recordsFetcher.fetchCapabilityRecords(provider, capabilityType)
            if (!records.length) {
                logger.warn('No records fetched for capability', capabilityType, 'of provider', provider.id)
                return false
            }

            await localCapabilityStorage.bulkUpsert(records)

            //TODO: remove mock data saving after testing
            mockDataCollector.saveCapabilityMockData(provider, capabilityType, records)

            return true
        } catch (error) {
            logger.error(
                `Failed to sync capability records for provider ${provider.id} and capability ${capabilityType}:`,
                error
            )

            return false
        }
    }

    async function invalidateProviderQueries(providerId: string) {
        await queryClient
            .invalidateQueries({ queryKey: ProviderCapabilityQueryKeys.forProvider(providerId) })
            .catch((e) => logger.error('Failed to invalidate capability queries for provider', providerId, e))
    }

    async function bootstrap(provider: ZohoServiceProvider) {
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

            isCachingInProgress.value = true

            let isSomeSynced = false
            for (const cap of caps) {
                const res = await syncProviderCapabilityRecords(provider, cap.type)
                if (res) {
                    isSomeSynced = true
                }
            }

            if (!isSomeSynced) {
                logger.warn('No capability records were synced for provider', provider.id)
                return
            }

            providersStore.updateProvider(provider.id, { lastSyncedAt: Date.now() })
            await invalidateProviderQueries(provider.id)
        } finally {
            isCachingInProgress.value = false
        }
    }

    async function clearProviderCache(providerId: string) {
        if (isCachingInProgress.value) {
            return
        }

        if (!providersStore.isProviderOnline(providerId)) {
            logger.warn('Cannot clear cache for offline provider', providerId)
            return
        }

        await localCapabilityStorage.deleteByProviderId(providerId)
        await invalidateProviderQueries(providerId)

        providersStore.updateProvider(providerId, { lastSyncedAt: undefined })
    }

    return {
        isCachingInProgress,
        bootstrap,
        hasCapabilityRecordsInCache,
        hasProviderCache,
        isProviderCacheStale,
        clearProviderCache,
        invalidateProviderQueries,
    }
}
