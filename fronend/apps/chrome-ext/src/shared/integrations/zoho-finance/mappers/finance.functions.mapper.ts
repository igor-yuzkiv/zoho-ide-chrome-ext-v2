import type { IFunctionRecordEntity } from '@zoho-ide/shared'
import type {
    ZohoFinanceFunction,
    ZohoFinanceFunctionDetailsResponse,
    ZohoFinanceFunctionResponse,
} from '@/shared/integrations/zoho-finance/types/finance.functions.types.ts'

export function mapToFunctionEntity(
    fx: ZohoFinanceFunctionResponse | ZohoFinanceFunctionDetailsResponse
): IFunctionRecordEntity<ZohoFinanceFunction> {
    return {
        id: fx.customfunction_id,
        sourceId: fx.customfunction_id,
        displayName: fx?.placeholder || fx.function_name,
        apiName: fx.function_name,
        type: 'automation',
        originEntity: {
            ...fx,
            id: fx.customfunction_id,
        },
        script: 'script' in fx ? fx.script : undefined,
    }
}

export function mapManyToFunctionEntity(
    functions: ZohoFinanceFunctionDetailsResponse[] | ZohoFinanceFunctionResponse[]
): IFunctionRecordEntity<ZohoFinanceFunction>[] {
    return functions.map(mapToFunctionEntity)
}
