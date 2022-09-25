/**
 * @param  {Function} fn
 * @param  {any[]} args
 * @param  {number=0} retries
 * @returns Promise
 */
export async function retryPromise(fn: Function, args: any[], retries: number = 0): Promise<any> {
    return fn(...args).catch(async (err: any) => {
        if (retries <= 0) {
            return await Promise.reject(err.message);
        }
        return await retryPromise(fn, args, retries - 1);
    });
}

/**
 * @param  {Function} func
 * @param  {any[]} args
 * @param  {false} retryOptions={ continueOnError: false, retryCount: 0 }
 * @returns any
 */
export function retryFunction(
    func: Function,
    args: any[],
    retryOptions = { continueOnError: false, retryCount: 0 }
): any {
    while (retryOptions.retryCount >= 0) {
        try {
            return func(...args);
        } catch (e) {
            if (retryOptions.retryCount <= 0) {
                if (retryOptions.continueOnError) {
                    break;
                } else {
                    throw e;
                }
            } else {
                retryOptions.retryCount--;
            }
        }
    }
}
