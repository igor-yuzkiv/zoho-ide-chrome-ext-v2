import type { ProviderCapability } from '@zoho-ide/shared'
import type { ProviderType } from '@zoho-ide/shared'
import { ZohoCrmCapabilities } from '@/shared/integrations/zoho-crm/capabilities'
import { ZohoFinanceCapabilities } from '@/shared/integrations/zoho-finance/capabilities'

export const CapabilitiesRegister: Record<ProviderType, ProviderCapability[]> = {
    crm: ZohoCrmCapabilities,
    finance: ZohoFinanceCapabilities,
}
