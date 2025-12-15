import { Result } from '@zoho-ide/shared'
import { zohoCrmRequest } from '@/shared/api/zoho/zoho.api.ts'

export default async function (
    tabId: number,
    orgId: string,
    apiName: string,
    script: string,
    argumentsMap: Record<string, unknown>
): Promise<Result<unknown>> {
    return await zohoCrmRequest(tabId, {
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
