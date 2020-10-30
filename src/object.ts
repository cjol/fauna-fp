import { O } from 'ts-toolbelt';
import { Arg, Query, q, Result, Callback } from './types';

// TODO: curry better so we don't have to call two functions outside a pipeline
// API could be select([a,b,c], item) or select(a,b,c)(item) or select([a,b,c])(item)
export const select = <P extends (string | number)[]>(...path: P) => <
  T extends object
>(
  item: Arg<T>
): Query<O.Path<T, P> extends Query<infer U> ? U : O.Path<T, P>> =>
  q.Select(path, item);

// TODO: decide how best to curry this
// TODO: it's possible to do some very dynamic things here typewise; consider how to carefully allow
// Indeed the types here are not great, especially with the resolver
export const merge = <A extends object, B extends object>(
  a: Arg<A>,
  b: Arg<B | B[]>,
  resolver?: Callback<[keyof (A | B), A[keyof A], B[keyof B]], A[keyof A]>
) => q.Merge(a, b, resolver) as Query<Result<A> & Result<B>>;

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];
export const toArray = <A extends object>(obj: Arg<A>) =>
  q.ToArray(obj) as Query<Entries<Result<A>>>;
