import { Query, Arg } from "../types";
import { q } from "../types.internal";

export function ceil(value: Arg<number>): Query<number> {
  return q.Ceil(value);
}
