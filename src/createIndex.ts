import { Arg, Query, Index } from "./types";
import { CleanedType, q } from "./types.internal";

/**  Create an index. */
type CreateIndexParams<I extends unknown[], O, D> = Omit<
  CleanedType<Index<I, O, D>>,
  "ref" | "ts" | "active"
>;
export function createIndex<I extends unknown[] = unknown[], O = unknown, D = unknown>(
  params: Arg<CreateIndexParams<I, O, D>>
): Query<Index<I, O, D>> {
  return q.CreateIndex(params);
}
