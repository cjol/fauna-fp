import { Arg, FaunaDate, Query } from "../types";
import { q } from "../types.internal";

export function date(x: Arg<string>): Query<FaunaDate> {
  return q.Date(x);
}
