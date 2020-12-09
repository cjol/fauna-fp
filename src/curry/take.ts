import * as fns from "../fns";
import { Arg, Iter } from "../types";

export function take(num: Arg<number>) {
  return <I extends Iter>(source: Arg<I>) => fns.take(num, source);
}
