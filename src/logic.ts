import { Arg, q, Query, Ref } from "./types";

/**
 * Returns true if all values are true. Does not handle collections, and short-circuits on false values. Also see `all`.
 */
export const and = (...a: Arg<boolean>[]) => q.And(...a) as Query<boolean>;

/**
 * Returns true when a specific field is found in a document.
 */
export const containsField = (field: Arg<string>, obj: Arg) =>
  q.ContainsField(field, obj) as Query<boolean>;

/**
 * Returns true when a document contains a value at the specified path.
 */
export const containsPath = (path: Arg<Array<string | number>>, obj: Arg) =>
  q.ContainsPath(path, obj) as Query<boolean>;

/**
 * Returns true when a specific value is found in a document.
 */
export const containsValue = (value: Arg, obj: Arg) =>
  q.ContainsValue(value, obj) as Query<boolean>;

/**
 * Returns true of all values are equivalent.
 */
export const equals = <O>(a: Arg<O>, b: Arg<O>) =>
  q.Equals(a, b) as Query<boolean>;

/**
 * Returns true if a document has an event at a specific time.
 */
export const exists = <O>(ref: Arg<Ref<O>>) => q.Exists(ref) as Query<boolean>;

/**
 * Returns true if each value is greater than all following values.
 */
export const gt = <T>(as: Arg<T[]>) => q.GT(as) as Query<boolean>;

/**
 * Returns true if each value is greater than, or equal to, all following values.
 */
export const gte = <T>(as: Arg<T[]>) => q.GTE(as) as Query<boolean>;

/**
 * Returns true if each value is less than all following values.
 */
export const lt = <T>(as: Arg<T[]>) => q.LT(as) as Query<boolean>;

/**
 * Returns true if each value is less than, or equal to, all following values.
 */
export const lte = <T>(as: Arg<T[]>) => q.LTE(as) as Query<boolean>;

/**
 * Returns the opposite of a boolean expression.
 */
export const not = (b: Arg<boolean>) => q.Not(b) as Query<boolean>;

/**
 * Returns true if any value is true.
 */
export const or = (...a: Arg<boolean>[]) => q.Or(...a) as Query<boolean>;
