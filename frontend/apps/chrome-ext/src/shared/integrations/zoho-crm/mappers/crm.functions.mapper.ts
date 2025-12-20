import { FunctionTypeMetadataMap } from '@/config/function.config.ts'
import type { FunctionType, IFunctionRecordEntity } from '@zoho-ide/shared'
import { ProviderCapabilityType } from '@zoho-ide/shared'
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

export function mapCrmFunctionToEntity(providerId: string, fx: ZohoCrmFunction): IFunctionRecordEntity<ZohoCrmFunction> {
    return {
        id: fx.id,
        sourceId: fx.id,
        providerId,
        capabilityType: ProviderCapabilityType.FUNCTIONS,
        displayName: normalizeCrmFunctionName(fx),
        apiName: fx?.api_name || fx?.name,
        type: mapFunctionCategoryToType(fx?.category),
        originEntity: fx,
        script: fx?.script,
        params: fx?.params || null,
    }
}

export function mapManyCrmFunctionsToEntity(providerId: string, functions: ZohoCrmFunction[]): IFunctionRecordEntity<ZohoCrmFunction>[] {
    return functions.map(i => mapCrmFunctionToEntity(providerId, i))
}
