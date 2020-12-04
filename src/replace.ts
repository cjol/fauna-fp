import {
  Arg,
  Query,

  Ref,
  QueryResult
} from './types';
import { q } from './types.internal';

/**Replace an document with a new document. */
interface ReplaceResult<T> {
  ref: Ref<QueryResult<T>>;
  data: QueryResult<T>;
  ts: number;
}
export function replace<T>(
  ref: Arg<Ref<T>>
): (params: Arg<{ data: T; }>) => Query<ReplaceResult<T>>;
export function replace<T>(
  ref: Arg<Ref<T>>,
  params: Arg<{ data: T; }>
): Query<ReplaceResult<T>>;
export function replace<T>(ref: Arg<Ref<T>>, params?: Arg<{ data: T; }>) {
  if (params === undefined)
    return (params: Arg<{ data: T; }>) => replace(ref, params);
  return q.Replace(ref, params);
}
