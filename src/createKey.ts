import {
    Arg,


    Database,
    Key,
    Query,
    QueryResult,
    Ref,
    Role
} from './types';
import { q } from './types.internal';

/**
 * Create a key.
 */

export function createKey<D>(params: Arg<{
    role: string | Ref<Role> | Array<Ref<Role>>;
    name?: string;
    data?: D;
    database?: Ref<Database>;
}>) {
    return q.CreateKey(params) as Query<{
        ref: Ref<Key<QueryResult<D>>>;
        database: Ref<Database>;
        role: string;
        name?: string;
        ts: number;
        secret: string;
        hashed_secret: string;
    }>;
}
