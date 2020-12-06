import { Query, Arg } from "./types";
import { q } from "./types.internal";

export function round(value: Arg<number>): Query<number> {
  return q.Round(value);
}
