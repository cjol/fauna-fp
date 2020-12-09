import { Arg, Query, Ref } from "../types";
import { q } from "../types.internal";

/**
 * Verifies an identity’s credentials.
 */

export function identify(doc: Arg<Ref<unknown>>, password: Arg<string>): Query<boolean> {
  return q.Identify(doc, password);
}
