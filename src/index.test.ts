import { query as q } from 'faunadb';
import { map, mean, reduce } from './array';
import { length } from './string';
import { expectTypeOf } from 'expect-type';
import { Query } from './types';
import { pipe } from 'fp-ts/function';
import { equals, iff } from './control-flow';
import { select } from './object';
import { gte } from './number';

describe('misc', () => {
  const strArr = ['hello', 'world'];
  const boolArr = [true, true, false];
  const numArr = [42, 43, 45];

  // convoluted example: find the array with the longest average string length, and return the first string.
  // If it's 'HELLO' then return one thing, else return another (note different types are preserved)
  test('max avg string length', () => {
    const data = [strArr, strArr];
    const getLen = select('len');
    const result = pipe(
      data,
      map((x) => ({
        len: pipe(x, map(length), mean),
        arr: x,
      })),
      reduce(
        (curr, next) => pipe(gte(getLen(curr), getLen(next)), iff(curr, next)),
        { len: 0, arr: [] as string[] }
      ),
      select('arr', 0),
      equals('HELLO'),
      iff<Array<number | boolean>>(boolArr, numArr)
    );

    expectTypeOf(result).toEqualTypeOf<Query<Array<number | boolean>>>();

    expect(result).toEqual(
      q.If(
        q.Equals(
          'HELLO',
          q.Select(
            ['arr', 0],
            q.Reduce(
              (curr: any, next: any) =>
                q.If(
                  q.GTE(q.Select(['len'], curr), q.Select(['len'], next)),
                  curr,
                  next
                ),
              { len: 0, arr: [] as string[] },
              q.Map(data, (item) => ({
                arr: item,
                len: q.Mean(q.Map(item, (item) => q.Length(item))),
              }))
            )
          )
        ),
        boolArr,
        numArr
      )
    );
  });
});
