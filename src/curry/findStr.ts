import * as fns from "../fns";
import { Arg } from "../types";

/**
 * Searches for a string within a string.
 */
export function findStr(maybeNeedle: FindStrParams | Arg<string> | FindStrParams) {
  const needle: FindStrParams =
    typeof maybeNeedle === "object" && "find" in maybeNeedle ? maybeNeedle : { find: maybeNeedle };
  return (haystack: Arg<string>) => fns.findStr(needle, haystack);
}
interface FindStrParams {
  find: Arg<string>;
  start?: Arg<number>;
}
