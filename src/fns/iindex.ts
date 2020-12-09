import { Arg, Ref, Index, Query, DocRef, Document } from "../types";
import { q } from "../types.internal";

type DefaultDocType<T> = T extends [DocRef<infer U>] ? Document<U> : unknown;

/**
 * The `Index` function returns a valid `Reference` for the specified index name in
 * the specified child database. If a child database is not specified, the
 * returned index reference belongs to the current database.
 */

export function index<
  Terms extends Arg<unknown>[] = [],
  Values extends Arg<unknown>[] = [],
  O = DefaultDocType<Values>
>(name: string): Query<Ref<Index<Terms, Values, O>>> {
  return q.Index(name);
}
