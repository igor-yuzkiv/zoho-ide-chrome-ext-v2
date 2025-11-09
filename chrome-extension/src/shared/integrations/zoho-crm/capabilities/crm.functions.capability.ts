import type { PaginatedResult, PaginationParams } from '@/shared/types/pagination.types.ts'
import type { Result } from '@/shared/types/result.types.ts'
import { assertCrmMetadata } from '@/shared/integrations/zoho-crm/crm.utils.ts'
import { mapManyToFunctionEntity } from '@/shared/integrations/zoho-crm/mappers/crm.functions.mapper.ts'
import fetchCrmFunctionDetailsRequest from '@/shared/integrations/zoho-crm/requests/fetch-crm-function-details.request.ts'
import fetchCrmFunctionsRequest from '@/shared/integrations/zoho-crm/requests/fetch-crm-functions.request.ts'
import type { ZohoCrmFunction } from '@/shared/integrations/zoho-crm/types/crm.functions.types.ts'
import type { CrmServiceProviderMetadata } from '@/shared/integrations/zoho-crm/types/crm.provider.types.ts'
import type { CapabilityPort, ICapabilityEntity } from '@/entities/capability/capability.types.ts'
import type { ServiceProvider } from '@/entities/provider/provider.types.ts'

async function fetchFunctionsDetails(
    tabId: number,
    metadata: CrmServiceProviderMetadata,
    list: ZohoCrmFunction[]
): Promise<ZohoCrmFunction[]> {
    const detailResponse = await Promise.all(
        list.map((fx) => fetchCrmFunctionDetailsRequest(tabId, metadata.orgId, fx.id))
    )

    const result = detailResponse.filter((res) => res.ok).flatMap((res) => res.value)
    return result.length ? result : list
}

export function crmFunctionsCapabilityPortFactory(provider: ServiceProvider): Result<CapabilityPort> {
    const metadata = assertCrmMetadata(provider)
    if (!metadata) {
        return { ok: false, error: 'Invalid provider metadata' }
    }

    return {
        ok: true,
        value: {
            async list(pagination: PaginationParams): Promise<PaginatedResult<ICapabilityEntity[]>> {
                if (!provider.tabId) {
                    return { ok: false, error: 'Provider offline' }
                }

                const response = await fetchCrmFunctionsRequest(provider.tabId, metadata.orgId, pagination)
                if (!response.ok) {
                    return response
                }

                const details = await fetchFunctionsDetails(provider.tabId, metadata, response.value)

                return {
                    ok: true,
                    value: mapManyToFunctionEntity(details),
                    meta: response.meta,
                }
            },
        },
    }
}
