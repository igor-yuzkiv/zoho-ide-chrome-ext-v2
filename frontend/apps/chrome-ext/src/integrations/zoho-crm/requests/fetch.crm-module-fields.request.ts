import type { Result } from '@zoho-ide/shared'
import { fetchMockData } from '@/shared/mock-api/mock.api.ts'
import { zohoCrmInjectionRequest } from '@/core/browser'
import { formatZohoCrmProviderId } from '@/integrations/zoho-crm/crm.provider.ts'
import type { CrmModuleField } from '@/integrations/zoho-crm/types/crm.metadata.types.ts'

async function mock(orgId: string, moduleName: string): Promise<Result<CrmModuleField[]>> {
    const fileName = `${formatZohoCrmProviderId(orgId)}-fields-${moduleName}.json`

    const data = await fetchMockData<CrmModuleField[]>(fileName)
    if (!data) {
        return { ok: false, error: 'Mock data not found' }
    }

    return { ok: true, value: data }
}

async function regular(tabId: number, orgId: string, moduleName: string): Promise<Result<CrmModuleField[]>> {
    const query = new URLSearchParams({
        module: moduleName,
        type: 'all',
        skip_field_permission: 'true',
        api_name_page: 'true',
    }).toString()

    const response = await zohoCrmInjectionRequest<{ fields: CrmModuleField[] }>(tabId, {
        url: `/crm/v2.2/settings/fields?${query}`,
        method: 'GET',
        headers: { 'x-crm-org': orgId },
    })

    if (!response.ok) {
        return response
    }

    if (!response.value || !response.value?.fields) {
        return { ok: false, error: 'Invalid response format' }
    }

    return {
        ok: true,
        value: response.value.fields,
    }
}

export default async function (tabId: number, orgId: string, moduleName: string): Promise<Result<CrmModuleField[]>> {
    return import.meta.env.VITE_MOCK_API === 'true' ? mock(orgId, moduleName) : regular(tabId, orgId, moduleName)
}
