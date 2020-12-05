import { Arg, Query } from "./types";
import { q } from "./types.internal";

interface SubstringParam {
  start: Arg<number>;
  length?: Arg<number>;
}
/**
 * Returns a portion of a string.
 */
export function substring(start: SubstringParam): (x: Arg<string>) => Query<string>;
export function substring(start: Arg<number>): (x: Arg<string>) => Query<string>;
export function substring(start: SubstringParam, x: Arg<string>): Query<string>;
export function substring(start: Arg<number>, x: Arg<string>): Query<string>;
export function substring(maybeStart: Arg<number> | SubstringParam, x?: Arg<string>) {
  const start: SubstringParam = typeof maybeStart === "object" && "start" in maybeStart ? maybeStart : { start: maybeStart };
  if (x === undefined) return (x: Arg<string>) => substring(start, x);
  return q.SubString(x, start.start, start.length);
}
