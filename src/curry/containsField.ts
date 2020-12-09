import * as fns from "../fns";
import { Arg } from "../types";

/**
 * Returns true when a specific field is found in a document.
 */

export function containsField(field: Arg<string>) {
  return (obj: Arg) => fns.containsField(field, obj);
}
