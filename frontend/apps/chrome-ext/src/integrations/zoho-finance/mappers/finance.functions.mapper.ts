import type {
    ZohoFinanceFunction,
    ZohoFinanceFunctionDetailsResponse,
    ZohoFinanceFunctionResponse,
} from '@/integrations/zoho-finance/types/finance.functions.types.ts'
import { IFunctionRecordEntity, makeProviderCapabilityId } from '@zoho-ide/shared'
import { ProviderCapabilityType } from '@zoho-ide/shared'

export function mapToFunctionEntity(
    providerId: string,
    fx: ZohoFinanceFunctionResponse | ZohoFinanceFunctionDetailsResponse
): IFunctionRecordEntity<ZohoFinanceFunction> {
    return {
        id: makeProviderCapabilityId(providerId, ProviderCapabilityType.FUNCTIONS, fx.customfunction_id),
        source_id: fx.customfunction_id,
        provider_id: providerId,
        capability_type: ProviderCapabilityType.FUNCTIONS,
        display_name: fx?.placeholder || fx.function_name,
        api_name: fx.function_name,
        type: 'automation',
        origin_entity: {
            ...fx,
            id: fx.customfunction_id,
        },
        script: 'script' in fx ? fx.script : undefined,
    }
}

export function mapManyToFunctionEntity(
    providerId: string,
    functions: ZohoFinanceFunctionDetailsResponse[] | ZohoFinanceFunctionResponse[]
): IFunctionRecordEntity<ZohoFinanceFunction>[] {
    return functions.map((i) => mapToFunctionEntity(providerId, i))
}
