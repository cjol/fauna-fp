import * as fns from "../fns";
import { Arg, Callback } from "../types";

/**
 * Defines a variable’s value.
 */

export function letVar<I, O>(f: Callback<[I], O>) {
  return (val: Arg<I>) => fns.letVar(val, f);
}
