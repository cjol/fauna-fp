import * as fns from "../fns";
import { Arg, Callback, Iter, IterPayload } from "../types";

export function filter<I extends Iter<unknown>>(f: Callback<[IterPayload<I>], boolean>) {
  return (source: Arg<I>) => fns.filter(f, source);
}
