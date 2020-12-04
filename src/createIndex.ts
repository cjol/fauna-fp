import {
    Arg,
    Query,

    Ref,
    Timestamp,
    Collection,
    FaunaFunction,

    QueryResult,
    SourceObject
} from './types';
import { q } from './types.internal';

/**  Create an index. */

export function createIndex<
    I extends unknown[] = unknown[],
    O = unknown,
    D = unknown
>(
    params: Arg<{
        name: string;
        source: Arg<Ref<Collection<O>>> | Arg<Array<SourceObject<O>>>;
        terms?: Array<{ binding: string; } | { field: string[]; }>;
        values?: Array<
            { reverse?: boolean; } & ({ binding: string; } | { field: string[]; })
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
