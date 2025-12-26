import type { PaginatedResult, PaginationParams } from '@zoho-ide/shared'
import { fetchMockData } from '@/shared/mock-api/mock.api.ts'
import { zohoCrmInjectionRequest } from '@/core/browser'
import { formatZohoCrmProviderId } from '@/integrations/zoho-crm/crm.provider.ts'
import type { ZohoCrmFunction } from '@/integrations/zoho-crm/types/crm.functions.types.ts'

async function regular(
    tabId: number,
    orgId: string,
    pagination: PaginationParams
): Promise<PaginatedResult<ZohoCrmFunction[]>> {
    const start = pagination.page <= 1 ? 0 : (pagination.page - 1) * pagination.per_page
    const limit = pagination.per_page

    const response = await zohoCrmInjectionRequest<{ functions: ZohoCrmFunction[] }>(tabId, {
        url: `/crm/v2/settings/functions?type=org&start=${start}&limit=${limit}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-crm-org': orgId,
        },
    })

    if (!response.ok) {
        return response
    }

    if (!response.value || !Array.isArray(response.value.functions)) {
        return { ok: false, error: 'Invalid response format' }
    }

    const functions = response.value.functions

    return {
        ok: true,
        data: functions,
        meta: {
            total: functions.length,
            page: pagination.page,
            per_page: pagination.per_page,
            has_more: functions.length >= pagination.per_page,
        },
    }
}

async function mock(orgId: string): Promise<PaginatedResult<ZohoCrmFunction[]>> {
    const fileName = `${formatZohoCrmProviderId(orgId)}-functions.json`

    const data = await fetchMockData<ZohoCrmFunction[]>(fileName)
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
): Promise<PaginatedResult<ZohoCrmFunction[]>> {
    return import.meta.env.VITE_MOCK_API === 'true' ? mock(orgId) : regular(tabId, orgId, pagination)
}
