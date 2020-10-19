import { pipe } from 'fp-ts/lib/function';
import { Query, Arg, Page, q, Result, Callback } from './types';

// TODO: Prettier formatting doesn't look great here
// TODO: accept both pages and arrays for some of these methods

export const all = (x: Arg<boolean[]>) => q.All(x) as Query<boolean>;

export const any = (x: Arg<boolean[]>) => q.Any(x) as Query<boolean>;

export const append = <T>(x: Arg<T[]>) => (y: Arg<T[]>) =>
  q.Append(x, y) as Query<Result<T>[]>;

export const count = <T>(x: Arg<T[]>) => q.Count(x) as Query<number>;

export const difference = <T>(...diffs: Arg<T[]>[]) => (source: Arg<T[]>) =>
  q.Difference(source, diffs) as Query<Result<T>[]>;

export const distinct = <T>(source: Arg<T[]>) =>
  q.Distinct(source) as Query<Result<T>[]>;

export const drop = <T>(num: Arg<number>) => (source: Arg<T[]>) =>
  q.Drop(num, source) as Query<Result<T>[]>;

export const take = <T>(num: Arg<number>) => (source: Arg<T[]>) =>
  q.Take(num, source) as Query<Result<T>[]>;

// TODO: helper functions Head / Tail / Last

export const toObject = <T>(entries: Arg<[string, T]>) =>
  q.ToObject(entries) as Query<Record<string, Result<T>>>;

export const filter = <T>(f: Callback<[T], boolean>) => (source: Arg<T[]>) =>
  q.Filter(source, f) as Query<Result<T>[]>;

export const foreach = <T>(f: Callback<[T], unknown>) => (source: Arg<T[]>) =>
  q.Foreach(source, f) as Query<Result<T>[]>;

export const intersection = <T>(...sources: Arg<T[]>[]) =>
  q.Intersection(...sources) as Query<Result<T>[]>;

export const union = <T>(...sources: Arg<T[]>[]) =>
  q.Union(...sources) as Query<Result<T>[]>;

export const isEmpty = <T>(sources: Arg<T[]>) =>
  q.IsEmpty(sources) as Query<boolean>;

export const isNonEmpty = <T>(sources: Arg<T[]>) =>
  q.IsNonEmpty(sources) as Query<boolean>;

// TODO: do better to combine map and mapPage
export const map = <I, O>(f: Callback<[I], O>) => (items: Arg<Array<I>>) =>
  // N.B. we manually construct a lambda here to make it easier for fauna to parse
  q.Map(items, (item: Arg<I>) => f(item)) as Query<Array<Result<O>>>;

export const mapPage = <I, O>(f: Callback<[I], O>) => (items: Arg<Page<I>>) =>
  // N.B. we manually construct a lambda here to make it easier for fauna to parse
  q.Map(items, (item: Arg<I>) => f(item)) as Query<Page<Result<O>>>;

// TODO: allow individual values to be passed one-by-one
export const max = (values: Arg<number[]>) => q.Max(values) as Query<number>;

// TODO: allow individual values to be passed one-by-one
export const min = (values: Arg<number[]>) => q.Min(values) as Query<number>;

export const mean = (values: Arg<number[]>) => q.Mean(values) as Query<number>;

export const sum = (values: Arg<number[]>) => q.Sum(values) as Query<number>;

export const prepend = <T>(x: Arg<T[]>) => (y: Arg<T[]>) =>
  q.Prepend(x, y) as Query<Result<T>[]>;

export const reduce = <T, I>(f: Callback<[I, T], I>, init: Arg<I>) => (
  y: Arg<T[]>
) => q.Reduce(f, init, y) as Query<Result<I>>;

export const reverse = <T>(x: Arg<T[]>) => q.Reverse(x) as Query<T[]>;
