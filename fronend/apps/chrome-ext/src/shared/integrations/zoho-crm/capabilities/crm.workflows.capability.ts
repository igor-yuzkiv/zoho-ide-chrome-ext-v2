import type { PaginatedResult, PaginationParams } from '@/shared/types/pagination.types.ts'
import type { Result } from '@/shared/types/result.types.ts'
import { assertCrmMetadata } from '@/shared/integrations/zoho-crm/crm.utils.ts'
import { mapManyToWorkflowEntity } from '@/shared/integrations/zoho-crm/mappers/crm.workflows.mapper.ts'
import fetchCrmWorkflowDetailsRequest from '@/shared/integrations/zoho-crm/requests/fetch-crm-workflow-details.request.ts'
import fetchCrmWorkflowsRequest from '@/shared/integrations/zoho-crm/requests/fetch-crm-workflows.request.ts'
import type { CrmServiceProviderMetadata } from '@/shared/integrations/zoho-crm/types/crm.provider.types.ts'
import type { ZohoCrmWorkflow } from '@/shared/integrations/zoho-crm/types/crm.workflow.types.ts'
import type { CapabilityPort, ICapabilityEntity } from '@/entities/capability/capability.types.ts'
import type { ServiceProvider } from '@/entities/provider/provider.types.ts'

async function fetchWorkflowsDetails(
    tabId: number,
    metadata: CrmServiceProviderMetadata,
    list: ZohoCrmWorkflow[]
): Promise<ZohoCrmWorkflow[]> {
    const detailResponse = await Promise.all(
        list.map((i) => fetchCrmWorkflowDetailsRequest(tabId, metadata.orgId, i.id))
    )

    const result = detailResponse.filter((res) => res.ok).flatMap((res) => res.value)
    return result.length ? result : list
}

export function crmWorkflowCapabilityPortFactory(provider: ServiceProvider): Result<CapabilityPort> {
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

                const response = await fetchCrmWorkflowsRequest(provider.tabId, metadata.orgId, pagination)

                if (!response.ok) {
                    return response
                }

                const details = await fetchWorkflowsDetails(provider.tabId, metadata, response.data)

                return {
                    ok: true,
                    data: mapManyToWorkflowEntity(details),
                    meta: response.meta,
                }
            },
        },
    }
}
