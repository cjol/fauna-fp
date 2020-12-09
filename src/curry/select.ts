import { O } from "ts-toolbelt";
import * as fns from "../fns";
import { Arg } from "../types";

export function select<P extends Array<string | number>>(...path: P) {
  <T extends O.P.Record<P, unknown>>(item: Arg<T>) => fns.select(item, ...path);
}
