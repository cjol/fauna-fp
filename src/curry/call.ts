import * as fns from "../fns";
import { Arg, ArgTuple, FaunaFunction, Ref } from "../types";

/**
 * Executes a user-defined function.
 */

export function call<I extends unknown[], O>(fn: Arg<Ref<FaunaFunction<I, O>>>) {
  return (...terms: ArgTuple<I>) => fns.call(fn, terms);
}
