import { Query, Arg } from "../types";
import { q } from "../types.internal";

export function modulo(x: Arg<number>, y: Arg<number>): Query<number> {
  return q.Modulo(x, y);
}
