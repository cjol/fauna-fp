/* eslint-disable unused-imports/no-unused-vars-ts */
/* eslint-disable prefer-const */
import { Arg, Ref, Query, Document, Collection } from "../types";
import { q, Type } from "../types.internal";

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Type<string> ? T[P] : DeepPartial<T[P]>;
};

type Fields<T> = T extends Collection<infer U> ? Document<U> : T;
export type UpdateParams<T> = Omit<DeepPartial<Fields<T>>, "ref" | "ts">;

/** Revise specific fields within a document. */
export function update<T>(ref: Arg<Ref<T>>, params: Arg<UpdateParams<T>>): Query<Fields<T>> {
  return q.Update(ref, params);
}
