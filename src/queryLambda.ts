import { Callback, Lambda } from "./types";
import { q } from "./types.internal";

export function queryLambda<I extends unknown[], O>(f: Callback<I, O>): Lambda<I, O> {
  return q.Query(f);
}
