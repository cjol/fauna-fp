import { Arg, Query, Ref, Timestamp } from "../types";
import { q } from "../types.internal";
import { Action } from "../types";

/** Remove an event from a document’s history. */
export function remove<T>(
  ref: Arg<Ref<T>>,
  ts: Arg<Timestamp>,
  action: Arg<Action>
  // TODO: the return value examples in the docs don't line up with the descriptions. I've used the example.
): Query<null> {
  return q.Remove(ref, ts, action);
}
