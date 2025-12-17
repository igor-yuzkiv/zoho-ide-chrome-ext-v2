import { CAPABILITY_DEFAULT_ICON } from '@/config/capabilities.config.ts'
import { CapabilitiesRegister } from '@/config/capabilities.register.ts'
import type { Maybe } from '@zoho-ide/shared'
import type { CapabilityPort, ProviderCapability } from '@zoho-ide/shared'
import type { ProviderType, ServiceProvider } from '@zoho-ide/shared'

export function useCapabilitiesConfig() {
    function byProviderType(providerType: ProviderType): ProviderCapability[] {
        return CapabilitiesRegister[providerType] || []
    }

    function byProvider(provider: ServiceProvider): ProviderCapability[] {
        return byProviderType(provider.type)
    }

    function findCapabilityByType(provider: ServiceProvider, capabilityType: string): Maybe<ProviderCapability> {
        const capabilities = byProvider(provider)
        return capabilities.find((cap) => cap.type === capabilityType)
    }

    function resolvePort(provider: ServiceProvider, capabilityType: string): Maybe<CapabilityPort> {
        const capability = findCapabilityByType(provider, capabilityType)
        if (!capability || !capability.portFactory) {
            return
        }

        const result = capability.portFactory(provider)
        if (!result.ok) {
            return
        }

        return result.value
    }

    function getCapabilityIcon(providerType: ProviderType, capabilityType: string): string {
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
        resolvePort,
        findCapabilityByType,
        getCapabilityIcon,
    }
}
