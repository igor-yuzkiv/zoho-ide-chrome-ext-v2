import { useLogger } from '@/shared/libs/logger/useLogger.ts'
import { useCapabilities } from '@/core/composables/useCapabilities.ts'
import type { CapabilityPort, ICapabilityEntity } from '@/core/types/capability.types.ts'
import type { ServiceProvider } from '@/core/types/provider.types.ts'

export function useProviderRecordsFetcher() {
    const logger = useLogger('useProviderDataFetcher')
    const capabilities = useCapabilities()

    async function fetchAllCapabilityRecords(
        port: CapabilityPort,
        page: number = 1,
        perPage: number = 50,
        result: ICapabilityEntity[] = []
    ) {
        const response = await port.list({ page, perPage })
        if (!response.ok) {
            logger.error(`Failed to fetch data from capability port`, response.error)
            return result
        }

        result.push(...response.value)

        if (response.meta.hasMore) {
            return fetchAllCapabilityRecords(port, page + 1, perPage, result)
        }

        return result
    }

    async function fetchCapabilityRecords(provider: ServiceProvider, capability: string): Promise<ICapabilityEntity[]> {
        const port = capabilities.resolvePort(provider, capability)
        if (!port) {
            logger.warn(`No port found for capability "${capability}" on provider "${provider.id}"`)
            return []
        }

        if (typeof port.list !== 'function') {
            logger.warn(
                `Port for capability "${capability}" on provider "${provider.id}" does not implement a list method`
            )
            return []
        }

        return await fetchAllCapabilityRecords(port)
    }

    async function fetchProviderRecords(provider: ServiceProvider): Promise<ICapabilityEntity[]> {
        const caps = capabilities.byProvider(provider)
        if (caps.length === 0) {
            logger.warn(`No capabilities found for provider "${provider.id}"`)
            return []
        }

        return Promise.all(caps.map((c) => fetchCapabilityRecords(provider, c.type))).then((results) => results.flat())
    }

    return {
        fetchCapabilityRecords,
        fetchProviderRecords,
    }
}
