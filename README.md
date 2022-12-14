# polallel
JS library to perform operations in parallel

============

This library makes it easy to execute operations in parallel

<!-- toc -->
* [Usage](#usage)
* [Functions](#function)
* [Imports](#imports)
* [Retries](#retries)
* [Other](#other)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install --save polallel
...

import { rxParallel } from 'polallel'


async function asyncOperation(element: any, arg1: string, args2: number): Promise<any> {
    ...
}

async function example(): Promise<void> {
  try {
    const listOfArguments = [...Array(20).keys()];
    const examples: any[] = await rxParallel(listOfArguments, asyncOperation, 5, 2 ["arg1", 4]);
    console.log("examples", examples);
  } catch (error) {
    console.log(error.message);
  }
}

example()

```
# Functions
<!-- Functions -->
* [`parallel`](#parallel)
* [`parallelAll`](#parallelAll)
* [`parallelBatches`](#parallelBatches)
* [`rxParallel`](#rxParallel)
* [`rxAsyncParallel`](#rxAsyncParallel)
* [`rxAsyncParallelAll`](#rxAsyncParallelAll)

## `parallel`

The parallel function is used to call an asynchronous operation for each element of the array with the possibility of indicating the number of concurrent executions and retries for each element.

```
USAGE

import { parallel } from 'polallel'


async function asyncOperation(element: any, arg1: string, args2: number): Promise<any> {
    ...
}

async function example(): Promise<void> {
  try {
    const listOfArguments = [...Array(20).keys()];
    const examples: any[] = await parallel(listOfArguments, asyncOperation, 5, 2, ["arg1", 4]);
    console.log("examples", examples);
  } catch (error) {
    console.log(error.message);
  }
}

OPTIONS

/**
 * @param  {T[]} elements
 * @param  {(element:T,...parameters:any)=>Promise<K>} asyncOperation
 * @param  {number=10} concurrencyLimit
 * @param  {number=0} retryLimit
 * @param  {any[]=[]} parameters
 * @returns Promise
 */

```

## `parallelAll`

The parallelAll function is used to call an asynchronous operation for each element of the array and retries for each element

```
USAGE

import { parallelAll } from 'polallel'


async function asyncOperation(element: any, arg1: string, args2: number): Promise<any> {
    ...
}

async function example(): Promise<void> {
  try {
    const listOfArguments = [...Array(20).keys()];
    const examples: any[] = await parallelAll(listOfArguments, asyncOperation, 2, ["arg1", 4]);
    console.log("examples", examples);
  } catch (error) {
    console.log(error.message);
  }
}

OPTIONS

/**
 * @param  {T[]} elements
 * @param  {(element:T,...parameters:any)=>Promise<K>} asyncOperation
 * @param  {number=0} retryLimit
 * @param  {any[]=[]} parameters
 * @returns Promise
 */
```

## `parallelBatches`

The parallelBatches function is used to call an asynchronous operation for each element of the batch array

```
USAGE

import { parallelBatches } from 'polallel'


async function asyncOperation(element: any, arg1: string, args2: number): Promise<any> {
    ...
}

async function example(): Promise<void> {
  try {
    const listOfArguments = [...Array(20).keys()];
    const examples: any[] = await parallelBatches(listOfArguments, asyncOperation, 5, 2, ["arg1", 4]);
    console.log("examples", examples);
  } catch (error) {
    console.log(error.message);
  }
}

OPTIONS

/**
 * @param  {T[]} elements
 * @param  {(element:T,...parameters:any)=>Promise<K>} asyncOperation
 * @param  {number=10} batchesLimit
 * @param  {number=0} retryLimit
 * @param  {any[]=[]} parameters
 * @returns Promise
 */
```

## `rxParallel`

The rxParallel function is used to call an asynchronous operation for each element of the array with the possibility of indicating the number of concurrent executions and retries for each element. This function uses reactive extensions and return a Observable

```
USAGE

import { rxParallel } from 'polallel'


async function asyncOperation(element: any, arg1: string, args2: number): Promise<any> {
    ...
}

rxParallel(listOfArguments, asyncOperation, 5 , 3, ["arg1", 4]).subscribe(console.log);

OPTIONS

/**
 * @param  {T[]} elements
 * @param  {(element:T,...parameters:any)=>Promise<K>} asyncOperation
 * @param  {number=10} concurrencyLimit
 * @param  {number=0} retryLimit
 * @param  {any[]=[]} parameters
 * @returns Observable
 */
```

## `rxAsyncParallel`

The rxAsyncParallel function is used to call an asynchronous operation for each element of the array with the possibility of indicating the number of concurrent executions and retries for each element. This function uses reactive extensions

```
USAGE

import { rxAsyncParallel } from 'polallel'


async function asyncOperation(element: any, arg1: string, args2: number): Promise<any> {
    ...
}

async function example(): Promise<void> {
  try {
    const listOfArguments = [...Array(20).keys()];
    const examples: any[] = await rxAsyncParallel(listOfArguments, asyncOperation, 5, 2, ["arg1", 4]);
    console.log("examples", examples);
  } catch (error) {
    console.log(error.message);
  }
}

OPTIONS

/**
 * @param  {T[]} elements
 * @param  {(element:T,...parameters:any)=>Promise<K>} asyncOperation
 * @param  {number=10} concurrencyLimit
 * @param  {number=0} retryLimit
 * @param  {any[]=[]} parameters
 * @returns Promise
 */
```

## `rxAsyncParallelAll`

The rxAsyncParallelAll function is used to call an asynchronous operation for each element of the array and retrieves for each element. This function uses reactive extensions

```
USAGE

import { rxAsyncParallelAll } from 'polallel'


async function asyncOperation(element: any, arg1: string, args2: number): Promise<any> {
    ...
}

async function example(): Promise<void> {
  try {
    const listOfArguments = [...Array(20).keys()];
    const examples: any[] = await rxAsyncParallelAll(listOfArguments, asyncOperation, 2, ["arg1", 4]);
    console.log("examples", examples);
  } catch (error) {
    console.log(error.message);
  }
}

OPTIONS

/**
 * @param  {T[]} elements
 * @param  {(element:T,...parameters:any)=>Promise<K>} asyncOperation
 * @param  {number=0} retryLimit
 * @param  {any[]=[]} parameters
 * @returns Promise
 */
```
# Imports

Can be imported directly from the function type to exclude native or reactive


```
USAGE

// rxParallel use reactive extensions
import { rxParallel } from 'polallel/lib/reactive'

// import native functions with promises
import { parallel, parallelAll, parallelBatches } from 'polallel/lib/native'

```

# Retries

There are other helper functions to retry asynchronous functions or synchronous functions

- retryPromise
- retryFunction

```
USAGE

import { retryPromise } from 'polallel'

```

# Other

There are other helper functions

- parallelAllRequired: all executions in parallel must be successful otherwise it will fail
- rxAsyncParallelAll: all execution using reactive extension with asynchronous return
- rxAsyncParallel: execution using reactive extension with asynchronous return

```
USAGE

import { parallelAllRequired } from 'polallel'

```
