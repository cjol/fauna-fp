import { Arg, Query, Timestamp } from "./types";
import { q } from "./types.internal";

export function time(x: Arg<string>): Query<Timestamp> {
  return q.Time(x);
}
