import type { PaginatedResult } from '@/shared/types/pagination.types.ts'
import type { Result } from '@/shared/types/result.types.ts'
import { assertCrmMetadata } from '@/shared/integrations/zoho-crm/crm.utils.ts'
import { mapManyCrmModulesToEntities } from '@/shared/integrations/zoho-crm/mappers/crm.metadata.mapper.ts'
import fetchCrmModulesRequest from '@/shared/integrations/zoho-crm/requests/fetch.crm-modules.request.ts'
import type { CapabilityPort, ICapabilityEntity } from '@/core/types/capability.types.ts'
import type { ServiceProvider } from '@/core/types/provider.types.ts'

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
                    value: mapManyCrmModulesToEntities(modulesResponse.value),
                    meta: {
                        count: modulesResponse.value.length,
                        page: 1,
                        perPage: modulesResponse.value.length,
                        hasMore: false,
                    },
                }
            },
        },
    }
}
