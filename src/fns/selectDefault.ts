import { O, A, Union } from "ts-toolbelt";
import { Arg, Query, QueryResult } from "../types";
import { q } from "../types.internal";

export function selectDefault<P extends Array<A.Key>, U, T extends object>(
  item: Arg<T>,
  fallback: Arg<U>,
  // we have to have `path` last so that we can infer a tuple type for P
  ...path: P
): Query<QueryResult<U> | Union.NonNullable<QueryResult<O.Path<T, P>>>> {
  return q.Select(path, item, fallback);
}
