import * as fns from "../fns";
import { Arg } from "../types";

export function prepend<T>(x: Arg<T[]>) {
  return (y: Arg<T[]>) => fns.prepend(x, y);
}
