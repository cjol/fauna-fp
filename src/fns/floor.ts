import { Query, Arg } from "../types";
import { q } from "../types.internal";

export function floor(value: Arg<number>): Query<number> {
  return q.Floor(value);
}
