import { query as q } from 'faunadb';
import { all, any, append, map } from './array';
import { length } from './string';
import { expectTypeOf } from 'expect-type';
import { Query } from './types';
import { pipe } from 'fp-ts/function';

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
    const result = pipe(numArr, append([1, 2, 3]));
    expectTypeOf(result).toEqualTypeOf<Query<number[]>>();
    expect(result).toEqual(q.Append([1, 2, 3], numArr));
    // @ts-expect-error
    pipe(strArr, append(numArr));
    // @ts-expect-error
    pipe(4, append(12));
  });

  test('map', () => {
    const data = strArr;
    const result = pipe(data, map(length));
    expectTypeOf(result).toEqualTypeOf<Query<number[]>>();
    expect(result).toEqual(q.Map(data, (item) => q.Length(item)));
  });
});
