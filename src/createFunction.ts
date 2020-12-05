import { Arg, Query, FaunaFunction } from "./types";
import { CleanedType, q } from "./types.internal";

/**  Create a user-defined function. */
type CreateFunctionParams<I extends unknown[], O, D> = Omit<
  CleanedType<FaunaFunction<I, O, D>>,
  "ref" | "ts"
>;
export function createFunction<I extends unknown[] = unknown[], O = unknown, D = unknown>(
  params: Arg<CreateFunctionParams<I, O, D>>
): Query<FaunaFunction<I, O, D>> {
  return q.CreateFunction(params);
}
