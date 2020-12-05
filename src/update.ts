import { Arg, Ref, Query, Document, Collection } from "./types";
import { q } from "./types.internal";

// TODO: We should handle other types of schemas too
type Fields<T> = T extends Collection<infer U> ? Document<U> : T;
type UpdateParams<T> = Partial<Omit<Fields<T>, "ref" | "ts">>;

/** Revise specific fields within a document. */
export function update<T>(ref: Arg<Ref<T>>): (params: Arg<UpdateParams<T>>) => Query<Fields<T>>;
export function update<T>(ref: Arg<Ref<T>>, params: Arg<UpdateParams<T>>): Query<Fields<T>>;
export function update<T>(ref: Arg<Ref<T>>, params?: Arg<UpdateParams<T>>) {
  if (params === undefined) return (params: Arg<UpdateParams<T>>) => update(ref, params);
  return q.Replace(ref, params);
}
