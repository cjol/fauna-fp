import { Arg, Query, Timestamp } from "../types";
import { q } from "../types.internal";

export function toTime(x: Arg): Query<Timestamp> {
  return q.ToTime(x);
}
