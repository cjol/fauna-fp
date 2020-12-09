import { Query, Arg } from "../types";
import { q } from "../types.internal";

export function divide(as: Arg<number[]>): Query<number> {
  return q.Divide(as);
}
