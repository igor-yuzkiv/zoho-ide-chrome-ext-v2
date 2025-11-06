import { fetchMockData } from '@/shared/api/mock/mock.api.ts'
import { zohoCrmRequest } from '@/shared/api/zoho/zoho.api.ts'
import type { PaginatedResult, PaginationParams } from '@/shared/types/pagination.types.ts'
import { formatZohoCrmProviderId } from '@/shared/integrations/zoho-crm/crm.provider.ts'
import type { ZohoCrmWorkflow } from '@/shared/integrations/zoho-crm/types/crm.workflow.types.ts'

type Response = {
    info: {
        count: number
        more_records: boolean
        page: number
        per_page: number
    }
    workflow_rules: ZohoCrmWorkflow[]
}

async function regular(
    tabId: number,
    orgId: string,
    pagination: PaginationParams
): Promise<PaginatedResult<ZohoCrmWorkflow[]>> {
    const response = await zohoCrmRequest<Response>(tabId, {
        url: `/crm/v8/settings/automation/workflow_rules?page=${pagination.page}&per_page=${pagination.perPage}`,
        method: 'GET',
        headers: { 'x-crm-org': orgId },
    })

    if (!response.ok) {
        return response
    }

    if (!response.value || !Array.isArray(response.value.workflow_rules) || !response.value.info) {
        return { ok: false, error: 'Invalid response format' }
    }

    const { workflow_rules, info } = response.value

    return {
        ok: true,
        value: workflow_rules,
        meta: {
            count: info.count,
            page: info.page,
            perPage: info.per_page,
            hasMore: info.more_records,
        },
    }
}

async function mock(orgId: string): Promise<PaginatedResult<ZohoCrmWorkflow[]>> {
    const fileName = `${formatZohoCrmProviderId(orgId)}-workflows.json`

    const data = await fetchMockData<ZohoCrmWorkflow[]>(fileName)
    if (!data) {
        return { ok: false, error: 'Mock data not found' }
    }

    return {
        ok: true,
        value: data,
        meta: {
            count: data.length,
            page: 1,
            perPage: data.length,
            hasMore: false,
        },
    }
}

export default async function (
    tabId: number,
    orgId: string,
    pagination: PaginationParams
): Promise<PaginatedResult<ZohoCrmWorkflow[]>> {
    return import.meta.env.VITE_MOCK_API === 'true' ? mock(orgId) : regular(tabId, orgId, pagination)
}
