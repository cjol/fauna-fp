import { Query, Arg, Page, q, Result } from './types';

// TODO: Prettier formatting doesn't look great here
// TODO: accept both pages and arrays for some of these methods

export const all = (x: Arg<boolean[]>): Query<boolean> => q.All(x);

export const any = (x: Arg<boolean[]>): Query<boolean> => q.Any(x);

export const append = <T>(x: Arg<T[]>) => (y: Arg<T[]>): Query<Result<T>[]> =>
  q.Append(x, y);

export const count = <T>(x: Arg<T[]>): Query<number> => q.Count(x);

export const difference = <T>(...diffs: Arg<T[]>[]) => (
  source: Arg<T[]>
): Query<Result<T>[]> => q.Difference(source, diffs);

export const distinct = <T>(source: Arg<T[]>): Query<Result<T>[]> =>
  q.Distinct(source);

export const drop = <T>(num: Arg<number>) => (
  source: Arg<T[]>
): Query<Result<T>[]> => q.Drop(num, source);

export const take = <T>(num: Arg<number>) => (
  source: Arg<T[]>
): Query<Result<T>[]> => q.Take(num, source);

// TODO: helper functions Head / Tail / Last

export const toObject = <T>(
  entries: Arg<[string, T]>
): Query<Record<string, Result<T>>> => q.ToObject(entries);

export const filter = <T>(f: (x: Query<T>) => Arg<boolean>) => (
  source: Arg<T[]>
): Query<Result<T>[]> => q.Filter(source, f);

export const foreach = <T>(f: (x: Query<T>) => Arg) => (
  source: Arg<T[]>
): Query<Result<T>[]> => q.Foreach(source, f);

export const intersection = <T>(...sources: Arg<T[]>[]): Query<Result<T>[]> =>
  q.Intersection(...sources);

export const union = <T>(...sources: Arg<T[]>[]): Query<Result<T>[]> =>
  q.Union(...sources);

export const isEmpty = <T>(sources: Arg<T[]>): Query<boolean> =>
  q.IsEmpty(sources);

export const isNonEmpty = <T>(sources: Arg<T[]>): Query<boolean> =>
  q.IsNonEmpty(sources);

// TODO: do better to combine map and mapPage
export const map = <I, O>(f: (x: Query<Result<I>>) => Arg<O>) => (
  items: Arg<Array<I>>
): Query<Array<Result<O>>> =>
  // N.B. we manually construct a lambda here to make it easier for fauna to parse
  q.Map(items, (item: Query<Result<I>>) => f(item));

export const mapPage: <I, O>(
  f: (x: Query<Result<I>>) => Arg<O>
) => (items: Arg<Page<I>>) => Query<Page<O>> = (f) => (items) =>
  q.Map(items, f);

// TODO: allow individual values to be passed one-by-one
export const max = (values: Arg<number[]>): Query<number> => q.Max(values);

// TODO: allow individual values to be passed one-by-one
export const min = (values: Arg<number[]>): Query<number> => q.Min(values);

export const mean = (values: Arg<number[]>): Query<number> => q.Mean(values);

export const sum = (values: Arg<number[]>): Query<number> => q.Sum(values);

export const prepend = <T>(x: Arg<T[]>) => (y: Arg<T[]>): Query<Result<T>[]> =>
  q.Prepend(x, y);

export const reduce = <T, I>(
  f: (curr: Result<I>, x: Result<T>) => Query<Result<I>>,
  init: Arg<I>
) => (y: Arg<T[]>): Query<Result<I>> => q.Reduce(f, init, y);

export const reverse = <T>(x: Arg<T[]>): Query<T[]> => q.Reverse(x);
