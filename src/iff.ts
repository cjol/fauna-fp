import { Arg, Query, QueryResult } from "./types";
import { q } from "./types.internal";

// TODO: I would love to use x as a type guard somehow but I am not sure we'll be able to without an actual function

export function iff<T, F>(
  x: Arg<boolean>,
  ifTrue: Arg<T>,
  ifFalse: Arg<F>
): Query<QueryResult<T> | QueryResult<F>> {
  return q.If(x, ifTrue, ifFalse);
}
