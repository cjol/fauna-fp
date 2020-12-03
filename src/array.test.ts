import { query as q } from 'faunadb';
import {
  any,
  append,
  count,
  difference,
  distinct,
  drop,
  filter,
  foreach,
  intersection,
  isEmpty,
  isNonEmpty,
  map,
  max,
  min,
  prepend,
  reduce,
  reverse,
  sum,
  take,
  toObject,
  union,
  all,
} from './array';
import { length } from './string';
import { expectTypeOf } from 'expect-type';
import { Query } from './types';
import { pipe } from 'fp-ts/function';
import { equals } from './logic';
import { add } from './number';

describe('array', () => {
  const strArr = ['hello', 'world'];
  const boolArr = [true, true, false];
  const numArr = [42, 43, 45];

  test('all', () => {
    const result = all(boolArr);
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.All(boolArr));
    // @ts-expect-error
    all(strArr), all(true);
  });

  test('any', () => {
    const result = any(boolArr);
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.Any(boolArr));
    // @ts-expect-error
    any(strArr), any(true);
  });

  test('append', () => {
    const result = append([1, 2, 3], numArr);
    expectTypeOf(result).toEqualTypeOf<Query<number[]>>();
    expect(result).toEqual(q.Append([1, 2, 3], numArr));
    // @ts-expect-error
    append(numArr, strArr);
    // @ts-expect-error
    append(12, 4);
  });

  test('count', () => {
    const result = count(strArr);
    expectTypeOf(result).toEqualTypeOf<Query<number>>();
    expect(result).toEqual(q.Count(strArr));
    // @ts-expect-error
    pipe('hello', count);
  });

  test('difference', () => {
    const result = difference(
      [
        [1, 2, 3],
        [4, 5, 6],
      ],
      numArr
    );
    expectTypeOf(result).toEqualTypeOf<Query<number[]>>();
    expect(result).toEqual(q.Difference(numArr, [1, 2, 3], [4, 5, 6]));
  });

  test('distinct', () => {
    const result = distinct(strArr);
    expectTypeOf(result).toEqualTypeOf<Query<string[]>>();
    expect(result).toEqual(q.Distinct(strArr));
  });

  test('drop', () => {
    const result = drop(5, strArr);
    expectTypeOf(result).toEqualTypeOf<Query<string[]>>();
    expect(result).toEqual(q.Drop(5, strArr));
  });

  test('take', () => {
    const result = take(5, strArr);
    expectTypeOf(result).toEqualTypeOf<Query<string[]>>();
    expect(result).toEqual(q.Take(5, strArr));
  });

  test('toObject', () => {
    const data: [string, string][] = [
      ['foo', 'bar'],
      ['fop', 'bap'],
    ];
    const result = toObject(data);
    expectTypeOf(result).toEqualTypeOf<Query<Record<string, string>>>();
    expect(result).toEqual(q.ToObject(data));
  });

  test('filter', () => {
    const result = filter((b) => equals('hello', b), strArr);
    expectTypeOf(result).toEqualTypeOf<Query<string[]>>();
    expect(result).toEqual(q.Filter(strArr, (b) => q.Equals('hello', b)));
  });

  test('foreach', () => {
    const result = foreach(length, strArr);
    expectTypeOf(result).toEqualTypeOf<Query<string[]>>();
    expect(result).toEqual(q.Foreach(strArr, (item) => q.Length(item)));
  });

  test('intersection', () => {
    const result = intersection([1, 2, 3], [4, 5, 6], numArr);
    expectTypeOf(result).toEqualTypeOf<Query<number[]>>();
    expect(result).toEqual(q.Intersection([1, 2, 3], [4, 5, 6], numArr));
  });

  test('union', () => {
    const result = union([1, 2, 3], [4, 5, 6], numArr);
    expectTypeOf(result).toEqualTypeOf<Query<number[]>>();
    expect(result).toEqual(q.Union([1, 2, 3], [4, 5, 6], numArr));
  });

  test('isEmpty', () => {
    const result = isEmpty(boolArr);
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.IsEmpty(boolArr));
  });

  test('isNonEmpty', () => {
    const result = isNonEmpty(boolArr);
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.IsNonEmpty(boolArr));
  });

  test('map', () => {
    const data = strArr;
    const result = map(length, data);
    expectTypeOf(result).toEqualTypeOf<Query<number[]>>();
    expect(result).toEqual(q.Map(data, (item) => q.Length(item)));
  });

  test('mapPage', () => {});

  test('max', () => {
    const result = max(numArr);
    expectTypeOf(result).toEqualTypeOf<Query<number>>();
    expect(result).toEqual(q.Max(numArr));
    // @ts-expect-error
    max(strArr);
  });

  test('min', () => {
    const result = min(numArr);
    expectTypeOf(result).toEqualTypeOf<Query<number>>();
    expect(result).toEqual(q.Min(numArr));
    // @ts-expect-error
    min(strArr);
  });

  test('sum', () => {
    const result = sum(numArr);
    expectTypeOf(result).toEqualTypeOf<Query<number>>();
    expect(result).toEqual(q.Sum(numArr));
    // @ts-expect-error
    sum(strArr);
  });

  test('prepend', () => {
    const result = prepend([1, 2, 3], numArr);
    expectTypeOf(result).toEqualTypeOf<Query<number[]>>();
    expect(result).toEqual(q.Prepend([1, 2, 3], numArr));
  });

  test('reduce', () => {
    const result = reduce((x, y) => add([x, y]), 0, numArr);
    expectTypeOf(result).toEqualTypeOf<Query<number>>();
    expect(result).toEqual(
      q.Reduce((curr: any, next: any) => q.Add(curr, next), 0, numArr)
    );
  });

  test('reverse', () => {
    const result = reverse(strArr);
    expectTypeOf(result).toEqualTypeOf<Query<string[]>>();
    expect(result).toEqual(q.Reverse(strArr));
  });
});
