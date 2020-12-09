import { Arg, Query } from "../types";
import { q } from "../types.internal";

/**
 * Logs out of the current (or all) sessions.
 */

export function logout(allTokens: Arg<boolean>): Query<boolean> {
  return q.Logout(allTokens);
}
