import { Arg, Query, Ref, Timestamp, Database, QueryResult } from "./types";
import { CleanedType, q } from "./types.internal";

/**  Create a database. */
type CreateDatabaseParams<D> = Omit<CleanedType<Database<D>>, "ref" | "ts" | "global_id">;
export function createDatabase<T = unknown>(params: Arg<CreateDatabaseParams<T>>): Query<Database<T>> {
  return q.CreateDatabase(params);
}
