import { Arg, Query } from "./types";
import { q } from "./types.internal";

export function toString(x: Arg): Query<string> {
  return q.ToString(x);
}
