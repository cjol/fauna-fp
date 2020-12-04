import { Arg, Ref, Index, Collection, Query, FaunaFunction } from './types';
import { q } from './types.internal';

export const ref = <T>(schema: Arg<Ref<Collection<T>>>, id: Arg<string>) =>
  q.Ref(schema, id) as Query<Ref<T>>;

/**
 * The `Index` function returns a valid `Reference` for the specified index name in
 * the specified child database. If a child database is not specified, the
 * returned index reference belongs to the current database.
 */
export const index = <T = unknown, O extends Arg<unknown>[] = []>(
  name: string
) => q.Index(name) as Query<Ref<Index<T, O>>>;

export const collection = <T = unknown>(name: string) =>
  q.Collection(name) as Query<Ref<Collection<T>>>;

export const fun = <I extends any[], O>(name: Arg<string>) =>
  q.Function(name) as Query<Ref<FaunaFunction<I, O>>>;
