import type { Result } from '@zoho-ide/shared'
import { zohoCrmInjectionRequest } from '@/core/browser'
import type { ZohoCrmWorkflow } from '@/integrations/zoho-crm/types/crm.workflow.types.ts'

type Response = {
    workflow_rules: ZohoCrmWorkflow[]
    status: {
        active: boolean
    }
}

async function regular(tabId: number, orgId: string, workflowId: string): Promise<Result<ZohoCrmWorkflow>> {
    const response = await zohoCrmInjectionRequest<Response>(tabId, {
        url: `/crm/v8/settings/automation/workflow_rules/${workflowId}`,
        method: 'GET',
        headers: { 'x-crm-org': orgId },
    })

    if (!response.ok) {
        return response
    }

    const workflowRule = response.value?.workflow_rules?.[0]
    if (!workflowRule) {
        return { ok: false, error: 'Invalid response' }
    }

    return { ok: true, value: workflowRule }
}

async function mock(): Promise<Result<ZohoCrmWorkflow>> {
    console.warn('fetch crm function details mock api not implemented')
    return Promise.resolve({ ok: false, error: 'fetch crm function details mock api not implemented' })
}

export default async function (tabId: number, orgId: string, workflowId: string): Promise<Result<ZohoCrmWorkflow>> {
    return import.meta.env.VITE_MOCK_API === 'true' ? mock() : regular(tabId, orgId, workflowId)
}
