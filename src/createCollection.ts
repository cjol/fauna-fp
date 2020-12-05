import { Arg, Query, Collection } from "./types";
import { CleanedType, q } from "./types.internal";

type CreateCollectionParams<T, D = unknown> = Omit<CleanedType<Collection<T, D>>, "ref" | "ts">;

/**  Create a collection. */
export function createCollection<T = unknown, D = unknown>(
  params: Arg<CreateCollectionParams<T, D>>
): Query<Collection<T, D>> {
  return q.CreateCollection(params);
}
