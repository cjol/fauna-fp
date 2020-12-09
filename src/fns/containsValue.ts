import { Arg, Query } from "../types";
import { q } from "../types.internal";

/**
 * Returns true when a specific value is found in a document.
 */
export function containsValue(value: Arg, obj: Arg): Query<boolean> {
  return q.ContainsValue(value, obj);
}
