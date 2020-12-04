import { Query, Arg, Iter } from './types';
import { q } from './types.internal';


export function isEmpty<T>(sources: Arg<Iter<T>>): Query<boolean> {
    return q.IsEmpty(sources);
}
