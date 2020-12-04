import { Tuple } from 'ts-toolbelt';
import annotate from 'fn-annotate';
import {
  Arg,
  ArgTuple,
  Callback,
  FaunaFunction,
  Query,
  QueryResult,
  Ref,
  Timestamp,
} from './types';
import { q } from './types.internal';

/**
 * Retrieves documents at or before a timestamp.
 * 
 * The `At` function executes a temporal query, a query which examines the data
 * in the past. The `timestamp` parameter determines the data available for
 * viewing by creating a virtual snapshot of the data which was current at that
 * date and time. All reads from the associated `expression` is then executed on
 * that virtual snapshot. In contrast, all write operations must be executed at
 * the current time. Attempting a write operation at any other time produces an
 * error.
 * 
 * @param timestamp The date and time of the virtual snapshot of the data
 * @param expression The FQL statement to be executed
 */
export function at(timestamp: Arg<Timestamp>): <T>(expression: Arg<T>) => Query<QueryResult<T>>;
export function at<T>(timestamp: Arg<Timestamp>, expression: Arg<T>): Query<QueryResult<T>>;
export function at<T>(timestamp: Arg<Timestamp>, expression?: Arg<T>) {
  if (expression === undefined) return (expression: Arg<T>) => at(timestamp, expression);
  return q.At(timestamp, expression);
}

/**
 * Executes a user-defined function.
 */
export function call<I extends any[], O>(fn: Arg<Ref<FaunaFunction<I, O>>>): (...terms: ArgTuple<I>) => Query<QueryResult<O>>;
export function call<I extends any[], O>(fn: Arg<Ref<FaunaFunction<I, O>>>, terms: ArgTuple<I>): Query<QueryResult<O>>;
export function call<I extends any[], O>(fn: Arg<Ref<FaunaFunction<I, O>>>, terms?: ArgTuple<I>) {
  if (terms !== undefined) return q.Call(fn, ...terms);
  return (...terms: ArgTuple<I>) => call(fn, terms);
}

/**
 * Executes expressions in order. Renamed from `q.Do`
 */
export function doMany<I extends any[]>(...entries: ArgTuple<I>): Query<Tuple.Last<QueryResult<I>>> {
  return q.Do(...entries);
}

/**
 * Defines a variable’s value.
 */
export function letVar<I, O>(
  // TODO: consider allowing this to be a tuple (or a record?)
  val: Arg<I>,
  f: Callback<[I], O>): Query<QueryResult<O>> {
  const params = annotate(f);
  if (params.length !== 1)
    throw new Error('Only one var can currently be set in letVar');
  const getVar = q.Var(params[0]) as Query<I>;
  return q.Let({ [params[0]]: val }, f(getVar));
}

// TODO: move below into separate files
export function abort(x: Arg<string>): Query<never> {
  return q.Abort(x);
}

// TODO: I would love to use x as a type guard somehow but I am not sure we'll be able to without an actual function
export function iff<T, F>(x: Arg<boolean>, ifTrue: Arg<T>, ifFalse: Arg<F>): Query<QueryResult<T> | QueryResult<F>> {
  return q.If(x, ifTrue, ifFalse);
}


