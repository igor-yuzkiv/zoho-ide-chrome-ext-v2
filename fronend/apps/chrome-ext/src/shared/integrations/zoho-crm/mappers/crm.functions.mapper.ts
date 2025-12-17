import type { FunctionType, IFunctionEntity } from '@zoho-ide/shared'
import { FunctionTypeMetadataMap } from '@/config/function.config.ts'
import { snakeCase } from 'lodash'
import { ZohoCrmFunction } from '@/shared/integrations/zoho-crm/types/crm.functions.types.ts'

function mapFunctionCategoryToType(category?: string): FunctionType {
    if (!category) {
        return 'unknown'
    }

    return (
        Object.values(FunctionTypeMetadataMap)
            .map((i) => i.type)
            .find((i) => i === category) || 'unknown'
    )
}

function normalizeCrmFunctionName(fx: ZohoCrmFunction): string {
    const possibleFields = [fx.api_name, fx.name, fx.display_name]

    for (const field of possibleFields) {
        if (typeof field === 'string' && field.trim() !== '' && field.trim().toLowerCase() !== 'null') {
            return snakeCase(field.trim())
        }
    }

    return 'unknown_function'
}

export function mapCrmFunctionToEntity(fx: ZohoCrmFunction): IFunctionEntity<ZohoCrmFunction> {
    return {
        id: fx.id,
        displayName: normalizeCrmFunctionName(fx),
        apiName: fx?.api_name || fx?.name,
        type: mapFunctionCategoryToType(fx?.category),
        originEntity: fx,
        script: fx?.script,
        params: fx?.params || null,
    }
}

export function mapManyCrmFunctionsToEntity(functions: ZohoCrmFunction[]): IFunctionEntity<ZohoCrmFunction>[] {
    return functions.map(mapCrmFunctionToEntity)
}
