import { Arg, Query } from './types';
import { q } from './types.internal';

/**
 * Creates a new string by repeating a string multiple times.
 */
export function repeat(n: Arg<number>): (x: Arg<string>) => Query<string>;
export function repeat(n: Arg<number>, x: Arg<string>): Query<string>;
export function repeat(n: Arg<number>, x?: Arg<string>) {
    if (x === undefined)
        return (x: Arg<string>) => repeat(n, x);
    return q.Repeat(x, n);
}
