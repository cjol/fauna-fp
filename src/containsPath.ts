import { Arg, Query } from "./types";
import { q } from "./types.internal";

/**
 * Returns true when a document contains a value at the specified path.
 */

export function containsPath(path: Arg<Array<string | number>>): (obj: Arg) => Query<boolean>;
export function containsPath(path: Arg<Array<string | number>>, obj: Arg): Query<boolean>;
export function containsPath(path: Arg<Array<string | number>>, obj?: Arg) {
  if (obj === undefined) return (obj: Arg) => containsPath(path, obj);
  return q.ContainsPath(path, obj);
}
