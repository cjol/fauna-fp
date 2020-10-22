import { Client } from 'faunadb';
import { I } from 'ts-toolbelt';
import {
  Schema,
  Database,
  Arg,
  Ref,
  q,
  Index,
  Collection,
  Query,
  Cursor,
  Page,
  Result,
  ArgTuple,
  FaunaFunction,
} from './types';

// TODO: curry better so you don't have to call two functions
export const ref = <T = unknown>(schema: Schema<T>) => (id: Arg<string>) =>
  q.Ref(schema, id) as Ref<T>;

/**
 * The `Index` function returns a valid `Reference` for the specified index name in
 * the specified child database. If a child database is not specified, the
 * returned index reference belongs to the current database.
 */
export const index: <T = unknown, O extends Arg[] = []>(
  name: string
) => Index<T, O> = (name) => q.Index(name);

export const collection: <T = unknown>(name: string) => Collection<T> = (
  name
) => q.Collection(name);

export const get: <T = unknown>(r: Arg<Ref<T>>) => Query<T> = (name) =>
  q.Get(name);

export const paginate = (
  opts: Arg<{ before?: Cursor; after?: Cursor; size?: number }> = {}
) => <T = unknown>(results: Arg<Ref<T>>): Query<Page<Result<T>>> =>
  q.Paginate(results, opts);

/**
 * The `Match` function finds the "search terms" provided to `Match` in the
 * requested index. The `search_terms` must be identical to the terms in the
 * index, including both the value of all terms and number of terms. If the
 * index is configured with no terms, then the `search_terms` argument should be
 * omitted. If the index is configured with multiple terms, then the "search
 * terms" should be an array of values.
 *
 * When calling `Match` through `Paginate`, the results are returned as an array of
 * pages. If no matching element is found an empty collection is returned.
 *
 * If `Match` only returns a single document, or only the first document is
 * needed, `Get` may be used to retrieve the document.
 */
export const match = <T, I extends any[]>(index: Index<T, I>) => (
  terms: ArgTuple<I>
) => q.Match(index, ...terms) as Query<Ref<Result<T>>>;
// FIXME: should return setRef? Does it matter

export const fun = <I extends any[], O>(name: Arg<string>) =>
  q.Function(name) as FaunaFunction<I, O>;

export const doQuery = (client: Client) => <T>(x: Arg<T>) => {
  return client.query<Result<T>>(x);
};
