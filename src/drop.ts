import { Query, Arg, Iter, IterPayload } from './types';
import { q } from './types.internal';


export function drop(num: Arg<number>): <I extends Iter<any>>(source: Arg<I>) => Query<I>;
export function drop<I extends Iter<any>>(num: Arg<number>, source: Arg<I>): Query<I>;
export function drop<I extends Iter<any>>(num: Arg<number>, source?: Arg<I>) {
    if (source !== undefined)
        return q.Drop(num, source);
    return (source: Arg<IterPayload<I>>) => drop(num, source);
}
