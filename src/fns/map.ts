import { Query, Arg, Callback, QueryResult, MapIterable, Iter, IterPayload } from "../types";
import { q } from "../types.internal";

// TODO: allow spreading args from tuple source (e.g. paginated index)
export function map<I extends Iter<unknown>, O>(
  f: Callback<[IterPayload<I>], O>,
  source: Arg<I>
): Query<MapIterable<I, QueryResult<O>>>;
export function map(f: Function, source: unknown) {
  // manually create a callback so that fauna driver can parse the param name more easily
  return q.Map(source, (item: Query) => f(item));
}
