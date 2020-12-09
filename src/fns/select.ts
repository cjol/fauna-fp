import { O } from "ts-toolbelt";
import { Arg, Query, QueryResult } from "../types";
import { q } from "../types.internal";

// type SafePath<T, P extends Array<string | number>> = O.Path<QueryResu
// export function select<P extends Array<string | number>, T extends object>(
//   item: Query<T>,
//   // we have to have `path` last so that we can infer a tuple type for P
//   ...path: P
// ): Query<QueryResult<O.Path<T, P>>>;
// export function select<P extends Array<string | number>, T extends object>(
//   item: T,
//   // we have to have `path` last so that we can infer a tuple type for P
//   ...path: P
// ): Query<QueryResult<O.Path<T, P>>>;
export function select<P extends Array<string | number>, T extends object>(
  item: Arg<T>,
  // we have to have `path` last so that we can infer a tuple type for P
  ...path: P
): Query<O.Path<QueryResult<T>, P>> {
  return q.Select(path, item);
}
