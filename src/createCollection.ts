import {
    Arg,
    Query,

    Ref,
    Timestamp,
    Collection,




    QueryResult
} from './types';
import { q } from './types.internal';

/**  Create a collection. */

export function createCollection<T = unknown, D = unknown>(
    params: Arg<CreateCollectionParams<D>>
): Query<CreateCollectionResult<T, D>> {
    return q.CreateCollection(params);
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
