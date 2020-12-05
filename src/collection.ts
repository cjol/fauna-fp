import { Ref, Collection, Query } from "./types";
import { q } from "./types.internal";

export function collection<T = unknown>(name: string): Query<Ref<Collection<T>>> {
  return q.Collection(name);
}
