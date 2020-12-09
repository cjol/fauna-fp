import { Collection, Key, QueryResult } from "../types";
import { q } from "../types.internal";

/**
 * Retrieves the keys associated with the specified database.
 */

export function keys<D = unknown>(): Collection<Key<QueryResult<D>>> {
  return q.Keys();
}
