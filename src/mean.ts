import { Query, Arg, Iter } from './types';
import { q } from './types.internal';


export function mean<T extends Iter<number>>(values: Arg<T>): Query<number> {
    return q.Mean(values);
}
