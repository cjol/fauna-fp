import { Query, Arg, Iter } from './types';
import { q } from './types.internal';


export function count<T>(x: Arg<Iter<unknown>>): Query<number> {
    return q.Count(x);
}
