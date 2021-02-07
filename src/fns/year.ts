import { Arg, FaunaDate, Query } from "../types";
import { q } from "../types.internal";

export function year(date: Arg<FaunaDate>): Query<number> {
  return q.Year(date);
}
