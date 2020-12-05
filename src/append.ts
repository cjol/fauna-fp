import { Query, Arg, QueryResult } from "./types";
import { q } from "./types.internal";

export function append<T>(x: Arg<T[]>): (y: Arg<T[]>) => Query<QueryResult<T>[]>;
export function append<T>(x: Arg<T[]>, y: Arg<T[]>): Query<QueryResult<T>[]>;
export function append<T>(x: Arg<T[]>, y?: Arg<T[]>) {
  if (y !== undefined) return q.Append(x, y);
  return (y: Arg<T[]>) => append(x, y);
}
