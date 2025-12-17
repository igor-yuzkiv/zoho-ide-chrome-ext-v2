import { mapManyToFunctionEntity } from '../mappers/finance.functions.mapper.ts'
import fetchFinanceFunctionDetailsRequest from '../requests/fetch.finance-function-details.request.ts'
import fetchFinanceFunctionsRequest from '../requests/fetch.finance-functions.request.ts'
import type {
    ZohoFinanceFunctionDetailsResponse,
    ZohoFinanceFunctionResponse,
} from '../types/finance.functions.types.ts'
import type { IFunctionEntity } from '@/capabilities/function/function.types.ts'
import type { PaginatedResult, PaginationParams, Result } from '@zoho-ide/shared'
import { assertFinanceMetadata } from '@/shared/integrations/zoho-finance/zoho-finance.utils.ts'
import type { CapabilityPort, ICapabilityEntity } from '@/entities/capability/capability.types.ts'
import type { ServiceProvider } from '@/entities/provider/provider.types.ts'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function loadFunctionsDetails(
    tabId: number,
    orgId: string,
    list: ZohoFinanceFunctionResponse[],
    apiVersion = 'v3'
): Promise<ZohoFinanceFunctionDetailsResponse[] | ZohoFinanceFunctionResponse[]> {
    const details = []

    for (const fx of list) {
        const res = await fetchFinanceFunctionDetailsRequest(tabId, orgId, fx, apiVersion)
        if (res.ok && res.value) {
            details.push(res.value)
        } else {
            details.push(fx)
        }

        // To avoid hitting rate limits, we can add a small delay between requests
        await sleep(500) // 500ms delay
    }

    return details
}

export function financeFunctionsCapabilityPortFactory(provider: ServiceProvider): Result<CapabilityPort> {
    const metadata = assertFinanceMetadata(provider)
    if (!metadata) {
        return { ok: false, error: 'Invalid provider metadata' }
    }

    return {
        ok: true,
        value: {
            async list(pagination: PaginationParams): Promise<PaginatedResult<ICapabilityEntity[]>> {
                if (!provider.tabId) {
                    return { ok: false, error: 'Provider offline' }
                }

                const apiVersion = metadata.financeService === 'inventory' ? 'v1' : 'v3'

                const response = await fetchFinanceFunctionsRequest(
                    provider.tabId,
                    metadata.orgId,
                    pagination,
                    apiVersion
                )
                if (!response.ok) {
                    return response
                }

                const functionsList = response.data
                if (!functionsList || functionsList.length === 0) {
                    return {
                        ok: false,
                        error: 'No functions found',
                    }
                }

                const details = await loadFunctionsDetails(provider.tabId, metadata.orgId, functionsList, apiVersion)

                return {
                    ok: true,
                    data: mapManyToFunctionEntity(details),
                    meta: response.meta,
                }
            },

            async execute(
                functionEntity: IFunctionEntity,
                inputData: Record<string, unknown>
            ): Promise<Result<unknown>> {
                console.warn('Zoho Finance function execution not implemented yet', {
                    functionEntity,
                    inputData,
                })

                return {
                    ok: false,
                    error: 'Zoho Finance function execution not implemented yet',
                }
            },
        },
    }
}
