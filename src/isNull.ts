import { Arg, Query } from './types';
import { q } from './types.internal';


export function isNull(arg: Arg<unknown>): Query<boolean> {
    return q.IsNull(arg);
}
