import { Arg, Cursor, Match, Page, Query, QueryResult } from "../types";
import { q } from "../types.internal";

type ContentType<T> = T extends unknown[] ? T | Match<T, unknown> : T;

export function paginate<T>(
  opts: Arg<PaginationOpts>,
  results: Arg<ContentType<T>>
): Query<Page<QueryResult<T>>> {
  return q.Paginate(results, opts);
}

interface PaginationOpts {
  before?: Cursor;
  after?: Cursor;
  size?: number;
}
