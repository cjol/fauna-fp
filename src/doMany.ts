import { Tuple } from 'ts-toolbelt';
import {
    ArgTuple,

    Query,
    QueryResult
} from './types';
import { q } from './types.internal';

/**
 * Executes expressions in order. Renamed from `q.Do`
 */

export function doMany<I extends any[]>(...entries: ArgTuple<I>): Query<Tuple.Last<QueryResult<I>>> {
    return q.Do(...entries);
}
