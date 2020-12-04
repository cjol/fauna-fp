import {
    Arg,
    Query,

    Ref,
    Timestamp,
    Collection,




    QueryResult
} from './types';
import { q } from './types.internal';

/**  Create a document in a collection. */

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
interface CreateParams<T> {
    data: T;
    credentials?: { password: string; };
    ttl?: Timestamp;
}
interface CreateResult<T> {
    ref: Ref<QueryResult<T>>;
    data: QueryResult<T>;
    ts: Timestamp;
}
