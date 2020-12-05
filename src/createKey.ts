import { Arg, Database, Key, Query, QueryResult, Ref, Role } from "./types";
import { q } from "./types.internal";

/**
 * Create a key.
 */

type CreateKeyInput<D, RD> = Arg<Omit<Key<D, RD>, "ref" | "ts" | "hashed_secret">>;
type CreateKeyResult<D, RD> = Key<D, RD> & { secret: string };
export function createKey<D, RD>(params: CreateKeyInput<D, RD>) {
  return q.CreateKey(params) as Query<CreateKeyResult<D, RD>>;
}
