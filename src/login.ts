import { Arg, Query, QueryResult, Ref, Timestamp, Token } from "./types";
import { q } from "./types.internal";

interface LoginParams<D> {
  password: string;
  data?: QueryResult<D>;
  ttl?: Timestamp;
}
interface LoginResult<D, T> {
  ref: Ref<Token<QueryResult<D>>>;
  ts: number;
  instance: Ref<QueryResult<T>>;
  secret: string;
}
/**
 * Creates an auth token for an identity.
 */
export function login<T = unknown>(
  identity: Arg<Ref<QueryResult<T>>>
): <D = unknown>(params: Arg<LoginParams<D>>) => Query<LoginResult<D, T>>;
export function login<D = unknown, T = unknown>(
  identity: Arg<Ref<QueryResult<T>>>,
  params: Arg<LoginParams<D>>
): Query<LoginResult<D, T>>;
export function login<D = unknown, T = unknown>(
  identity: Arg<Ref<QueryResult<T>>>,
  params?: Arg<LoginParams<D>>
) {
  return q.Login(identity, params);
}
