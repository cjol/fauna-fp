import * as fns from "../fns";
import { Arg } from "../types";

interface SubstringParam {
  start: Arg<number>;
  length?: Arg<number>;
}
/**
 * Returns a portion of a string.
 */
export function substring(maybeStart: SubstringParam | Arg<number>) {
  const start: SubstringParam =
    typeof maybeStart === "object" && "start" in maybeStart ? maybeStart : { start: maybeStart };
  return (x: Arg<string>) => fns.substring(start, x);
}
