import { Arg, Callback, Index, Match, Query, Ref } from "../types";
import { q } from "../types.internal";

/**
 * Combines the items in a set with set’s indexed values.
 */
export function join<Pivot, RVals extends unknown[], RDoc>(
  source: Arg<Match<[Pivot]>>,
  detail: Arg<Ref<Index<[Pivot], RVals, RDoc>>>
): Query<Match<[RVals], RDoc>>;
export function join<Pivot extends unknown[], RValues extends unknown[], RDoc>(
  source: Arg<Match<Pivot>>,
  detail: Callback<Pivot, Match<RValues, RDoc>>
): Query<Match<RValues, RDoc>>;
export function join(source: unknown, detail: unknown) {
  return q.Join(source, detail);
}
