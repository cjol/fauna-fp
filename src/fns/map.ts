import { Query, Arg, Callback, QueryResult, MapIterable, Iter, IterPayload } from "../types";
import { q } from "../types.internal";

export function map<I extends Iter<unknown>, O>(
  f: Callback<[IterPayload<I>], O>,
  source: Arg<I>
): Query<MapIterable<I, QueryResult<O>>> {
  // manually create a callback so that fauna driver can parse the param name more easily
  return q.Map(source, (item: Query<IterPayload<I>>) => f(item));
}
