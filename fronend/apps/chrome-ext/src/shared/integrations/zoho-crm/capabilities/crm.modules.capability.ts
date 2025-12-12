import type { PaginatedResult } from '@zoho-ide/shared'
import type { Result } from '@zoho-ide/shared'
import { assertCrmMetadata } from '@/shared/integrations/zoho-crm/crm.utils.ts'
import { mapManyCrmModulesToEntities } from '@/shared/integrations/zoho-crm/mappers/crm.metadata.mapper.ts'
import fetchCrmModulesRequest from '@/shared/integrations/zoho-crm/requests/fetch.crm-modules.request.ts'
import type { CapabilityPort, ICapabilityEntity } from '@/entities/capability/capability.types.ts'
import type { ServiceProvider } from '@/entities/provider/provider.types.ts'

export function crmModulesCapabilityPortFactory(provider: ServiceProvider): Result<CapabilityPort> {
    const metadata = assertCrmMetadata(provider)
    if (!metadata) {
        return { ok: false, error: 'Invalid provider metadata' }
    }

    return {
        ok: true,
        value: {
            async list(): Promise<PaginatedResult<ICapabilityEntity[]>> {
                if (!provider.tabId) {
                    return { ok: false, error: 'Provider offline' }
                }

                const modulesResponse = await fetchCrmModulesRequest(provider.tabId, metadata.orgId)
                if (!modulesResponse.ok) {
                    return modulesResponse
                }

                return {
                    ok: true,
                    data: mapManyCrmModulesToEntities(modulesResponse.value),
                    meta: {
                        total: modulesResponse.value.length,
                        page: 1,
                        perPage: modulesResponse.value.length,
                        hasMore: false,
                    },
                }
            },
        },
    }
}
