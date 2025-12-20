import type { ServiceProviderCapability } from '@zoho-ide/shared'
import type { ZohoServiceProviderType } from '@zoho-ide/shared'
import { ZohoCrmCapabilities } from '@/shared/integrations/zoho-crm/capabilities'
import { ZohoFinanceCapabilities } from '@/shared/integrations/zoho-finance/capabilities'

export const CapabilitiesRegister: Record<ZohoServiceProviderType, ServiceProviderCapability[]> = {
    crm: ZohoCrmCapabilities,
    finance: ZohoFinanceCapabilities,
}
