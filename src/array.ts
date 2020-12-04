import { curry } from 'ramda';
import { Query, Arg, Page, Callback, Ref, QueryResult, MapIterable, Iter, IterPayload } from './types';
import { q } from './types.internal';

/**
 * Returns true if all values are true. Also see `and` for short-circuit evaluation
 */
export function all(b: Arg<Iter<boolean>>): Query<boolean> {
  return q.All(b);
}

export function any(x: Arg<Array<boolean>>): Query<boolean> {
  return q.Any(x);
}

export function append<T>(x: Arg<T[]>): (y: Arg<T[]>) => Query<QueryResult<T>[]>;
export function append<T>(x: Arg<T[]>, y: Arg<T[]>): Query<QueryResult<T>[]>;
export function append<T>(x: Arg<T[]>, y?: Arg<T[]>) {
  if (y !== undefined) return q.Append(x, y);
  return (y: Arg<T[]>) => append(x, y);
}

export function count<T>(x: Arg<Iter<unknown>>): Query<number> {
  return q.Count(x);
}

export function difference<T>(diffs: Arg<T[]>[]): (source: Arg<T[]>) => Query<QueryResult<T>[]>;
export function difference<T>(diffs: Arg<T[]>[], source: Arg<T[]>): Query<QueryResult<T>[]>;
export function difference<T>(diffs: Arg<T[]>[], source?: Arg<T[]>) {
  if (source !== undefined) return q.Difference(source, ...diffs)
  return (source: Arg<T[]>) => difference(diffs, source);
}

export function distinct<T>(source: Arg<T[]>): Query<QueryResult<T>[]> {
  return q.Distinct(source);
}

export function drop(num: Arg<number>): <I extends Iter<any>>(source: Arg<I>) => Query<I>;
export function drop<I extends Iter<any>>(num: Arg<number>, source: Arg<I>): Query<I>;
export function drop<I extends Iter<any>>(num: Arg<number>, source?: Arg<I>) {
  if (source !== undefined) return q.Drop(num, source);
  return (source: Arg<IterPayload<I>>) => drop(num, source);
}

export function take(num: Arg<number>): <I extends Iter<any>>(source: Arg<I>) => Query<I>;
export function take<I extends Iter<any>>(num: Arg<number>, source: Arg<I>): Query<I>;
export function take<I extends Iter<any>>(num: Arg<number>, source?: Arg<I>) {
  if (source !== undefined) return q.Take(num, source);
  return (source: Arg<IterPayload<I>>) => take(num, source);
}

export function toObject<T>(entries: Arg<[string, T][]>): Query<Record<string, QueryResult<T>>> {
  return q.ToObject(entries);
}

export function filter<I extends Iter<any>>(f: Callback<[IterPayload<I>], boolean>): (source: Arg<I>) => Query<I>;
export function filter<T>(f: Callback<[T], boolean>): <I extends Iter<T>>(source: Arg<I>) => Query<I>;
export function filter<I extends Iter<any>>(f: Callback<[IterPayload<I>], boolean>, source: Arg<I>): Query<I>;
export function filter<I extends Iter<any>>(f: Callback<[IterPayload<I>], boolean>, source?: Arg<I>) {
  // manually create a callback so that fauna driver can parse the param name more easily
  if (source !== undefined) return q.Filter(source, (item: Query<IterPayload<I>>) => f(item));
  return (source: Arg<IterPayload<I>>) => filter(f, source);
}

// export function foreach<P>(f: Callback<[P], any>): <T extends Iter<P>>(source: Arg<T>) => Query<T>;
// export function foreach<T extends Iter<any>>(f: Callback<[IterPayload<T>], any>, source: Arg<T>): Query<T>;
// export function foreach<T extends Iter<any>>(f: Callback<[IterPayload<T>], any>, source?: Arg<T>) {
//   // manually create a callback so that fauna driver can parse the param name more easily
//   if (source) return q.Foreach(source, (item: Query<IterPayload<T>>) => f(item));
//   return (source: Arg<T>) => foreach(f, source);
// }

