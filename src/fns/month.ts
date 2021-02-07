import { Arg, FaunaDate, Query } from "../types";
import { q } from "../types.internal";

export function month(date: Arg<FaunaDate>): Query<number> {
  return q.Month(date);
}
