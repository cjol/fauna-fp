import { Query, Arg } from './types';
import { q } from './types.internal';


export function add(as: Arg<number[]>): Query<number> {
    return q.Add(as);
}
