import { Client } from "faunadb";
import { Query, QueryResult } from "./types";
import { CleanedType } from "./types.internal";

export function query(client: Client): <T>(x: Query<T>) => Promise<T>;
export function query<T>(client: Client, x: Query<T>): Promise<T>;
export function query<T>(client: Client, x?: Query<T>) {
  if (x === undefined) return <T>(x: Query<T>) => query(client, x);
  return client.query<CleanedType<QueryResult<T>>>(x as any);
}
