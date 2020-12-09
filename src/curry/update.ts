/* eslint-disable unused-imports/no-unused-vars-ts */
/* eslint-disable prefer-const */
import { Arg, Ref } from "../types";
import * as fns from "../fns";
import { UpdateParams } from "../fns";

/** Revise specific fields within a document. */
export function update<T>(ref: Arg<Ref<T>>) {
  return (params: Arg<UpdateParams<T>>) => fns.update(ref, params);
}
