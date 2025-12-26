import { ZohoCrmCapabilities } from '@/integrations/zoho-crm/adapters'
import { ZohoFinanceCapabilities } from '@/integrations/zoho-finance/adapters'
import type { ServiceProviderCapability } from '@zoho-ide/shared'
import type { ZohoServiceProviderType } from '@zoho-ide/shared'

export const CapabilitiesRegister: Record<ZohoServiceProviderType, ServiceProviderCapability[]> = {
    crm: ZohoCrmCapabilities,
    finance: ZohoFinanceCapabilities,
}
