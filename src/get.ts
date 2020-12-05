import {
  Arg,
  Query,
  Ref,
} from "./types";
import { q } from "./types.internal";

export function get<T = unknown>(ref: Arg<Ref<T>>): Query<T> {
  return q.Get(ref);
}
