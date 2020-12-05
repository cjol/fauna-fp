import { Arg, Ref, Collection, Query } from "./types";
import { q } from "./types.internal";

export function ref<T>(schema: Arg<Ref<Collection<T>>>): (id: Arg<string>) => Query<Ref<T>>;
export function ref<T>(schema: Arg<Ref<Collection<T>>>, id: Arg<string>): Query<Ref<T>>;
export function ref<T>(schema: Arg<Ref<Collection<T>>>, id?: Arg<string>) {
  if (id === undefined) return (id: Arg<string>) => ref(schema, id);
  return q.Ref(schema, id);
}
