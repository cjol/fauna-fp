import { Query, Arg, Callback, Iter, IterPayload } from "../types";
import { q } from "../types.internal";

export function filter<I extends Iter<unknown>>(
  f: Callback<[IterPayload<I>], boolean>,
  source: Arg<I>
): Query<I> {
  // manually create a callback so that fauna driver can parse the param name more easily
  return q.Filter(source, (item: Query<IterPayload<I>>) => f(item));
}
