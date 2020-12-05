import { collection } from "./collection";
import { Arg, Collection, FaunaFunction, Index, Key, Query, QueryResult, Ref, Role, Token, Document } from "./types";
import { q } from "./types.internal";

export function get<T = unknown>(ref: Arg<Ref<T>>): Query<T> {
  return q.Get(ref);
}
