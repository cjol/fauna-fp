import { Arg, Ref, QueryResult } from "./types";
import { q } from "./types.internal";

/** Revise specific fields within a document. */
interface UpdateParams<T> {
  credentials?: {
    password: string;
  };
  data: Partial<T>;
}
interface UpdateResult<T> {
  ref: Ref<QueryResult<T>>;
  data: QueryResult<T>;
  ts: number;
}

export function update<T>(ref: Arg<Ref<T>>): (params: Arg<UpdateParams<T>>) => UpdateResult<T>;
export function update<T>(ref: Arg<Ref<T>>, params: Arg<UpdateParams<T>>): UpdateResult<T>;
export function update<T>(ref: Arg<Ref<T>>, params?: Arg<UpdateParams<T>>) {
  if (params === undefined) return (params: Arg<UpdateParams<T>>) => update(ref, params);
  return q.Replace(ref, params);
}
