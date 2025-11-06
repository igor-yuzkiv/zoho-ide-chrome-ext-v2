import { FunctionTypeMetadataMap } from '@/config/function.config.ts'
import { snakeCase } from 'lodash'
import type { ZohoCrmFunction } from '@/shared/integrations/zoho-crm/types/crm.functions.types.ts'
import type { FunctionType, IFunctionEntity } from '@/entities/function/model/function.types.ts'

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
    const api_name = fx.api_name
    const display_name = fx.display_name

    let result = typeof api_name === 'string' && api_name !== 'null' ? api_name.trim() : null

    if (!api_name && typeof display_name === 'string') {
        result = snakeCase(display_name.trim())
    }

    return result ?? 'unknown_function'
}

export function mapToFunctionEntity(fx: ZohoCrmFunction): IFunctionEntity<ZohoCrmFunction> {
    return {
        id: fx.id,
        displayName: normalizeCrmFunctionName(fx),
        type: mapFunctionCategoryToType(fx?.category),
        originEntity: fx,
        script: fx?.script,
    }
}

export function mapManyToFunctionEntity(functions: ZohoCrmFunction[]): IFunctionEntity<ZohoCrmFunction>[] {
    return functions.map(mapToFunctionEntity)
}
