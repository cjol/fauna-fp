import { query } from "faunadb";

// eslint-disable-next-line @typescript-eslint/ban-types
export const q = query as Record<keyof typeof query, Function>;

/* 
 * TODO: ideally I would prefer not to export `id` and `internal` but atm
  they're required for other files to construct e.g. `Arg<Page>`. I think
  that's because that will expand into Page<T> | Query<Page<T>> and TS can't
  get at `id` to construct the query.
*/
// create an opaque type to represent internal datatypes
export declare const id: unique symbol;
export declare const internal: unique symbol;
export type Type<Id extends string, A extends unknown = unknown> = {
  [id]: Id;
  [internal]: A;
};

export type CleanedType<T> = T extends Type<never> ? Omit<T, typeof id | typeof internal> : T;
