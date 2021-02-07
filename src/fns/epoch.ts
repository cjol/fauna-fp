import { Arg, Query, Timestamp, TimeUnit } from "../types";
import { q } from "../types.internal";

export function epoch(y: Arg<number>, unit: Arg<TimeUnit>): Query<Timestamp> {
  return q.Epoch(y, unit);
}
