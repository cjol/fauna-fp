import { Arg, Query, Ref, Collection, Document } from "./types";
import { q } from "./types.internal";

// TODO: We should handle other types of schemas too
// type SchemaDoc<Schema> = Schema extends Collection<infer U> ? Document<U> : never;

type Fields<T> = T extends Collection<infer U> ? Document<U> : T;
type CreateParams<T> = Omit<Fields<T>, "ref" | "ts">;

/**  Create a document in a collection. */

export function create<T = unknown>(
  collection: Arg<Ref<T>>
): (params: Arg<CreateParams<T>>) => Query<Fields<T>>;
export function create<T = unknown>(
  collection: Arg<Ref<T>>,
  params: Arg<CreateParams<T>>
): Query<Fields<T>>;
export function create<T = unknown>(collection: Arg<Ref<T>>, params?: Arg<CreateParams<T>>) {
  if (params === undefined) return (params: Arg<CreateParams<T>>) => create(collection, params);
  return q.Create(collection, params);
}
