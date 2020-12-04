import { Query, Arg, QueryResult } from './types';
import { q } from './types.internal';


export function distinct<T>(source: Arg<T[]>): Query<QueryResult<T>[]> {
    return q.Distinct(source);
}
