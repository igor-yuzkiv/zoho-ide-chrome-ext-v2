import { fetchMockData } from '@/shared/api/mock/mock.api.ts'
import { zohoCrmRequest } from '@/shared/api/zoho/zoho.api.ts'
import type { PaginatedResult, PaginationParams } from '@/shared/types/pagination.types.ts'
import { formatZohoCrmProviderId } from '@/shared/integrations/zoho-crm/crm.provider.ts'
import type { ZohoCrmFunction } from '@/shared/integrations/zoho-crm/types/crm.functions.types.ts'

async function regular(
    tabId: number,
    orgId: string,
    pagination: PaginationParams
): Promise<PaginatedResult<ZohoCrmFunction[]>> {
    const start = pagination.page <= 1 ? 0 : (pagination.page - 1) * pagination.perPage
    const limit = pagination.perPage

    const response = await zohoCrmRequest<{ functions: ZohoCrmFunction[] }>(tabId, {
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
        value: functions,
        meta: {
            count: functions.length,
            page: pagination.page,
            perPage: pagination.perPage,
            hasMore: functions.length >= pagination.perPage,
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
): Promise<PaginatedResult<ZohoCrmFunction[]>> {
    return import.meta.env.VITE_MOCK_API === 'true' ? mock(orgId) : regular(tabId, orgId, pagination)
}
