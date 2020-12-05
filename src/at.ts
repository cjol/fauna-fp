import { Arg, Query, QueryResult, Timestamp } from "./types";
import { q } from "./types.internal";

/**
 * Retrieves documents at or before a timestamp.
 *
 * The `At` function executes a temporal query, a query which examines the data
 * in the past. The `timestamp` parameter determines the data available for
 * viewing by creating a virtual snapshot of the data which was current at that
 * date and time. All reads from the associated `expression` is then executed on
 * that virtual snapshot. In contrast, all write operations must be executed at
 * the current time. Attempting a write operation at any other time produces an
 * error.
 *
 * @param timestamp The date and time of the virtual snapshot of the data
 * @param expression The FQL statement to be executed
 */

export function at(timestamp: Arg<Timestamp>): <T>(expression: Arg<T>) => Query<QueryResult<T>>;
export function at<T>(timestamp: Arg<Timestamp>, expression: Arg<T>): Query<QueryResult<T>>;
export function at<T>(timestamp: Arg<Timestamp>, expression?: Arg<T>) {
  if (expression === undefined) return (expression: Arg<T>) => at(timestamp, expression);
  return q.At(timestamp, expression);
}
