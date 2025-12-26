import { zohoCrmInjectionRequest } from '@/core/browser'
import { formatZohoCrmProviderId } from '@/integrations/zoho-crm/crm.provider.ts'
import type { CrmModuleMetadata } from '@/integrations/zoho-crm/types/crm.metadata.types.ts'
import type { Result } from '@zoho-ide/shared'
import { fetchMockData } from '@/shared/mock-api/mock.api.ts'

async function mock(orgId: string): Promise<Result<CrmModuleMetadata[]>> {
    const fileName = `${formatZohoCrmProviderId(orgId)}-modules.json`

    const data = await fetchMockData<CrmModuleMetadata[]>(fileName)
    if (!data) {
        return { ok: false, error: 'Mock data not found' }
    }

    return { ok: true, value: data }
}

async function regular(tabId: number, orgId: string): Promise<Result<CrmModuleMetadata[]>> {
    const query = new URLSearchParams({
        include: 'team_spaces',
        status: 'user_hidden,system_hidden,scheduled_for_deletion,visible',
    }).toString()

    const response = await zohoCrmInjectionRequest<{ modules: CrmModuleMetadata[] }>(tabId, {
        url: `/crm/v6/settings/modules?${query}`,
        method: 'GET',
        headers: { 'x-crm-org': orgId },
    })

    if (!response.ok) {
        return response
    }

    if (!response.value || !response.value?.modules) {
        return { ok: false, error: 'Invalid response format' }
    }

    return {
        ok: true,
        value: response.value.modules,
    }
}

export default async function (tabId: number, orgId: string): Promise<Result<CrmModuleMetadata[]>> {
    return import.meta.env.VITE_MOCK_API === 'true' ? mock(orgId) : regular(tabId, orgId)
}
