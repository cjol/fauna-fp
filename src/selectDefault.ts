import { O, A, Union } from "ts-toolbelt";
import { Arg, Query, QueryResult } from "./types";
import { q } from "./types.internal";

export function selectDefault<U, P extends Array<A.Key>>(fallback: Arg<U>, ...path: P) {
  return function <T extends O.P.Record<P, unknown>>(
    item: Arg<Partial<T>>
  ): Query<QueryResult<U> | Union.NonNullable<QueryResult<O.Path<T, P>>>> {
    return q.Select(path, item, fallback);
  };
}
