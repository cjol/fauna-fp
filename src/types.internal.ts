import { query } from 'faunadb';
import { A } from 'ts-toolbelt';

// treat q as untyped because the builtin types aren't very helpful
export const q = query as Record<keyof typeof query, any>;

/* 
 * TODO: ideally I would prefer not to export `id` and `internal` but atm
  they're required for other files to construct e.g. `Arg<Page>`. I think
  that's because that will expand into Page<T> | Query<Page<T>> and TS can't
  get at `id` to construct the query.
*/
// create an opaque type to represent internal datatypes
export declare const id: unique symbol;
export declare const internal: unique symbol;
export type Type<Id extends A.Key, A extends any = unknown> = {
  [id]: Id;
  [internal]: A;
};
