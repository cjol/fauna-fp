import { Arg, Query, Ref, Timestamp, QueryResult } from "../types";
import { q } from "../types.internal";

/**Remove a document, key, index, collection, or database. */

export function deleteItem<T>(
  ref: Arg<Ref<T>>
): Query<{
  ref: Ref<QueryResult<T>>;
  ts: Timestamp;
  data: QueryResult<T>;
}> {
  return q.Delete(ref);
}
