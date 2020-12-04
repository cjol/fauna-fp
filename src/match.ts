import {
    Arg,
    ArgTuple,
    Index,
    Query,

    Ref
} from './types';
import { q } from './types.internal';

/**
 * The `Match` function finds the "search terms" provided to `Match` in the
 * requested index. The `search_terms` must be identical to the terms in the
 * index, including both the value of all terms and number of terms. If the
 * index is configured with no terms, then the `search_terms` argument should be
 * omitted. If the index is configured with multiple terms, then the "search
 * terms" should be an array of values.
 *
 * When calling `Match` through `Paginate`, the results are returned as an array of
 * pages. If no matching element is found an empty collection is returned.
 *
 * If `Match` only returns a single document, or only the first document is
 * needed, `Get` may be used to retrieve the document.
 */

export function match<I extends any[], T>(index: Arg<Ref<Index<I, T>>>): (terms: ArgTuple<I>) => Query<T>;
export function match<I extends any[], T>(index: Arg<Ref<Index<I, T>>>, terms: ArgTuple<I>): Query<T>;
export function match<I extends any[], T>(index: Arg<Ref<Index<I, T>>>, terms?: ArgTuple<I>) {
    if (terms === undefined)
        return (terms: ArgTuple<I>) => match(index, terms);
    return q.Match(index, ...terms);
}
