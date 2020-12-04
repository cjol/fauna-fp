import { Arg, Query, Ref } from './types';
import { q } from './types.internal';

/**
 * Returns true if all values are true. Does not handle collections, and short-circuits on false values. Also see `all`.
 */
export function and(...a: Arg<boolean>[]): Query<boolean> {
  return q.And(...a);
}

/**
 * Returns true when a specific field is found in a document.
 */
export function containsField(field: Arg<string>): (obj: Arg) => Query<boolean>;
export function containsField(field: Arg<string>, obj: Arg): Query<boolean>;
export function containsField(field: Arg<string>, obj?: Arg) {
  if (obj === undefined) return (obj: Arg) => containsField(field, obj);
  return q.ContainsField(field, obj);
}

/**
 * Returns true when a document contains a value at the specified path.
 */
export function containsPath(path: Arg<Array<string | number>>): (obj: Arg) => Query<boolean>;
export function containsPath(path: Arg<Array<string | number>>, obj: Arg): Query<boolean>;
export function containsPath(path: Arg<Array<string | number>>, obj?: Arg) {
  if (obj === undefined) return (obj: Arg) => containsPath(path, obj);
  return q.ContainsPath(path, obj);
}

/**
 * Returns true when a specific value is found in a document.
 */
export function containsValue(value: Arg): (obj: Arg) => Query<boolean>;
export function containsValue(value: Arg, obj: Arg): Query<boolean>;
export function containsValue(value: Arg, obj?: Arg) {
  if (obj === undefined) return (obj: Arg) => containsValue(value, obj);
  return q.ContainsValue(value, obj);
}

/**
 * Returns true of all values are equivalent.
 */
export function equals<O>(a: Arg<O>): (b: Arg<O>) => Query<boolean>;
export function equals<O>(a: Arg<O>, b: Arg<O>): Query<boolean>;
export function equals<O>(a: Arg<O>, b?: Arg<O>) {
  if (b !== undefined) return q.Equals(a, b);
  return (b: Arg<O>) => equals(a, b);
}

/**
 * Returns true if a document has an event at a specific time.
 */
export function exists<O>(ref: Arg<Ref<O>>): Query<boolean> {
  return q.Exists(ref);
}

/**
 * Returns true if each value is greater than all following values.
 */
export function gt<T>(as: Arg<T[]>): Query<boolean> {
  return q.GT(as);
}

/**
 * Returns true if each value is greater than, or equal to, all following values.
 */
export function gte<T>(as: Arg<T[]>): Query<boolean> {
  return q.GTE(as);
}

/**
 * Returns true if each value is less than all following values.
 */
export function lt<T>(as: Arg<T[]>): Query<boolean> {
  return q.LT(as);
}

/**
 * Returns true if each value is less than, or equal to, all following values.
 */
export function lte<T>(as: Arg<T[]>): Query<boolean> {
  return q.LTE(as);
}

/**
 * Returns the opposite of a boolean expression.
 */
export function not(b: Arg<boolean>): Query<boolean> {
  return q.Not(b);
}

/**
 * Returns true if any value is true.
 */
export function or(...a: Arg<boolean>[]): Query<boolean> {
  return q.Or(...a);
}
