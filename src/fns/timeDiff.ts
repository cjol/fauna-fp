import { Arg, FaunaDate, Query, Timestamp, TimeUnit } from "../types";
import { q } from "../types.internal";

export function timeDiff(x: Arg<FaunaDate>, y: Arg<FaunaDate>, unit: Arg<TimeUnit>): Query<number>;
export function timeDiff(x: Arg<Timestamp>, y: Arg<Timestamp>, unit: Arg<TimeUnit>): Query<number>;
export function timeDiff(
  x: Arg<Timestamp | FaunaDate>,
  y: Arg<Timestamp | FaunaDate>,
  unit: Arg<TimeUnit>
): Query<number> {
  return q.TimeDiff(x, y, unit);
}
