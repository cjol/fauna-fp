import {
  Arg,
  Collection,
  Credentials,
  Database,
  Key,
  Query,
  QueryResult,
  Ref,
  Role,
  Timestamp,
  Token,
} from './types';
import { q } from './types.internal';

/**
 * Create a key.
 */
export function createKey<D>(params: Arg<{
  role: string | Ref<Role> | Array<Ref<Role>>;
  name?: string;
  data?: D;
  database?: Ref<Database>;
}>) {
  return q.CreateKey(params) as Query<{
    ref: Ref<Key<QueryResult<D>>>;
    database: Ref<Database>;
    role: string;
    name?: string;
    ts: number;
    secret: string;
    hashed_secret: string;
  }>;
}

/**
 * Provides a reference to the internal credentials collection.
 */
export function credentials<I = unknown, D = unknown>(): Collection<Credentials<QueryResult<I>, QueryResult<D>>> {
  return q.Credentials();
}

/**
 * Checks whether the current client has credentials.
 */
export function hasIdentity(): Query<boolean> {
  return q.HasIdentity();
}

/**
 * Verifies an identity’s credentials.
 */
export function identify(doc: Arg<Ref<any>>): (password: Arg<string>) => Query<boolean>;
export function identify(doc: Arg<Ref<any>>, password: Arg<string>): Query<boolean>;
export function identify(doc: Arg<Ref<any>>, password?: Arg<string>) {
  if (password !== undefined) return q.Identify(doc, password);
  return (password: Arg<string>) => identify(doc, password);
}

/**
 * Fetches the identity’s auth token.
 */
export function identity<T = unknown>(): Query<Ref<QueryResult<T>>> {
  return q.Identity();
}

// keyFromSecret defined in `read`

/**
 * Retrieves the keys associated with the specified database.
 */
export function keys<D = unknown>(): Collection<Key<QueryResult<D>>> {
  return q.Keys();
}

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
export function login<T = unknown>(identity: Arg<Ref<QueryResult<T>>>): <D = unknown>(params: Arg<LoginParams<D>>) => Query<LoginResult<D, T>>;
export function login<D = unknown, T = unknown>(identity: Arg<Ref<QueryResult<T>>>, params: Arg<LoginParams<D>>): Query<LoginResult<D, T>>;
export function login<D = unknown, T = unknown>(identity: Arg<Ref<QueryResult<T>>>, params?: Arg<LoginParams<D>>) {
  return q.Login(identity, params);
}

/**
 * Logs out of the current (or all) sessions.
 */
export function logout(allTokens: Arg<boolean>): Query<boolean> {
  return q.Logout(allTokens);
}

/**
 * Provides a reference to the internal tokens collection.
 */
export function tokens<D = unknown>(): Collection<Token<QueryResult<D>>> {
  return q.Tokens();
}
