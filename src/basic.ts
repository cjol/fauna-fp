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
 */
export const at = <T>(time: Arg<Timestamp>, x: Arg<T>) =>
  q.At(time, x) as Query<QueryResult<T>>;

/**
 * Executes a user-defined function.
 */
export const call = <I extends any[], O>(
  fn: Arg<Ref<FaunaFunction<I, O>>>,
  terms: ArgTuple<I>
) => q.Call(fn, ...terms) as Query<QueryResult<O>>;

/**
 * Executes expressions in order. Renamed from `q.Do`
 */
export const doMany = <I extends any[]>(...entries: ArgTuple<I>) =>
  q.Do(...entries) as Query<Tuple.Last<QueryResult<I>>>;

/**
 * Defines a variable’s value.
 */
export const letVar = <I, O>(
  // TODO: consider allowing this to be a tuple (or a record?)
  val: Arg<I>,
  f: Callback<[I], O>
) => {
  const params = annotate(f);
  if (params.length !== 1)
    throw new Error('Only one var can currently be set in letVar');
  const getVar = q.Var(params[0]) as Query<I>;
  return q.Let({ [params[0]]: val }, f(getVar)) as Query<QueryResult<O>>;
};

// TODO: move below into separate files
export const abort = (x: Arg<string>) => q.Abort(x) as Query<never>;

// TODO: I would love to use x as a type guard somehow but I am not sure we'll be able to without an actual function
export const iff = <T, F>(x: Arg<boolean>, ifTrue: Arg<T>, ifFalse: Arg<F>) =>
  q.If(x, ifTrue, ifFalse) as Query<QueryResult<T> | QueryResult<F>>;
