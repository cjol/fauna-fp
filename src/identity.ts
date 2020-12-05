import { Query, QueryResult, Ref } from "./types";
import { q } from "./types.internal";

/**
 * Fetches the identity’s auth token.
 */

export function identity<T = unknown>(): Query<Ref<QueryResult<T>>> {
  return q.Identity();
}
