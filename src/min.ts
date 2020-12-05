import { Query, Arg, Iter } from "./types";
import { q } from "./types.internal";

// TODO: allow individual values to be passed one-by-one for pointfree use

export function min(values: Arg<Iter<number>>): Query<number> {
  return q.Min(values);
}
