import { Arg, Query, Timestamp } from "./types";
import { q } from "./types.internal";

export function toSeconds(x: Arg<Timestamp>): Query<number> {
  return q.ToSeconds(x);
}
