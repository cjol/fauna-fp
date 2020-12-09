import * as fns from "../fns";
import { Arg, Callback, Iter } from "../types";

export function reduce<T, A>(f: Callback<[A, T], A>, init?: Arg<A>) {
  // manually create a callback so that fauna driver can parse the param name more easily
  if (init === undefined) {
    return (init: Arg<A>) => reduce(f, init);
  }
  return (source: Arg<Iter<T>>) => fns.reduce(f, init, source);
}
