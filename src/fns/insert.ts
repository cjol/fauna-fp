import { Arg, Query, Ref, Timestamp, QueryResult } from "../types";
import { q } from "../types.internal";
import { Action } from "../types";

// TODO: curry
/** Add an event to a document’s history. */
export function insert<T>(
  ref: Arg<Ref<T>>,
  ts: Arg<Timestamp>,
  action: Arg<Action>,
  param_object: Arg<{
    data: T;
  }>
): Query<InsertResult<T>> {
  return q.Insert(ref, ts, action, param_object);
}
interface InsertResult<T> {
  action: Action;
  ts: number;
  document: Ref<QueryResult<T>>;
  data: QueryResult<T>;
}
