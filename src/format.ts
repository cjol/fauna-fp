import { Arg, Query } from './types';
import { q } from './types.internal';

/**
 * Formats arguments as a string according to a string of format specifiers.
 */
// TODO: consider using TS 4.1 template literal types to derive a correct type for the param array
export function format(fmt: Arg<string>): (x: Arg<Array<unknown>>) => Query<string>;
export function format(fmt: Arg<string>, x: Arg<Array<unknown>>): Query<string>;
export function format(fmt: Arg<string>, x?: Arg<Array<unknown>>) {
    if (x === undefined)
        return (x: Arg<Array<unknown>>) => format(fmt, x);
    return q.Format(fmt, x);
}
