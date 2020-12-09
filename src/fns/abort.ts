import { Arg, Query } from "../types";
import { q } from "../types.internal";

export function abort(x: Arg<string>): Query<never> {
  return q.Abort(x);
}
