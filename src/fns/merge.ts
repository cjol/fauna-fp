/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { Arg, Query, Callback, QueryResult } from "../types";
import { q } from "../types.internal";

export function merge<A extends object, B extends object>(
  a: Arg<A>,
  b: Arg<B>,
  resolver?: Callback<[string, unknown, unknown], unknown>
): Query<QueryResult<A> & QueryResult<B>> {
  return q.Merge(a, b, resolver);
}
