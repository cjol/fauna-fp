import { Query, Arg } from "./types";
import { q } from "./types.internal";

export function multiply(as: Arg<number[]>): Query<number> {
  return q.Multiply(as);
}
