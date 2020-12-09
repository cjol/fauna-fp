import { Arg, Query } from "../types";
import { q } from "../types.internal";

export function isString(arg: Arg<unknown>): Query<boolean> {
  return q.IsString(arg);
}
