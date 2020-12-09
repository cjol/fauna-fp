import { Query, Arg } from "../types";
import { q } from "../types.internal";

export function subtract(as: Arg<number[]>): Query<number> {
  return q.Subtract(as);
}
