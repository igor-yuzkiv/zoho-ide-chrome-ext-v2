import { CapabilitiesRegister } from '@/config/capabilities.config.ts'
import { CAPABILITY_DEFAULT_ICON } from '@zoho-ide/shared'
import type { Maybe } from '@zoho-ide/shared'
import type { CapabilityAdapter, ServiceProviderCapability } from '@zoho-ide/shared'
import type { ZohoServiceProvider, ZohoServiceProviderType } from '@zoho-ide/shared'

export function useCapabilitiesRegistry() {
    function byProviderType(providerType: ZohoServiceProviderType): ServiceProviderCapability[] {
        return CapabilitiesRegister[providerType] || []
    }

    function byProvider(provider: ZohoServiceProvider): ServiceProviderCapability[] {
        return byProviderType(provider.type)
    }

    function findCapabilityByType(
        provider: ZohoServiceProvider,
        capabilityType: string
    ): Maybe<ServiceProviderCapability> {
        const capabilities = byProvider(provider)
        return capabilities.find((cap) => cap.type === capabilityType)
    }

    function resolveCapabilityAdapter(provider: ZohoServiceProvider, capabilityType: string): Maybe<CapabilityAdapter> {
        const capability = findCapabilityByType(provider, capabilityType)
        if (!capability || !capability.adapterFactory) {
            return
        }

        const result = capability.adapterFactory(provider)
        if (!result.ok) {
            return
        }

        return result.value
    }

    function getCapabilityIcon(providerType: ZohoServiceProviderType, capabilityType: string): string {
        const caps = byProviderType(providerType)
        if (!caps.length) {
            return CAPABILITY_DEFAULT_ICON
        }

        const cap = caps.find((c) => c.type === capabilityType)

        return cap?.icon || CAPABILITY_DEFAULT_ICON
    }

    return {
        byProvider,
        byProviderType,
        resolveCapabilityAdapter,
        findCapabilityByType,
        getCapabilityIcon,
    }
}
