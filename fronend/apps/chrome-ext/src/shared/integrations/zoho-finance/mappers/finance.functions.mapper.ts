import type { IFunctionEntity } from '@/capabilities/function/function.types.ts'
import {
    ZohoFinanceFunction,
    ZohoFinanceFunctionDetailsResponse,
    ZohoFinanceFunctionResponse,
} from '@/shared/integrations/zoho-finance/types/finance.functions.types.ts'

export function mapToFunctionEntity(
    fx: ZohoFinanceFunctionResponse | ZohoFinanceFunctionDetailsResponse
): IFunctionEntity<ZohoFinanceFunction> {
    return {
        id: fx.customfunction_id,
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
): IFunctionEntity<ZohoFinanceFunction>[] {
    return functions.map(mapToFunctionEntity)
}
