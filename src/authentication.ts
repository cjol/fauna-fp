import {
  Arg,
  Collection,
  Credentials,
  Cursor,
  Database,
  Key,
  Page,
  q,
  Query,
  Ref,
  Role,
  Timestamp,
  Token,
} from './types';

/**
 * Create a key.
 */
export const createKey = <D>(
  params: Arg<{
    role: string | Ref<Role> | Array<Ref<Role>>;
    name?: string;
    data?: D;
    database?: Ref<Database>;
  }>
) =>
  q.CreateKey(params) as Query<{
    ref: Ref<Key<D>>;
    database: Ref<Database>;
    role: string;
    name?: string;
    ts: number;
    secret: string;
    hashed_secret: string;
  }>;

/**
 * Provides a reference to the internal credentials collection.
 */
export const credentials = <I = unknown, D = unknown>() =>
  q.Credentials() as Collection<Credentials<I, D>>;

/**
 * Checks whether the current client has credentials.
 */
export const hasIdentity = () => q.HasIdentity() as Query<boolean>;

/**
 * Verifies an identity’s credentials.
 */

export const identify = (doc: Arg<Ref<any>>, password: Arg<string>) =>
  q.Identify(doc, password) as Query<boolean>;

/**
 * Fetches the identity’s auth token.
 */
export const identity = <T = unknown>() => q.Identity() as Query<Ref<T>>;

// keyFromSecret defined in `read`

/**
 * Retrieves the keys associated with the specified database.
 */
export const keys = <D = unknown>() => q.Keys() as Collection<Key<D>>;

/**
 * Creates an auth token for an identity.
 */
export const login = <D = unknown, T = unknown>(
  identity: Arg<Ref<T>>,
  params: Arg<{
    password: string;
    data?: D;
    ttl?: Timestamp;
  }>
) =>
  q.Login(identity, params) as Query<{
    ref: Ref<Token<D>>;
    ts: number;
    instance: Ref<T>;
    secret: string;
  }>;

/**
 * Logs out of the current (or all) sessions.
 */
export const logout = (all_tokens: Arg<boolean>) =>
  q.Logout(all_tokens) as Query<boolean>;

/**
 * Provides a reference to the internal tokens collection.
 */
export const otkens = <D = unknown>() => q.Tokens() as Collection<Token<D>>;
