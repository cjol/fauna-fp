import { O, U, A, L } from "ts-toolbelt";
import { Arg, Query, q, Callback } from "./types";

export const select = <T extends object, P extends Array<A.Key>>(
  item: Arg<T>,
  ...path: P
): Query<O.Path<T, P>> => q.Select(path, item);

export const selectDefault = <T extends object, P extends Array<A.Key>, U>(
  item: Arg<T>,
  fallback: Arg<U>,
  ...path: P
): Query<O.Path<T, P> | U> => q.Select(path, item, fallback);

// TODO: it's possible to do some very dynamic things here typewise; consider how to carefully allow
// Indeed the types here are not great, especially with the resolver
export const merge = <A extends object, B extends object>(
  a: Arg<A>,
  b: Arg<B>,
  resolver?: Callback<[keyof (A | B), A[keyof A], B[keyof B]], A[keyof A]>
) => q.Merge(a, b, resolver) as Query<A & B>;

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];
export const toArray = <A extends object>(obj: Arg<A>) =>
  q.ToArray(obj) as Query<Entries<A>>;
