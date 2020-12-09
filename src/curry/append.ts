import { Arg } from "../types";
import * as fns from "../fns";

export function append<T>(x: Arg<T[]>) {
  return (y: Arg<T[]>) => fns.append(x, y);
}
