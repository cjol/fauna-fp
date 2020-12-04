import { Query, Arg, Callback, Iter, IterPayload } from './types';
import { q } from './types.internal';


export function filter<I extends Iter<any>>(f: Callback<[IterPayload<I>], boolean>): (source: Arg<I>) => Query<I>;
export function filter<T>(f: Callback<[T], boolean>): <I extends Iter<T>>(source: Arg<I>) => Query<I>;
export function filter<I extends Iter<any>>(f: Callback<[IterPayload<I>], boolean>, source: Arg<I>): Query<I>;
export function filter<I extends Iter<any>>(f: Callback<[IterPayload<I>], boolean>, source?: Arg<I>) {
    // manually create a callback so that fauna driver can parse the param name more easily
    if (source !== undefined)
        return q.Filter(source, (item: Query<IterPayload<I>>) => f(item));
    return (source: Arg<IterPayload<I>>) => filter(f, source);
}
