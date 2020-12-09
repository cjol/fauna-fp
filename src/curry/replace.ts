import * as fns from "../fns";
import { Arg, Ref } from "../types";

/**Replace an document with a new document. */
export function replace<T>(ref: Arg<Ref<T>>) {
  return (params: Arg<{ data: T }>) => fns.replace(ref, params);
}
