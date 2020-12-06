import { Arg, Query, Ref, Role } from "./types";
import { q } from "./types.internal";

/**
 * Retrieves the role with the given name from the internal roles collection
 */

export function role<D = unknown>(name: Arg<string>): Query<Ref<Role<D>>> {
  return q.Role(name);
}
