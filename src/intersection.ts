import { Query, Arg, QueryResult } from './types';
import { q } from './types.internal';


export function intersection<T>(...xs: Arg<T[]>[]): Query<QueryResult<T>[]> {
    return q.Intersection(...xs);
}
