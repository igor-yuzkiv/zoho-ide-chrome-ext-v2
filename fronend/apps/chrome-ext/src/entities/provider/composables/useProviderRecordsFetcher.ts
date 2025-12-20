import type { CapabilityPort, IBaseCapabilityRecordEntity } from '@zoho-ide/shared'
import type { ZohoServiceProvider } from '@zoho-ide/shared'
import { useLogger } from '@/shared/libs/logger/useLogger.ts'
import { useCapabilitiesConfig } from '@/entities/capability/composables/useCapabilitiesConfig.ts'

export function useProviderRecordsFetcher() {
    const logger = useLogger('useProviderDataFetcher')
    const capabilities = useCapabilitiesConfig()

    async function fetchAllCapabilityRecords(
        port: CapabilityPort,
        page = 1,
        per_page = 50,
        result: IBaseCapabilityRecordEntity[] = []
    ) {
        const response = await port.list({ page, per_page })
        if (!response.ok) {
            logger.error(`Failed to fetch data from capability port`, response.error)
            return result
        }

        result.push(...response.data)

        if (response.meta.has_more) {
            return fetchAllCapabilityRecords(port, page + 1, per_page, result)
        }

        return result
    }

    async function fetchCapabilityRecords(
        provider: ZohoServiceProvider,
        capability: string
    ): Promise<IBaseCapabilityRecordEntity[]> {
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

    async function fetchProviderRecords(provider: ZohoServiceProvider): Promise<IBaseCapabilityRecordEntity[]> {
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
