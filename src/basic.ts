import { I, Tuple } from 'ts-toolbelt';
import {
  Arg,
  ArgTuple,
  Callback,
  FaunaFunction,
  q,
  Query,
  Result,
  Timestamp,
} from './types';

/**
 * Retrieves documents at or before a timestamp.
 */
export const at = (time: Arg<Timestamp>) => <T>(x: Arg<T>) =>
  q.At(time, x) as Query<Result<T>>;

/**
 * Executes a user-defined function.
 */
export const call = <I extends any[], O>(fn: Arg<FaunaFunction<I, O>>) => (
  // TODO: consider if we want to optimise for passing as tuple or direct
  terms: ArgTuple<I>
) => q.Call(fn, ...terms) as Query<Result<O>>;

/**
 * Executes expressions in order. Renamed from `q.Do`
 */
export const doMany = <I extends any[]>(...entries: ArgTuple<I>) =>
  q.Do(...entries) as Query<Result<Tuple.Last<I>>>;

/**
 * Defines a variable’s value.
 */
export const letVar = <I, T extends Record<string, Arg<any>>>(expr: I) => (
  vars: Arg<T>
) => q.Let(vars, expr) as Query<Result<I>>;

/**
 * Uses a variable’s value.
 */
export const getVar = <I>(x: Arg<string>) => q.Var(x) as Query<I>;

// TODO: move below into separate files
export const abort: (x: Arg<string>) => Query<never> = (x) => q.Abort(x);

export const iff = <T, F>(ifTrue: Arg<T>, ifFalse: Arg<F>) => (
  x: Arg<boolean>
) => q.If(x, ifTrue, ifFalse) as Query<Result<T | F>>;

export const equals = <O>(a: Arg<O>) => (b: Arg<O>) =>
  q.Equals(a, b) as Query<boolean>;
