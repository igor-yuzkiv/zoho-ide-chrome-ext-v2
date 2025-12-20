import type { PaginatedResult, PaginationParams } from '@zoho-ide/shared'
import { fetchMockData } from '@/shared/api/mock/mock.api.ts'
import { zohoCrmRequest } from '@/shared/api/zoho/zoho.api.ts'
import type { ZohoFinanceFunctionResponse } from '@/shared/integrations/zoho-finance/types/finance.functions.types.ts'
import { formatZohoFinanceProviderId } from '@/shared/integrations/zoho-finance/zoho-finance.utils.ts'

type ResponseType = {
    customfunctions: ZohoFinanceFunctionResponse[]
    page_context: {
        has_more_page: boolean
        page: number
        per_page: number
        report_name: string
        sort_column: string
        sort_order: string
    }
}

async function regular(
    tabId: number,
    orgId: string,
    pagination: PaginationParams,
    apiVersion = 'v3'
): Promise<PaginatedResult<ZohoFinanceFunctionResponse[]>> {
    const queryString = new URLSearchParams({
        organization_id: orgId,
        page: String(pagination.page),
        per_page: String(pagination.per_page),
        usestate: 'false',
    }).toString()

    // Zoho Finance uses the same request structure as Zoho CRM, just different endpoint
    const response = await zohoCrmRequest<ResponseType>(tabId, {
        method: 'GET',
        url: `/api/${apiVersion}/integrations/customfunctions?${queryString}`,
    })

    if (!response.ok) {
        return response
    }

    if (!response.value || !Array.isArray(response.value.customfunctions)) {
        return { ok: false, error: 'Invalid response format' }
    }

    const pageContext = response.value.page_context
    const functions = response.value.customfunctions

    return {
        ok: true,
        data: functions,
        meta: {
            has_more: pageContext?.has_more_page || false,
            page: pageContext?.page || pagination.page,
            per_page: pageContext?.per_page || pagination.per_page,
            total: functions.length,
        },
    }
}

async function mock(orgId: string): Promise<PaginatedResult<ZohoFinanceFunctionResponse[]>> {
    const fileName = `${formatZohoFinanceProviderId(orgId)}-functions.json`

    const data = await fetchMockData<ZohoFinanceFunctionResponse[]>(fileName)
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
    pagination: PaginationParams,
    apiVersion = 'v3'
): Promise<PaginatedResult<ZohoFinanceFunctionResponse[]>> {
    return import.meta.env.VITE_MOCK_API === 'true' ? mock(orgId) : regular(tabId, orgId, pagination, apiVersion)
}
