import { Arg, Query, Ref, Timestamp, Role, FaunaFunction, QueryResult } from "./types";
import { q } from "./types.internal";

/**  Create a user-defined function. */

export function createFunction<I extends unknown[] = unknown[], O = unknown, D = unknown>(
  params: Arg<CreateFunctionParams<D>>
): Query<CreateFunctionResult<I, O, D>> {
  return q.CreateFunction(params);
}
interface CreateFunctionParams<D = unknown> {
  name: string;
  body: Query<unknown>;
  data?: D;
  role?: string | Role;
}
interface CreateFunctionResult<I extends unknown[] = unknown[], O = unknown, D = unknown> {
  ref: Ref<FaunaFunction<I, O, QueryResult<D>>>;
  name: string;
  role: string | Role;
  ts: Timestamp;
  // TODO: I don't yet have a runtime representation of Query objects
  body: unknown;
}
