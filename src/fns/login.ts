import { Arg, Match, Query, QueryResult, Ref, Timestamp, Token } from "../types";
import { q } from "../types.internal";

interface LoginParams<D> {
  password: string;
  data?: QueryResult<D>;
  ttl?: Timestamp;
}
export interface LoginResult<D, T> {
  ref: Ref<Token<QueryResult<D>>>;
  ts: number;
  instance: Ref<QueryResult<T>>;
  secret: string;
}
/**
 * Creates an auth token for an identity.
 */
export function login<D = unknown, T = unknown>(
  identity: Arg<Match<unknown[], T> | Ref<T>>,
  params: Arg<LoginParams<D>>
): Query<LoginResult<D, T>> {
  return q.Login(identity, params);
}
