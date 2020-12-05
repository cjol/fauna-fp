import { Collection, Query, QueryResult, Token } from "./types";
import { q } from "./types.internal";

/**
 * Provides a reference to the internal tokens collection.
 */

export function tokens<D = unknown>(): Query<Collection<Token<QueryResult<D>>>> {
  return q.Tokens();
}
