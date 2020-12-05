import { Arg, Query, Ref, Timestamp, Key, QueryResult, Membership, Privilege } from "./types";
import { q } from "./types.internal";

// createKey defined in authentication
/** Create a user-defined role. */

export function createRole<T = unknown>(
  params: Arg<{
    name: string;
    privileges: Array<Privilege>;
    membership: Array<Membership>;
    data?: T;
  }>
): Query<{
  ref: Ref<Key<QueryResult<T>>>;
  ts: Timestamp;
  name: string;
  privileges: Array<Privilege>;
  membership: Array<Membership>;
}> {
  return q.CreateKey(params);
}
