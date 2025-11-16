export function useLogger(context: string = '') {
    function log(message: string, ...optionalParams: unknown[]) {
        console.log(`[LOG] [${context}] ${message}`, ...optionalParams)
    }

    function warn(message: string, ...optionalParams: unknown[]) {
        console.warn(`[WARN] [${context}] ${message}`, ...optionalParams)
    }

    function error(message: string, ...optionalParams: unknown[]) {
        console.error(`[ERROR] [${context}] ${message}`, ...optionalParams)
    }

    return {
        log,
        warn,
        error,
    }
}
