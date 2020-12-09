import * as fns from "../fns";
import { Arg, QueryResult, Ref, Timestamp } from "../types";

interface LoginParams<D> {
  password: string;
  data?: QueryResult<D>;
  ttl?: Timestamp;
}
/**
 * Creates an auth token for an identity.
 */
export function login<T = unknown>(identity: Arg<Ref<QueryResult<T>>>) {
  return <D = unknown>(params: Arg<LoginParams<D>>) => fns.login(identity, params);
}
