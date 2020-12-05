import { Arg, Query } from "./types";
import { q } from "./types.internal";

/**
 * Returns true when a specific field is found in a document.
 */

export function containsField(field: Arg<string>): (obj: Arg) => Query<boolean>;
export function containsField(field: Arg<string>, obj: Arg): Query<boolean>;
export function containsField(field: Arg<string>, obj?: Arg) {
  if (obj === undefined) return (obj: Arg) => containsField(field, obj);
  return q.ContainsField(field, obj);
}
