import { O, A } from "ts-toolbelt";
import * as fns from "../fns";
import { Arg } from "../types";

export function selectDefault<U, P extends Array<A.Key>>(fallback: Arg<U>, ...path: P) {
  return function <T extends O.P.Record<P, unknown>>(item: Arg<Partial<T>>) {
    return fns.selectDefault(item, fallback, ...path);
  };
}
