import type { Result } from '@zoho-ide/shared'
import { zohoCrmInjectionRequest } from '@/core/browser'
import type { ZohoCrmFunction } from '@/integrations/zoho-crm/types/crm.functions.types.ts'

function mock(): Promise<Result<ZohoCrmFunction>> {
    console.warn('fetch crm function details mock api not implemented')
    return Promise.resolve({ ok: false, error: 'fetch crm function details mock api not implemented' })
}

async function regular(tabId: number, orgId: string, functionId: string): Promise<Result<ZohoCrmFunction>> {
    const query = new URLSearchParams({
        category: 'automation',
        source: 'crm',
        language: 'deluge',
    }).toString()

    const response = await zohoCrmInjectionRequest<{ functions: ZohoCrmFunction[] }>(tabId, {
        url: `/crm/v2/settings/functions/${functionId}?${query}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-crm-org': orgId,
        },
    })

    if (!response.ok) {
        return response
    }

    const fx = response.value?.functions?.[0]
    if (!fx) {
        return { ok: false, error: 'Invalid response' }
    }

    return { ok: true, value: fx }
}

export default async function (tabId: number, orgId: string, functionId: string): Promise<Result<ZohoCrmFunction>> {
    return import.meta.env.VITE_MOCK_API === 'true' ? mock() : regular(tabId, orgId, functionId)
}
