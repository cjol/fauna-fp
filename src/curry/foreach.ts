import * as fns from "../fns";
import { Iter, Callback, Arg, IterPayload } from "../types";

export function foreach<I extends Iter<unknown>>(f: Callback<[IterPayload<I>], unknown>) {
  return (source: Arg<I>) => fns.foreach(f, source);
}
