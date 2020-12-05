import { Arg, Ref, Index, Query } from "./types";
import { q } from "./types.internal";

/**
 * The `Index` function returns a valid `Reference` for the specified index name in
 * the specified child database. If a child database is not specified, the
 * returned index reference belongs to the current database.
 */

export function index<Terms extends Arg<unknown>[] = [], O = unknown>(
  name: string
): Query<Ref<Index<Terms, O>>> {
  return q.Index(name);
}
