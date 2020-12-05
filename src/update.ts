import { Arg, Ref, QueryResult, Query, Document, Role, FaunaFunction, Index } from "./types";
import { q } from "./types.internal";

/** Revise specific fields within a document. */
type Fields<T> = T extends Role | FaunaFunction<any, any> | Index<any, any> ? T : Document<T>;
type UpdateParams<T> = Partial<Omit<Fields<T>, "ref" | "ts">>;

let d: UpdateParams<Index<[string], string>> = {};

export function update<T>(ref: Arg<Ref<T>>): (params: Arg<UpdateParams<T>>) => Query<Fields<T>>;
export function update<T>(ref: Arg<Ref<T>>, params: Arg<UpdateParams<T>>): Query<Fields<T>>;
export function update<T>(ref: Arg<Ref<T>>, params?: Arg<UpdateParams<T>>) {
  if (params === undefined) return (params: Arg<UpdateParams<T>>) => update(ref, params);
  return q.Replace(ref, params);
}
