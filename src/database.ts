import { Client } from 'faunadb';
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

export const fun = <I extends any[], O>(name: Arg<string>) =>
  q.Function(name) as FaunaFunction<I, O>;

export const doQuery = (client: Client) => <T>(x: Arg<T>) => {
  return client.query<Result<T>>(x);
};
