import * as fns from "../fns";
import { Arg } from "../types";

/**
 * Returns true when a specific value is found in a document.
 */

export function containsValue(value: Arg) {
  return (obj: Arg) => fns.containsValue(value, obj);
}
