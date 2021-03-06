import { Arg, ArgTuple, FaunaFunction, Query, QueryResult, Ref } from "../types";
import { q } from "../types.internal";

/**
 * Executes a user-defined function.
 */
export function call<I extends unknown[], O>(
  fn: Arg<Ref<FaunaFunction<I, O>>>,
  terms: ArgTuple<I>
): Query<QueryResult<O>> {
  return q.Call(fn, ...terms);
}
