import { Arg, Index, Match, Query, QueryResult } from "../types";
import { q } from "../types.internal";

/**
 * Combines the items in a set with set’s indexed values.
 */
// // TODO: allow callbacks
// export function join<T extends unknown[], V extends unknown[], O>(
//   detail: Arg<Index<T, V, O>>
// ): (source: Arg<Match<unknown[], V>>) => Query<Match<QueryResult<V>, QueryResult<O>>>;
// export function join<T extends unknown[], V extends unknown[], O>(
//   detail: Arg<Index<T, V, O>>,
//   source: Arg<Match<unknown[], O>>
// ): Query<Match<QueryResult<V>, QueryResult<O>>>;
// export function join<T extends unknown[], V extends unknown[], O>(
//   detail: Arg<Index<T, V, O>>,
//   source?: Arg<Match<unknown[], O>>
// ) {
//   if (source === undefined) return (source: Arg<T[]>) => join(detail, source);
//   return q.Join(source, detail);
// }
