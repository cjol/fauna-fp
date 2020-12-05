import { Arg, Ref, Collection, Query, Document } from "./types";
import { q } from "./types.internal";

// TODO: We should handle other types of schemas too
type SchemaDoc<Schema> = Schema extends Collection<infer U> ? Document<U> : never;

export function ref<T>(schema: Arg<Ref<Collection<T>>>): (id: Arg<string>) => Query<Ref<Document<T>>>;
export function ref<T>(schema: Arg<Ref<Collection<T>>>, id: Arg<string>): Query<Ref<Document<T>>>;
export function ref<T>(schema: Arg<Ref<Collection<T>>>, id?: Arg<string>) {
  if (id === undefined) return (id: Arg<string>) => ref(schema, id);
  return q.Ref(schema, id);
}
