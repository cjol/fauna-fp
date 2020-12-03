import { I, Tuple } from 'ts-toolbelt';
import annotate from 'fn-annotate';
import {
  Arg,
  ArgTuple,
  Callback,
  FaunaFunction,
  q,
  Query,
  Ref,
  Timestamp,
} from './types';
import { pipe, tuple } from 'fp-ts/lib/function';
import { concat, repeat } from './string';

/**
 * Retrieves documents at or before a timestamp.
 */
export const at = <T>(time: Arg<Timestamp>, x: Arg<T>) =>
  q.At(time, x) as Query<T>;

/**
 * Executes a user-defined function.
 */
export const call = <I extends any[], O>(
  fn: Arg<Ref<FaunaFunction<I, O>>>,
  terms: ArgTuple<I>
) => q.Call(fn, ...terms) as Query<O>;

/**
 * Executes expressions in order. Renamed from `q.Do`
 */
export const doMany = <I extends any[]>(...entries: ArgTuple<I>) =>
  q.Do(...entries) as Query<Tuple.Last<I>>;

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
  return q.Let({ [params[0]]: val }, f(getVar)) as Query<O>;
};

// TODO: move below into separate files
export const abort = (x: Arg<string>) => q.Abort(x) as Query<never>;

export const iff = <T, F>(x: Arg<boolean>, ifTrue: Arg<T>, ifFalse: Arg<F>) =>
  q.If(x, ifTrue, ifFalse) as Query<T | F>;
