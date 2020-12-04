import { O, A } from 'ts-toolbelt';
import { curry } from 'ramda';
import { Arg, Query, Callback, QueryResult } from './types';
import { q } from './types.internal';

export function select<P extends Array<A.Key>>(...path: P)
  : <T extends O.P.Record<P, any>>(item: Arg<T>) => Query<QueryResult<O.Path<T, P>>>;
export function select<T extends object, P extends Array<A.Key>>(item: Arg<T>, ...path: P)
  : Query<QueryResult<O.Path<T, P>>>;
export function select(item?: any, ...path: (string | number)[]) {
  if (typeof item === 'string' || typeof item === 'number') {
    const fullPath = [item].concat(path);
    return (item: object) => q.Select(fullPath, item);
  }
  return q.Select(path, item);
}

export function selectDefault<U, P extends Array<A.Key>>(fallback: Arg<U>, ...path: P) {
  return function <T extends O.P.Record<P, any>>(item: Arg<T>): Query<QueryResult<U | O.Path<T, P>>> {
    return q.Select(path, item, fallback);
  };
}

type NotAFunction = { [k: string]: unknown } & (
  | { bind?: never }
  | { call?: never }
);

export function merge<A extends NotAFunction, B extends object>(a: Arg<A>, b: Arg<B>)
  : Query<QueryResult<A> & QueryResult<B>>;
export function merge<A extends NotAFunction>(a: Arg<A>)
  : <B extends object>(b: Arg<B>) => Query<QueryResult<A> & QueryResult<B>>;
export function merge<A extends object, B extends object>(resolver: Callback<[string, unknown, unknown], unknown>, a: Arg<A>, b: Arg<B>)
  : Query<QueryResult<A> & QueryResult<B>>;
export function merge<AVal, BVal, A extends Record<string, AVal>>(resolver: Callback<[string, AVal, BVal], AVal | BVal>, a: Arg<A>)
  : <B extends Record<string, BVal>>(b: Arg<B>) => Query<QueryResult<A> & QueryResult<B>>;
export function merge<AVal, BVal>(resolver: Callback<[string, AVal, BVal], AVal | BVal>)
  : (<A extends Record<string, AVal>>(a: Arg<A>) => <B extends Record<string, BVal>>(b: Arg<B>) => Query<QueryResult<A> & QueryResult<B>>)
  & (<A extends Record<string, AVal>, B extends Record<string, BVal>>(a: Arg<A>, b: Arg<B>) => Query<QueryResult<A> & QueryResult<B>>);
export function merge(param1: any, param2?: any, param3?: any) {
  if (typeof param1 === 'function') {
    const resolver = param1;
    if (param2 !== undefined) {
      if (param3 !== undefined) {
        return q.Merge(param2, param3, resolver);
      }
      return (param3: any) => merge(resolver, param2, param3);
    }
    return curry((param2: any, param3: any) => merge(resolver, param2, param3));
  }
  if (param2 !== undefined) {
    return q.Merge(param1, param2);
  }
  return (param2: any) => merge(param1, param2);
}

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];
export function toArray<A extends object>(obj: Arg<A>): Query<Entries<QueryResult<A>>> {
  return q.ToArray(obj);
}
