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
* [`rxParallelAll`](#rxParallelAll)

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

The rxParallel function is used to call an asynchronous operation for each element of the array with the possibility of indicating the number of concurrent executions and retries for each element. This function uses reactive extensions

```
USAGE

import { rxParallel } from 'polallel'


async function asyncOperation(element: any, arg1: string, args2: number): Promise<any> {
    ...
}

async function example(): Promise<void> {
  try {
    const listOfArguments = [...Array(20).keys()];
    const examples: any[] = await rxParallel(listOfArguments, asyncOperation, 5, 2, ["arg1", 4]);
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

## `rxParallelAll`

The rxParallelAll function is used to call an asynchronous operation for each element of the array and retrieves for each element. This function uses reactive extensions

```
USAGE

import { rxParallelAll } from 'polallel'


async function asyncOperation(element: any, arg1: string, args2: number): Promise<any> {
    ...
}

async function example(): Promise<void> {
  try {
    const listOfArguments = [...Array(20).keys()];
    const examples: any[] = await rxParallelAll(listOfArguments, asyncOperation, 2, ["arg1", 4]);
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

// rxParallel is an alias for parallel with reactive extensions
import { parallel } from 'polallel/reactive'

// rxParallelAll is an alias for parallel with reactive extensions
import { parallelAll } from 'polallel/reactive'

// import native functions with promises
import { parallel, parallelAll, parallelBatches } from 'polallel/native'

```

# Retries

There are other helper functions to retry asynchronous functions or synchronous functions

- retryPromise
- retryFunction

```
USAGE

import { retryPromise } from 'polallel/retry'

```

# Other

There are other helper functions

- parallelAllRequired: all executions in parallel must be successful otherwise it will fail

```
USAGE

import { parallelAllRequired } from 'polallel'

```
