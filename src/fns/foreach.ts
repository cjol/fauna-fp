import { Query, Arg, Callback, Iter, IterPayload } from "../types";
import { q } from "../types.internal";

export function foreach<I extends Iter<unknown>>(
  f: Callback<[IterPayload<I>], unknown>,
  source: Arg<I>
): Query<I> {
  // manually create a callback so that fauna driver can parse the param name more easily
  return q.Foreach(source, (item: Query<IterPayload<I>>) => f(item));
}
