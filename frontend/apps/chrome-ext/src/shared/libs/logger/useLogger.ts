export function useLogger(context = '') {
    function log(message: string, ...optionalParams: unknown[]) {
        console.log(`[LOG] [${context}] ${message}`, ...optionalParams)
    }

    function warn(message: string, ...optionalParams: unknown[]) {
        console.warn(`[WARN] [${context}] ${message}`, ...optionalParams)
    }

    function error(message: string, ...optionalParams: unknown[]) {
        console.error(`[ERROR] [${context}] ${message}`, ...optionalParams)
    }

    function info(message: string, ...optionalParams: unknown[]) {
        console.info(`[INFO] [${context}] ${message}`, ...optionalParams)
    }

    return {
        log,
        warn,
        error,
        info,
    }
}
