import { EMPTY, Observable, catchError, defer, firstValueFrom, from, mergeMap, retry, toArray } from 'rxjs'

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
    const source$: Observable<K[]> = from(elements).pipe(
        mergeMap((element) =>
            from(asyncOperation(element, ...parameters)).pipe(
                retry(retryLimit),
                catchError(() => EMPTY)
            )
        ),
        toArray()
    )
    return await firstValueFrom(source$)
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
    const source$: Observable<K[]> = from(elements).pipe(
        mergeMap(
            (element) =>
                defer(async () => await asyncOperation(element, ...parameters)).pipe(
                    retry(retryLimit),
                    catchError(() => EMPTY)
                ),
            concurrencyLimit
        ),
        toArray()
    )
    return await firstValueFrom(source$)
}
