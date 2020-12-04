import { Arg, Ref, Index, Collection, Query, FaunaFunction } from './types';
import { q } from './types.internal';

export function ref<T>(schema: Arg<Ref<Collection<T>>>): (id: Arg<string>) => Query<Ref<T>>;
export function ref<T>(schema: Arg<Ref<Collection<T>>>, id: Arg<string>): Query<Ref<T>>;
export function ref<T>(schema: Arg<Ref<Collection<T>>>, id?: Arg<string>) {
  if (id === undefined) return (id: Arg<string>) => ref(schema, id)
  return q.Ref(schema, id)
}

/**
 * The `Index` function returns a valid `Reference` for the specified index name in
 * the specified child database. If a child database is not specified, the
 * returned index reference belongs to the current database.
 */
export function index<Terms extends Arg<unknown>[] = [], O = unknown>(name: string): Query<Ref<Index<Terms, O>>> {
  return q.Index(name);
}


export function collection<T = unknown>(name: string): Query<Ref<Collection<T>>> {
  return q.Collection(name);
}

export function fun<I extends any[], O>(name: Arg<string>): Query<Ref<FaunaFunction<I, O>>> {
  return q.Function(name);
}
