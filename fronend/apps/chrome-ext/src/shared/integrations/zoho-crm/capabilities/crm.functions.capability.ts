import { IFunctionEntity } from '@zoho-ide/shared'
import type { PaginatedResult, PaginationParams } from '@zoho-ide/shared'
import type { Result } from '@zoho-ide/shared'
import { assertCrmMetadata } from '@/shared/integrations/zoho-crm/crm.utils.ts'
import { mapManyCrmFunctionsToEntity } from '@/shared/integrations/zoho-crm/mappers/crm.functions.mapper.ts'
import executeCrmFunctionsRequest from '@/shared/integrations/zoho-crm/requests/execute.crm-function.request.ts'
import fetchCrmFunctionDetailsRequest from '@/shared/integrations/zoho-crm/requests/fetch-crm-function-details.request.ts'
import fetchCrmFunctionsRequest from '@/shared/integrations/zoho-crm/requests/fetch-crm-functions.request.ts'
import type { ZohoCrmFunction } from '@/shared/integrations/zoho-crm/types/crm.functions.types.ts'
import type { CrmServiceProviderMetadata } from '@/shared/integrations/zoho-crm/types/crm.provider.types.ts'
import type { CapabilityPort, ICapabilityEntity } from '@zoho-ide/shared'
import type { ServiceProvider } from '@zoho-ide/shared'

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

                const details = await fetchFunctionsDetails(provider.tabId, metadata, response.data)

                return {
                    ok: true,
                    data: mapManyCrmFunctionsToEntity(details),
                    meta: response.meta,
                }
            },

            async execute(
                functionEntity: IFunctionEntity,
                inputData: Record<string, unknown>
            ): Promise<Result<unknown>> {
                if (!provider.tabId) {
                    return { ok: false, error: 'Provider offline' }
                }

                if (!functionEntity.apiName || !functionEntity.script) {
                    return { ok: false, error: 'Invalid function entity. apiName or script missing.' }
                }

                return executeCrmFunctionsRequest(
                    provider.tabId,
                    metadata.orgId,
                    functionEntity.apiName,
                    functionEntity.script,
                    inputData
                )
            },
        },
    }
}
