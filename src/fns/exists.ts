import { Arg, Match, Query, Ref } from "../types";
import { q } from "../types.internal";

/**
 * Returns true if a document has an event at a specific time.
 */

export function exists(ref: Arg<Ref> | Arg<Match<unknown[], unknown>>): Query<boolean> {
  return q.Exists(ref);
}
