import { zohoCrmInjectionRequest } from '@/core/browser'
import { Result } from '@zoho-ide/shared'

export default async function (
    tabId: number,
    orgId: string,
    apiName: string,
    script: string,
    argumentsMap: Record<string, unknown>
): Promise<Result<unknown>> {
    return await zohoCrmInjectionRequest(tabId, {
        url: `/crm/v9/settings/functions/${apiName}/actions/test`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-crm-org': orgId,
        },
        data: {
            functions: [
                {
                    arguments: argumentsMap,
                    script,
                },
            ],
        },
    })
}
