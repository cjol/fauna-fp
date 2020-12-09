import { Arg, Query, Index } from "../types";
import { CleanedType, q } from "../types.internal";

/**  Create an index. */
type CreateIndexParams<I extends unknown[], V extends unknown[], O, D> = Omit<
  CleanedType<Index<I, V, O, D>>,
  "ref" | "ts" | "active"
>;
export function createIndex<
  I extends unknown[] = unknown[],
  V extends unknown[] = unknown[],
  O = V[0],
  D = unknown
>(params: Arg<CreateIndexParams<I, V, O, D>>): Query<Index<I, V, O, D>> {
  return q.CreateIndex(params);
}
