import type { Result } from '@zoho-ide/shared'
import { zohoCrmRequest } from '@/shared/api/zoho/zoho.api.ts'
import {
    ZohoFinanceFunctionDetailsResponse,
    ZohoFinanceFunctionResponse,
} from '@/shared/integrations/zoho-finance/types/finance.functions.types.ts'

type ResponseType = {
    customfunction: ZohoFinanceFunctionDetailsResponse
    entity_params: Record<string, unknown>[]
}

async function regular(
    tabId: number,
    orgId: string,
    functionData: ZohoFinanceFunctionResponse,
    apiVersion = 'v3'
): Promise<Result<ZohoFinanceFunctionDetailsResponse>> {
    const queryString = new URLSearchParams({
        organization_id: orgId,
        customfunction_id: functionData.customfunction_id,
        entity: String(functionData.entity || ''),
    }).toString()

    const response = await zohoCrmRequest<ResponseType>(tabId, {
        method: 'GET',
        url: `/api/${apiVersion}/integrations/customfunctions/editpage?${queryString}`,
    })

    if (!response.ok) {
        return response
    }

    if (!response.value || !response.value.customfunction) {
        return { ok: false, error: 'Invalid response format' }
    }

    return {
        ok: true,
        value: response.value.customfunction,
    }
}

function mock(): Promise<Result<ZohoFinanceFunctionDetailsResponse>> {
    console.warn('fetch finance function details mock api not implemented')
    return Promise.resolve({ ok: false, error: 'fetch finance function details mock api not implemented' })
}

export default async function (
    tabId: number,
    orgId: string,
    functionData: ZohoFinanceFunctionResponse,
    apiVersion = 'v3'
): Promise<Result<ZohoFinanceFunctionDetailsResponse>> {
    return import.meta.env.VITE_MOCK_API === 'true' ? mock() : regular(tabId, orgId, functionData, apiVersion)
}
