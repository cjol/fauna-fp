import { Arg, Ref, Query, FaunaFunction } from "../types";
import { q } from "../types.internal";

export function fun<I extends unknown[], O>(name: Arg<string>): Query<Ref<FaunaFunction<I, O>>> {
  return q.Function(name);
}
