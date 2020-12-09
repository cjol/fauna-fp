import { Arg, ArgTuple, Index, Match, Query, Ref } from "../types";
import { q } from "../types.internal";

// TODO:
/*

Paginating a Match returns the actual `values` type.
Geting a Match returns the underlying source object.

Need to encode both in the Index type, and again in the Match object

*/

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
export function match<I extends unknown[], V extends unknown[], T>(
  index: Arg<Ref<Index<I, V, T>>>,
  terms: ArgTuple<I>
): Query<Match<V, T>> {
  return q.Match(index, ...terms);
}
