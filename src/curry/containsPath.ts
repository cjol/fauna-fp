import * as fns from "../fns";
import { Arg } from "../types";

/**
 * Returns true when a document contains a value at the specified path.
 */

export function containsPath(path: Arg<Array<string | number>>) {
  return (obj: Arg) => fns.containsPath(path, obj);
}
