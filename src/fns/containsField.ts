import { Arg, Query } from "../types";
import { q } from "../types.internal";

/**
 * Returns true when a specific field is found in a document.
 */
export function containsField(field: Arg<string>, obj: Arg): Query<boolean> {
  return q.ContainsField(field, obj);
}
