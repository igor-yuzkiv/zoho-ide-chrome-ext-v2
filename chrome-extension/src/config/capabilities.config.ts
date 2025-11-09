import ZohoCrmCapabilities from '@/shared/integrations/zoho-crm/capabilities'
import type { ProviderCapability } from '@/entities/capability/capability.types.ts'
import type { ProviderType } from '@/entities/provider/provider.types.ts'

export const CapabilityType = {
    FUNCTIONS: 'functions',
    WORKFLOWS: 'workflows',
    MODULES: 'modules',
    FIELDS: 'fields',
} as const

export const CAPABILITY_DEFAULT_ICON = 'carbon:undefined'

export const CapabilitiesRegister: Record<ProviderType, ProviderCapability[]> = {
    crm: ZohoCrmCapabilities,
    finance: [],
}
