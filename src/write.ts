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
interface CreateParams<T> {
  data: T;
  credentials?: { password: string };
  ttl?: Timestamp;
}
interface CreateResult<T> {
  ref: Ref<QueryResult<T>>;
  data: QueryResult<T>;
  ts: Timestamp;
}
export function create<T = unknown>(
  collection: Arg<string | Ref<Collection<T>>>
): (params: Arg<CreateParams<T>>) => Query<CreateResult<T>>;
export function create<T = unknown>(
  collection: Arg<string | Ref<Collection<T>>>,
  params: Arg<CreateParams<T>>
): Query<CreateResult<T>>;
export function create<T = unknown>(
  collection: Arg<string | Ref<Collection<T>>>,
  params?: Arg<CreateParams<T>>
) {
  if (params === undefined)
    return (params: Arg<CreateParams<T>>) => create(collection, params);
  return q.Create(collection, params);
}

interface CreateCollectionParams<D = unknown> {
  name: string;
  history_days?: number;
  ttl_days?: number;
  data?: D;
}

interface CreateCollectionResult<T = unknown, D = unknown> {
  ref: Ref<Collection<T, QueryResult<D>>>;
  name: string;
  ts: Timestamp;
  history_days: number;
}

/**  Create a collection. */
export function createCollection<T = unknown, D = unknown>(
  params: Arg<CreateCollectionParams<D>>
): Query<CreateCollectionResult<T, D>> {
  return q.CreateCollection(params);
}

interface CreateDatabaseParams<T = unknown> {
  name: string;
  data?: T;
}

interface CreateDatabaseResult<T = unknown> {
  ref: Ref<Database<QueryResult<T>>>;
  name: string;
  data: QueryResult<T>;
  ts: Timestamp;
  global_id: string;
}

/**  Create a database. */
export function createDatabase<T = unknown>(
  params: Arg<CreateDatabaseParams<T>>
): Query<CreateDatabaseResult<T>> {
  return q.CreateDatabase(params);
}

interface CreateFunctionParams<D = unknown> {
  name: string;
  body: Query<unknown>;
  data?: D;
  role?: string | Role;
}

interface CreateFunctionResult<
  I extends unknown[] = unknown[],
  O = unknown,
  D = unknown
  > {
  ref: Ref<FaunaFunction<I, O, QueryResult<D>>>;
  name: string;
  role: string | Role;
  ts: Timestamp;
  // TODO: I don't yet have a runtime representation of Query objects
  body: unknown;
}

/**  Create a user-defined function. */
export function createFunction<
  I extends unknown[] = unknown[],
  O = unknown,
  D = unknown
>(params: Arg<CreateFunctionParams<D>>): Query<CreateFunctionResult<I, O, D>> {
  return q.CreateFunction(params);
}

/**  Create an index. */
export function createIndex<
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
): Query<{
  ref: Ref<FaunaFunction<I, O, QueryResult<D>>>;
  name: string;
  source: Ref<Collection<O>> | Array<SourceObject<O>>;
  active: boolean;
  partitions: number;
  ts: Timestamp;
}> {
  return q.CreateIndex(params);
}

// createKey defined in authentication

/** Create a user-defined role. */
export function createRole<T = unknown>(
  params: Arg<{
    name: string;
    privileges: Array<Privilege>;
    membership: Array<Membership>;
    data?: T;
  }>
): Query<{
  ref: Ref<Key<QueryResult<T>>>;
  ts: Timestamp;
  name: string;
  privileges: Array<Privilege>;
  membership: Array<Membership>;
}> {
  return q.CreateKey(params);
}

/**Remove a document, key, index, collection, or database. */
export function deleteItem<T>(
  ref: Arg<Ref<T>>
): Query<{
  ref: Ref<QueryResult<T>>;
  ts: Timestamp;
  data: QueryResult<T>;
}> {
  return q.Delete(ref);
}

type Action = 'create' | 'delete' | 'update';
interface InsertResult<T> {
  action: Action;
  ts: number;
  document: Ref<QueryResult<T>>;
  data: QueryResult<T>;
}

// TODO: curry
/** Add an event to a document’s history. */
export function insert<T>(
  ref: Arg<Ref<T>>,
  ts: Arg<Timestamp>,
  action: Arg<Action>,
  param_object: Arg<{
    data: T;
  }>
): Query<InsertResult<T>> {
  return q.Insert(ref, ts, action, param_object);
}

/** Remove an event from a document’s history. */
export function remove<T>(
  ref: Arg<Ref<T>>,
  ts: Arg<Timestamp>,
  action: Arg<Action>
  // TODO: the return value examples in the docs don't line up with the descriptions. I've used the example.
): Query<null> {
  return q.Remove(ref, ts, action);
}

/**Replace an document with a new document. */
interface ReplaceResult<T> {
  ref: Ref<QueryResult<T>>;
  data: QueryResult<T>;
  ts: number;
}
export function replace<T>(
  ref: Arg<Ref<T>>
): (params: Arg<{ data: T }>) => Query<ReplaceResult<T>>;
export function replace<T>(
  ref: Arg<Ref<T>>,
  params: Arg<{ data: T }>
): Query<ReplaceResult<T>>;
export function replace<T>(ref: Arg<Ref<T>>, params?: Arg<{ data: T }>) {
  if (params === undefined)
    return (params: Arg<{ data: T }>) => replace(ref, params);
  return q.Replace(ref, params);
}

/** Revise specific fields within a document. */
interface UpdateParams<T> {
  credentials?: {
    password: string;
  };
  data: Partial<T>;
}
interface UpdateResult<T> {
  ref: Ref<QueryResult<T>>;
  data: QueryResult<T>;
  ts: number;
}

export function update<T>(ref: Arg<Ref<T>>): (params: Arg<UpdateParams<T>>) => UpdateResult<T>;
export function update<T>(ref: Arg<Ref<T>>, params: Arg<UpdateParams<T>>): UpdateResult<T>;
export function update<T>(ref: Arg<Ref<T>>, params?: Arg<UpdateParams<T>>) {
  if (params === undefined) return (params: Arg<UpdateParams<T>>) => update(ref, params);
  return q.Replace(ref, params);
}
