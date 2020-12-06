import { Arg, Key, Query } from "./types";
import { CleanedType, q } from "./types.internal";

/**
 * Create a key.
 */

type CreateKeyInput<D, RD> = Arg<Omit<CleanedType<Key<D, RD>>, "ref" | "ts" | "hashed_secret">>;
type CreateKeyResult<D, RD> = Key<D, RD> & { secret: string };
export function createKey<D, RD>(params: CreateKeyInput<D, RD>) {
  return q.CreateKey(params) as Query<CreateKeyResult<D, RD>>;
}
