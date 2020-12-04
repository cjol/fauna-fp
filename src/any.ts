import { Query, Arg } from './types';
import { q } from './types.internal';


export function any(x: Arg<Array<boolean>>): Query<boolean> {
    return q.Any(x);
}
