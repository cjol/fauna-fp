import annotate from "fn-annotate";
import { Arg, Callback, Query, QueryResult } from "./types";
import { q } from "./types.internal";

/**
 * Defines a variable’s value.
 */

export function letVar<I, O>(f: Callback<[I], O>): (val: Arg<I>) => Query<QueryResult<O>>;
export function letVar<I, O>(val: Arg<I>, f: Callback<[I], O>): Query<QueryResult<O>>;
export function letVar<I, O>(val: Callback<[I], O> | Arg<I>, f?: Callback<[I], O>) {
  if (f === undefined) {
    // only one parameter was provided, so we read it as a function
    const callback = val as Callback<[I], O>;
    return (val: Arg<I>) => letVarComplete(val, callback);
  }
  return letVarComplete(val as Arg<I>, f);
}

function letVarComplete<I, O>(val: Arg<I>, f: Callback<[I], O>): Query<QueryResult<O>> {
  const params = annotate(f);
  if (params.length !== 1) throw new Error("Only one var can be set using letVar");
  const getVar = q.Var(params[0]) as Query<I>;
  return q.Let({ [params[0]]: val }, f(getVar));
}
