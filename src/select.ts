import { O, A } from 'ts-toolbelt';
import { Arg, Query, QueryResult } from './types';
import { q } from './types.internal';


export function select<P extends Array<A.Key>>(...path: P): <T extends O.P.Record<P, any>>(item: Arg<T>) => Query<QueryResult<O.Path<T, P>>>;
export function select<T extends object, P extends Array<A.Key>>(item: Arg<T>, ...path: P): Query<QueryResult<O.Path<T, P>>>;
export function select(item?: any, ...path: (string | number)[]) {
    if (typeof item === 'string' || typeof item === 'number') {
        const fullPath = [item].concat(path);
        return (item: object) => q.Select(fullPath, item);
    }
    return q.Select(path, item);
}
