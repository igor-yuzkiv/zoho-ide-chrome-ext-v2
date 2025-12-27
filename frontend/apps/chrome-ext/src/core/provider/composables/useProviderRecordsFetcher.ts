import { useCapabilitiesRegistry } from '@/core/capability'
import type { CapabilityAdapter, IBaseCapabilityRecordEntity } from '@zoho-ide/shared'
import type { ZohoServiceProvider } from '@zoho-ide/shared'

export function useProviderRecordsFetcher() {
    const capabilities = useCapabilitiesRegistry()

    async function fetchAllCapabilityRecords(
        capabilityAdapter: CapabilityAdapter,
        page = 1,
        per_page = 50,
        result: IBaseCapabilityRecordEntity[] = []
    ) {
        const response = await capabilityAdapter.list({ page, per_page })
        if (!response.ok) {
            console.error(`Failed to fetch data from capability port`, response.error)
            return result
        }

        result.push(...response.data)

        if (response.meta.has_more) {
            return fetchAllCapabilityRecords(capabilityAdapter, page + 1, per_page, result)
        }

        return result
    }

    async function fetchCapabilityRecords(
        provider: ZohoServiceProvider,
        capability: string
    ): Promise<IBaseCapabilityRecordEntity[]> {
        const capabilityAdapter = capabilities.resolveCapabilityAdapter(provider, capability)
        if (!capabilityAdapter) {
            console.warn(`No adapter found for capability "${capability}" on provider "${provider.id}"`)
            return []
        }

        if (typeof capabilityAdapter.list !== 'function') {
            console.warn(
                `Port for capability "${capability}" on provider "${provider.id}" does not implement a list method`
            )
            return []
        }

        return await fetchAllCapabilityRecords(capabilityAdapter)
    }

    async function fetchProviderRecords(provider: ZohoServiceProvider): Promise<IBaseCapabilityRecordEntity[]> {
        const caps = capabilities.byProvider(provider)
        if (caps.length === 0) {
            console.warn(`No capabilities found for provider "${provider.id}"`)
            return []
        }

        return Promise.all(caps.map((c) => fetchCapabilityRecords(provider, c.type))).then((results) => results.flat())
    }

    return {
        fetchCapabilityRecords,
        fetchProviderRecords,
    }
}
