import { Query, Arg, Iter } from "../types";
import { q } from "../types.internal";

export function sum(values: Arg<Iter<number>>): Query<number> {
  return q.Sum(values);
}
