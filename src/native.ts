import { retryPromise } from './retry';

/**
 * @param  {T[]} elements
 * @param  {(element:T,...parameters:any)=>Promise<K>} asyncOperation
 * @param  {number=0} retryLimit
 * @param  {any[]=[]} parameters
 * @returns Promise
 */
export async function parallelAllRequired<T, K>(
    elements: T[],
    asyncOperation: (element: T, ...parameters: any) => Promise<K>,
    retryLimit: number = 0,
    parameters: any[] = []
): Promise<K[]> {
    const listOfPromises: Array<Promise<K>> = elements.map(
        async (x) => await retryPromise(asyncOperation, [x, ...parameters], retryLimit)
    );
    return await Promise.all(listOfPromises);
}

/**
 * @param  {T[]} elements
 * @param  {(element:T,...parameters:any)=>Promise<K>} asyncOperation
 * @param  {number=0} retryLimit
 * @param  {any[]=[]} parameters
 * @returns Promise
 */
export async function parallelAll<T, K>(
    elements: T[],
    asyncOperation: (element: T, ...parameters: any) => Promise<K>,
    retryLimit: number = 0,
    parameters: any[] = []
): Promise<K[]> {
    const listOfPromises: Array<Promise<K>> = elements.map(
        async (x) => await retryPromise(asyncOperation, [x, ...parameters], retryLimit)
    );
    const results: K[] = [];
    for (const promise of listOfPromises) {
        await promise.then((result) => results.push(result)).catch((r) => r);
    }
    return results;
}

/**
 * @param  {T[]} elements
 * @param  {(element:T,...parameters:any)=>Promise<K>} asyncOperation
 * @param  {number=10} batchesLimit
 * @param  {number=0} retryLimit
 * @param  {any[]=[]} parameters
 * @returns Promise
 */
export async function parallelBatches<T, K>(
    elements: T[],
    asyncOperation: (element: T, ...parameters: any) => Promise<K>,
    batchesLimit: number = 10,
    retryLimit: number = 0,
    parameters: any[] = []
): Promise<K[]> {
    let results: K[] = [];
    const batchesCount = Math.ceil(elements.length / batchesLimit);
    for (let i = 0; i < batchesCount; i++) {
        const batchStart = i * batchesLimit;
        const batchArguments = elements.slice(batchStart, batchStart + batchesLimit);
        const batchResults = await parallelAll(batchArguments, asyncOperation, retryLimit, parameters);
        results = results.concat(batchResults);
    }
    return results;
}

/**
 * @param  {T[]} elements
 * @param  {(element:T,...parameters:any)=>Promise<K>} asyncOperation
 * @param  {number=10} concurrencyLimit
 * @param  {number=0} retryLimit
 * @param  {any[]=[]} parameters
 * @returns Promise
 */
export async function parallel<T, K>(
    elements: T[],
    asyncOperation: (element: T, ...parameters: any) => Promise<K>,
    concurrencyLimit: number = 10,
    retryLimit: number = 0,
    parameters: any[] = []
): Promise<K[]> {
    const argsCopy: any[] = elements.map((value, index) => ({
        value,
        index
    }));
    const results: K[] = [];
    const promises = new Array(concurrencyLimit).fill(Promise.resolve());

    const chainNext = async (p: Promise<any>): Promise<any> => {
        if (argsCopy.length > 0) {
            const arg = argsCopy.shift();
            await p;
            const operationPromise: Promise<K> = retryPromise(asyncOperation, [arg.value, ...parameters], retryLimit)
                .then((r) => {
                    results.push(r);
                })
                .catch((e) => e);
            return await chainNext(operationPromise);
        }
        return await p;
    };

    await Promise.all(promises.map(chainNext));
    return results;
}
