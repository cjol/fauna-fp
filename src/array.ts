import { Query, Arg, Page, q } from './types';

// TODO: handle both pages and arrays here

export const all = (x: Arg<boolean[]>): Query<boolean> => q.All(x);

export const any = (x: Arg<boolean[]>): Query<boolean> => q.Any(x);

export const append = <T>(x: Arg<T[]>) => (y: Arg<T[]>): Query<T[]> =>
  q.Append(x, y);

export const count = <T>(x: Arg<T[]>): Query<number> => q.Count(x);

export const difference = <T>(...diffs: Arg<T[]>[]) => (
  source: Arg<T[]>
): Query<T[]> => q.Difference(source, diffs);

export const distinct = <T>(source: Arg<T[]>): Query<T[]> => q.Distinct(source);

export const drop = <T>(num: Arg<number>) => (source: Arg<T[]>): Query<T[]> =>
  q.Drop(num, source);

export const take = <T>(num: Arg<number>) => (source: Arg<T[]>): Query<T[]> =>
  q.Take(num, source);

export const toObject = <T>(
  entries: Arg<[string, T]>
): Query<Record<string, T>> => q.ToObject(entries);

export const filter = <T>(f: (x: Query<T>) => Arg<boolean>) => (
  source: Arg<T[]>
): Query<T[]> => q.Filter(source, f);

export const foreach = <T>(f: (x: Query<T>) => Arg) => (
  source: Arg<T[]>
): Query<T[]> => q.Foreach(source, f);

export const intersection = <T>(...sources: Arg<T[]>[]): Query<T[]> =>
  q.Intersection(...sources);

export const union = <T>(...sources: Arg<T[]>[]): Query<T[]> =>
  q.Union(...sources);

export const isEmpty = <T>(sources: Arg<T[]>): Query<boolean> =>
  q.IsEmpty(sources);

export const isNonEmpty = <T>(sources: Arg<T[]>): Query<boolean> =>
  q.IsNonEmpty(sources);

export const map2: <I, O>(
  f: (x: Query<I>) => Arg<O>
) => (items: Arg<Page<I>>) => Query<Page<O>> = (f) => (items) =>
  q.Map(items, f);

export const max = (...values: Arg<number>[]): Query<number> =>
  q.Max(...values);

export const min = (...values: Arg<number>[]): Query<number> =>
  q.Min(...values);

export const mean = (...values: Arg<number>[]): Query<number> =>
  q.Mean(...values);

export const sum = (...values: Arg<number>[]): Query<number> =>
  q.Sum(...values);

export const prepend = <T>(x: Arg<T[]>) => (y: Arg<T[]>): Query<T[]> =>
  q.Prepend(x, y);

export const reduce = <T, O>(
  f: (curr: Query<O>, x: Query<T>) => Arg<O>,
  init: Arg<O>
) => (y: Arg<T[]>): Query<O> => q.Reduce(f, init, y);

export const reverse = <T>(x: Arg<T[]>): Query<T[]> => q.Reverse(x);
