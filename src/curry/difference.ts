import * as fns from "../fns";
import { Arg } from "../types";

export function difference<T>(diffs: Arg<T[]>[]) {
  return (source: Arg<T[]>) => fns.difference(diffs, source);
}
