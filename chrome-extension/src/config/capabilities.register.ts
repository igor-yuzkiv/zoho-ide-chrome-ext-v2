import { ZohoCrmCapabilities } from '@/shared/integrations/zoho-crm/capabilities'
import type { ProviderCapability } from '@/entities/capability/capability.types.ts'
import type { ProviderType } from '@/entities/provider/provider.types.ts'

export const CapabilitiesRegister: Record<ProviderType, ProviderCapability[]> = {
    crm: ZohoCrmCapabilities,
    finance: [],
}
