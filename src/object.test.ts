import { query as q } from 'faunadb';
import { expectTypeOf } from 'expect-type';
import { merge, select, toArray } from './object';
import { Query } from './types';
import { pipe } from 'fp-ts/lib/function';

describe('object', () => {
  test('select', () => {
    const data = { foo: { bar: true } };
    const selectFooBar = select('foo', 'bar');
    const result = selectFooBar(data);
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.Select(['foo', 'bar'], data));
  });

  test('merge', () => {
    const data = merge(
      { foo: true },
      { bar: false },
      (key, aVal, bVal) => aVal
    );
    expectTypeOf(data).toEqualTypeOf<Query<{ foo: boolean; bar: boolean }>>();
    expect(data).toEqual(
      q.Merge(
        { foo: true },
        { bar: false },
        q.Lambda(['key', 'aVal', 'bVal'], q.Var('aVal'))
      )
    );
  });

  test('toArray', () => {
    const arr = toArray({ foo: true, bar: 'hello' });
    expectTypeOf(arr).toEqualTypeOf<
      Query<Array<['foo', boolean] | ['bar', string]>>
    >();
  });
});
