import {
  Arg,
  Query,
  q,
  Ref,
  Timestamp,
  Collection,
  Database,
  Role,
  FaunaFunction,
  Key,
} from './types';

/**  Create a document in a collection. */
export const create = <T = unknown>(
  collection: Arg<string | Ref<Collection<T>>>,
  params: Arg<{
    data: T;
    ttl?: Timestamp;
  }>
) =>
  q.Create(collection, params) as Query<{
    ref: Ref<T>;
    data: T;
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
    ref: Ref<Collection<T, D>>;
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
    ref: Ref<Database<T>>;
    name: string;
    data: T;
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
    ref: Ref<FaunaFunction<I, O, D>>;
    name: string;
    role: string | Role;
    ts: Timestamp;
    // TODO: I don't yet have a runtime representation of Query objects
    body: unknown;
  }>;
interface Document<T> {
  ref: Ref<T>;
  data: T;
}

interface SourceObject<O> {
  collection: Ref<Collection<O>> | '_';
  fields: Record<string, (document: Document<O>) => Query<unknown>>;
}

/**  Create an index. */
export const createIndex = <
  I extends unknown[] = unknown[],
  O = unknown,
  D = unknown
>(
  params: Arg<{
    name: string;
    source: Ref<Collection<O>> | Array<SourceObject<O>>;
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
    ref: Ref<FaunaFunction<I, O, D>>;
    name: string;
    source: unknown[];
    active: boolean;
    partitions: number;
    ts: Timestamp;
  }>;

// createKey defined in authentication
interface Privilege {
  resource: Ref;
  actions: {
    create?: boolean | ((x: unknown) => boolean);
    delete?: boolean | ((x: Ref) => boolean);
    read?: boolean | ((x: Ref | unknown[]) => boolean);
    write?: boolean | ((oldDoc: unknown, newDoc: unknown, ref: Ref) => boolean);
    history_read?: boolean | ((x: Ref) => boolean);
    history_write?:
      | boolean
      | ((ref: Ref, ts: Timestamp, action: string, newDoc: unknown) => boolean);
    unrestricted_read?: boolean | ((terms: unknown[]) => boolean);
    call?: boolean | ((args: unknown[]) => boolean);
  };
}
interface Membership {
  resource: Ref;
  predicate?: (ref: Ref) => boolean;
}

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
    ref: Ref<Key<T>>;
    ts: Timestamp;
    name: string;
    privileges: Array<Privilege>;
    membership: Array<Membership>;
  }>;

/**Remove a document, key, index, collection, or database. */
export const deleted = <T>(ref: Arg<Ref<T>>) =>
  q.Delete(ref) as Query<{
    ref: Ref<T>;
    ts: Timestamp;
    data: T;
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
    document: Ref;
    data: T;
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
    ref: Ref<T>;
    data: T;
    ts: number;
  }>;

/** Revise specific fields within a document. */
export const update = <T>(
  ref: Arg<Ref<T>>,
  params: Arg<{
    data: Partial<T>;
  }>
) =>
  q.Replace(ref, params) as Query<{
    ref: Ref<T>;
    data: T;
    ts: number;
  }>;