export function foreach<I extends Iter<any>>(f: Callback<[IterPayload<I>], any>): (source: Arg<I>) => Query<I>;
export function foreach<T>(f: Callback<[T], any>): <I extends Iter<T>>(source: Arg<I>) => Query<I>;
export function foreach<I extends Iter<any>>(f: Callback<[IterPayload<I>], any>, source: Arg<I>): Query<I>;
export function foreach<I extends Iter<any>>(f: Callback<[IterPayload<I>], any>, source?: Arg<I>) {
  // manually create a callback so that fauna driver can parse the param name more easily
  if (source !== undefined) return q.Foreach(source, (item: Query<IterPayload<I>>) => f(item));
  return (source: Arg<IterPayload<I>>) => foreach(f, source);
}

export function intersection<T>(...xs: Arg<T[]>[]): Query<QueryResult<T>[]> {
  return q.Intersection(...xs);
}

export function union<T>(...xs: Arg<T[]>[]): Query<QueryResult<T>[]> {
  return q.Union(...xs);
}

export function isEmpty<T>(sources: Arg<Iter<T>>): Query<boolean> {
  return q.IsEmpty(sources);
}

export function isNonEmpty<T>(sources: Arg<Iter<T>>): Query<boolean> {
  return q.IsNonEmpty(sources);
}

export function map<I extends Iter<any>, O>(f: Callback<[IterPayload<I>], O>): (source: Arg<I>) => Query<MapIterable<I, QueryResult<O>>>;
export function map<T, O>(f: Callback<[T], O>): <I extends Iter<T>>(source: Arg<I>) => Query<MapIterable<I, QueryResult<O>>>;
export function map<I extends Iter<any>, O>(f: Callback<[IterPayload<I>], O>, source: Arg<I>): Query<MapIterable<I, QueryResult<O>>>;
export function map<I extends Iter<any>, O>(f: Callback<[IterPayload<I>], O>, source?: Arg<I>) {
  // manually create a callback so that fauna driver can parse the param name more easily
  if (source !== undefined) return q.Map(source, (item: Query<IterPayload<I>>) => f(item));
  return (source: Arg<IterPayload<I>>) => map(f, source);
}

// TODO: allow individual values to be passed one-by-one for pointfree use
export function max(values: Arg<Iter<number>>): Query<number> {
  return q.Max(values);
}

// TODO: allow individual values to be passed one-by-one for pointfree use
export function min(values: Arg<Iter<number>>): Query<number> {
  return q.Min(values);
}

export function mean<T extends Iter<number>>(values: Arg<T>): Query<number> {
  return q.Mean(values);
}

export function sum(values: Arg<Iter<number>>): Query<number> {
  return q.Sum(values);
}

export function prepend<T>(x: Arg<T[]>): (y: Arg<T[]>) => Query<QueryResult<T>[]>;
export function prepend<T>(x: Arg<T[]>, y: Arg<T[]>): Query<QueryResult<T>[]>;
export function prepend<T>(x: Arg<T[]>, y?: Arg<T[]>) {
  if (y !== undefined) return q.Prepend(x, y);
  return (y: Arg<T[]>) => prepend(x, y);
}

export function reduce<T, A>(f: Callback<[A, T], A>)
  : ((init: Arg<A>, source: Arg<Iter<T>>) => Query<QueryResult<A>>)
  & ((init: Arg<A>) => (source: Arg<Iter<T>>) => Query<QueryResult<A>>)
export function reduce<T, A>(f: Callback<[A, T], A>, init: Arg<A>): (source: Arg<Iter<T>>) => Query<QueryResult<A>>
export function reduce<T, A>(f: Callback<[A, T], A>, init: Arg<A>, source: Arg<Iter<T>>): Query<QueryResult<A>>
export function reduce<T, A>(f: Callback<[A, T], A>, init?: Arg<A>, source?: Arg<Iter<T>>) {
  // manually create a callback so that fauna driver can parse the param name more easily
  if (init !== undefined) {
    if (source !== undefined) {
      return q.Reduce((curr: Query<A>, next: Query<T>) => f(curr, next), init, source);
    }
    return (source: Arg<Iter<T>>) => reduce(f, init, source);
  }
  return curry((init: Arg<A>, source: Arg<Iter<T>>) => reduce(f, init, source));
}

export function reverse<T extends Iter<any>>(x: Arg<T>) {
  return q.Reverse(x) as Query<T>;
}
