import { Arg, FaunaDate, Query } from "../types";
import { q } from "../types.internal";

export function toDate(x: Arg): Query<FaunaDate> {
  return q.ToDate(x);
}
