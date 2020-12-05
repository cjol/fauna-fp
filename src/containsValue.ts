import { Arg, Query } from "./types";
import { q } from "./types.internal";

/**
 * Returns true when a specific value is found in a document.
 */

export function containsValue(value: Arg): (obj: Arg) => Query<boolean>;
export function containsValue(value: Arg, obj: Arg): Query<boolean>;
export function containsValue(value: Arg, obj?: Arg) {
  if (obj === undefined) return (obj: Arg) => containsValue(value, obj);
  return q.ContainsValue(value, obj);
}
