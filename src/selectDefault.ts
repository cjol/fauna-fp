import { O, A } from 'ts-toolbelt';
import { Arg, Query, QueryResult } from './types';
import { q } from './types.internal';


export function selectDefault<U, P extends Array<A.Key>>(fallback: Arg<U>, ...path: P) {
    return function <T extends O.P.Record<P, any>>(item: Arg<T>): Query<QueryResult<U | O.Path<T, P>>> {
        return q.Select(path, item, fallback);
    };
}
