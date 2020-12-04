import {
    Arg,
    Query,

    Ref,
    Timestamp,

    Database,



    QueryResult
} from './types';
import { q } from './types.internal';

/**  Create a database. */

export function createDatabase<T = unknown>(
    params: Arg<CreateDatabaseParams<T>>
): Query<CreateDatabaseResult<T>> {
    return q.CreateDatabase(params);
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
