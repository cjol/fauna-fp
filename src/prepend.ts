import { Query, Arg, QueryResult } from './types';
import { q } from './types.internal';


export function prepend<T>(x: Arg<T[]>): (y: Arg<T[]>) => Query<QueryResult<T>[]>;
export function prepend<T>(x: Arg<T[]>, y: Arg<T[]>): Query<QueryResult<T>[]>;
export function prepend<T>(x: Arg<T[]>, y?: Arg<T[]>) {
    if (y !== undefined)
        return q.Prepend(x, y);
    return (y: Arg<T[]>) => prepend(x, y);
}
