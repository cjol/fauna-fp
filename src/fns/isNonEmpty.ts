import { Query, Arg, Iter } from "../types";
import { q } from "../types.internal";

export function isNonEmpty<T>(sources: Arg<Iter<T>>): Query<boolean> {
  return q.IsNonEmpty(sources);
}
