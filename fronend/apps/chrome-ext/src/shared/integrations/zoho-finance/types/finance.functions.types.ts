export type ZohoFinanceFunctionResponse = {
    function_name: string
    created_time: string
    customfunction_id: string
    description?: string
    entity?: string
    is_active: boolean
    is_deployed: boolean
    is_deployment_need: boolean
    is_from_plugin: boolean
    language?: string
    placeholder?: string
    related_rules?: Record<string, unknown>[]
}

export type ZohoFinanceFunctionDetailsResponse = ZohoFinanceFunctionResponse & {
    script: string
    language_formatted: string
    drefunction_id: string
    function_param: Record<string, unknown>[]
}

export type ZohoFinanceFunction = ZohoFinanceFunctionResponse & {
    id: string
}
