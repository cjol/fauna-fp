import {
  Arg,
  Query,
  Document,
  Ref,
  Timestamp,
  Collection,
  Database,
  Role,
  FaunaFunction,
  Key,
  QueryResult,
  SourceObject,
  Membership,
  Privilege,
} from './types';
import { q } from './types.internal';

/**  Create a document in a collection. */
export const create = <T = unknown>(
  collection: Arg<string | Ref<Collection<T>>>,
  params: Arg<{
    data: T;
    credentials?: { password: string };
    ttl?: Timestamp;
  }>
) =>
  q.Create(collection, params) as Query<{
    ref: Ref<QueryResult<T>>;
    data: QueryResult<T>;
    ts: Timestamp;
  }>;

/**  Create a collection. */
export const createCollection = <T = unknown, D = unknown>(
  params: Arg<{
    name: string;
    history_days?: number;
    ttl_days?: number;
    data?: D;
  }>
) =>
  q.CreateCollection(params) as Query<{
    ref: Ref<Collection<T, QueryResult<D>>>;
    name: string;
    ts: Timestamp;
    history_days: number;
  }>;

/**  Create a database. */
export const createDatabase = <T = unknown>(
  params: Arg<{
    name: string;
    data?: T;
  }>
) =>
  q.CreateDatabase(params) as Query<{
    ref: Ref<Database<QueryResult<T>>>;
    name: string;
    data: QueryResult<T>;
    ts: Timestamp;
    global_id: string;
  }>;

/**  Create a user-defined function. */
export const createFunction = <
  I extends unknown[] = unknown[],
  O = unknown,
  D = unknown
>(
  params: Arg<{
    name: string;
    body: Query<unknown>;
    data?: D;
    role?: string | Role;
  }>
) =>
  q.CreateFunction(params) as Query<{
    ref: Ref<FaunaFunction<I, O, QueryResult<D>>>;
    name: string;
    role: string | Role;
    ts: Timestamp;
    // TODO: I don't yet have a runtime representation of Query objects
    body: unknown;
  }>;
/**  Create an index. */
export const createIndex = <
  I extends unknown[] = unknown[],
  O = unknown,
  D = unknown
>(
  params: Arg<{
    name: string;
    source: Arg<Ref<Collection<O>>> | Arg<Array<SourceObject<O>>>;
    terms?: Array<{ binding: string } | { field: string[] }>;
    values?: Array<
      { reverse?: boolean } & ({ binding: string } | { field: string[] })
    >;
    unique?: boolean;
    serialized?: boolean;
    data?: D;
  }>
) =>
  q.CreateIndex(params) as Query<{
    ref: Ref<FaunaFunction<I, O, QueryResult<D>>>;
    name: string;
    source: Ref<Collection<O>> | Array<SourceObject<O>>;
    active: boolean;
    partitions: number;
    ts: Timestamp;
  }>;

// createKey defined in authentication

/** Create a user-defined role. */
export const createRole = <T = unknown>(
  params: Arg<{
    name: string;
    privileges: Array<Privilege>;
    membership: Array<Membership>;
    data?: T;
  }>
) =>
  q.CreateKey(params) as Query<{
    ref: Ref<Key<QueryResult<T>>>;
    ts: Timestamp;
    name: string;
    privileges: Array<Privilege>;
    membership: Array<Membership>;
  }>;

/**Remove a document, key, index, collection, or database. */
export const deleteItem = <T>(ref: Arg<Ref<T>>) =>
  q.Delete(ref) as Query<{
    ref: Ref<QueryResult<T>>;
    ts: Timestamp;
    data: QueryResult<T>;
  }>;

type Action = 'create' | 'delete' | 'update';
/** Add an event to a document’s history. */
export const insert = <T>(
  ref: Arg<Ref<T>>,
  ts: Arg<Timestamp>,
  action: Arg<Action>,
  param_object: Arg<{
    data: T;
  }>
) =>
  q.Insert(ref, ts, action, param_object) as Query<{
    action: Action;
    ts: number;
    document: Ref<QueryResult<T>>;
    data: QueryResult<T>;
  }>;

/** Remove an event from a document’s history. */
export const remove = <T>(
  ref: Arg<Ref<T>>,
  ts: Arg<Timestamp>,
  action: Arg<Action>
) =>
  // TODO: the return value examples in the docs don't line up with the descriptions. I've used the example.
  q.Remove(ref, ts, action) as Query<null>;

/**Replace an document with a new document. */
export const replace = <T>(
  ref: Arg<Ref<T>>,
  params: Arg<{
    data: T;
  }>
) =>
  q.Replace(ref, params) as Query<{
    ref: Ref<QueryResult<T>>;
    data: QueryResult<T>;
    ts: number;
  }>;

/** Revise specific fields within a document. */
export const update = <T>(
  ref: Arg<Ref<T>>,
  params: Arg<{
    credentials?: { password: string };
    data: Partial<T>;
  }>
) =>
  q.Replace(ref, params) as Query<{
    ref: Ref<QueryResult<T>>;
    data: QueryResult<T>;
    ts: number;
  }>;
