import * as fns from "../fns";
import { Arg, Iter } from "../types";

export function drop(num: Arg<number>) {
  return <I extends Iter>(source: Arg<I>) => fns.drop(num, source);
}
