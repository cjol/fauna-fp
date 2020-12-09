import * as fns from "../fns";
import { CreateParams } from "../fns";
import { Arg, Ref } from "../types";

/**  Create a document in a collection. */

export function create<T = unknown>(collection: Arg<Ref<T>>) {
  return (params: Arg<CreateParams<T>>) => fns.create(collection, params);
}
