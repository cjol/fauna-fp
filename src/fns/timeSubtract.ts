import { Arg, FaunaDate, Query, Timestamp, TimeUnit } from "../types";
import { q } from "../types.internal";

export function timeSubtract<T extends Timestamp | FaunaDate>(
  x: Arg<T>,
  y: Arg<number>,
  unit: Arg<TimeUnit>
): Query<T> {
  return q.TimeSubtract(x, y, unit);
}
