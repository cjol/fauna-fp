import { curry } from 'ramda';
import { Arg, Query, Callback, QueryResult } from './types';
import { q } from './types.internal';

type NotAFunction = { [k: string]: unknown; } & ({ bind?: never; } |
{ call?: never; });

export function merge<A extends NotAFunction, B extends object>(a: Arg<A>, b: Arg<B>): Query<QueryResult<A> & QueryResult<B>>;
export function merge<A extends NotAFunction>(a: Arg<A>): <B extends object>(b: Arg<B>) => Query<QueryResult<A> & QueryResult<B>>;
export function merge<A extends object, B extends object>(resolver: Callback<[string, unknown, unknown], unknown>, a: Arg<A>, b: Arg<B>): Query<QueryResult<A> & QueryResult<B>>;
export function merge<AVal, BVal, A extends Record<string, AVal>>(resolver: Callback<[string, AVal, BVal], AVal | BVal>, a: Arg<A>): <B extends Record<string, BVal>>(b: Arg<B>) => Query<QueryResult<A> & QueryResult<B>>;
export function merge<AVal, BVal>(resolver: Callback<[string, AVal, BVal], AVal | BVal>): (<A extends Record<string, AVal>>(a: Arg<A>) => <B extends Record<string, BVal>>(b: Arg<B>) => Query<QueryResult<A> & QueryResult<B>>) &
  (<A extends Record<string, AVal>, B extends Record<string, BVal>>(a: Arg<A>, b: Arg<B>) => Query<QueryResult<A> & QueryResult<B>>);
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
