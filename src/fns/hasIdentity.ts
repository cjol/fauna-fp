import { Query } from "../types";
import { q } from "../types.internal";

/**
 * Checks whether the current client has credentials.
 */

export function hasIdentity(): Query<boolean> {
  return q.HasIdentity();
}
