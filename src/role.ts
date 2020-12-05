import { Arg, Collection, Query, QueryResult, Ref, Role, Token } from "./types";
import { q } from "./types.internal";

/**
 * Provides a reference to the internal tokens collection.
 */

export function role<D = unknown>(name: Arg<string>): Query<Ref<Role<D>>> {
  return q.Role(name);
}
