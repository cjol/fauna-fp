import { Ref, Collection, Query } from "./types";
import { q } from "./types.internal";

export function collection<T = unknown, D = unknown>(name: string): Query<Ref<Collection<T, D>>> {
  return q.Collection(name);
}
