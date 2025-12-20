import type { PaginatedResult, PaginationParams } from '@zoho-ide/shared'
import { fetchMockData } from '@/shared/api/mock/mock.api.ts'
import { zohoCrmRequest } from '@/shared/api/zoho/zoho.api.ts'
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
        url: `/crm/v8/settings/automation/workflow_rules?page=${pagination.page}&per_page=${pagination.per_page}`,
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
        data: workflow_rules,
        meta: {
            total: info.count,
            page: info.page,
            per_page: info.per_page,
            has_more: info.more_records,
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
        data: data,
        meta: {
            total: data.length,
            page: 1,
            per_page: data.length,
            has_more: false,
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
