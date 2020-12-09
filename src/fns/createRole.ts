import { Arg, Query, Role } from "../types";
import { CleanedType, q } from "../types.internal";

/** Create a user-defined role. */
type CreateRoleInput<D> = Omit<CleanedType<Role<D>>, "ref" | "ts">;
export function createRole<D = unknown>(params: Arg<CreateRoleInput<D>>): Query<Role<D>> {
  return q.CreateRole(params);
}
