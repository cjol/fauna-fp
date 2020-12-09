import { Client, ExprArg } from "faunadb";
import { Query, QueryResult } from "../types";
import { CleanedType } from "../types.internal";

export function query<T>(client: Client, x: Query<T>): Promise<CleanedType<QueryResult<T>>> {
  return client.query<CleanedType<QueryResult<T>>>(x as ExprArg);
}
