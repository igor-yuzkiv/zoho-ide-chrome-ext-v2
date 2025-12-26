import type { Result } from '@zoho-ide/shared'
import { zohoCrmInjectionRequest } from '@/core/browser'

type UpdateFunctionPayload = {
    id: string
    name: string
    workflow: string
    display_name: string
    description: string
    params: unknown[]
    return_type: string
    commit_message: string
}

type UpdateFunctionResponse = {
    details: {
        name: string
        display_name: string
        description: string | null
        script: string
    }
    message: string
    status: string
}

function mock(): Promise<Result<UpdateFunctionResponse>> {
    console.warn('update crm function details mock api not implemented')
    return Promise.resolve({ ok: false, error: 'fetch crm function details mock api not implemented' })
}

async function regular(
    tabId: number,
    orgId: string,
    payload: UpdateFunctionPayload
): Promise<Result<UpdateFunctionResponse>> {
    const query = new URLSearchParams({
        language: 'deluge',
    }).toString()

    const response = await zohoCrmInjectionRequest<{ functions: UpdateFunctionResponse[] }>(tabId, {
        url: `/crm/v2/settings/functions/${payload.id}?${query}`,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-crm-org': orgId,
        },
        data: { functions: [payload] },
    })

    if (!response.ok) {
        return response
    }

    const result = response.value?.functions?.[0]
    if (!result || !result?.details?.script) {
        return { ok: false, error: 'Invalid response' }
    }

    return { ok: true, value: result }
}

export default async function (
    tabId: number,
    orgId: string,
    payload: UpdateFunctionPayload
): Promise<Result<UpdateFunctionResponse>> {
    return import.meta.env.VITE_MOCK_API === 'true' ? mock() : regular(tabId, orgId, payload)
}
